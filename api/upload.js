const { google } = require("googleapis");
const formidable = require("formidable");
const fs = require("fs");

// Parse the service account credentials from environment variable
const getCredentials = () => {
  try {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Failed to parse credentials:", error);
    throw new Error("Invalid service account credentials");
  }
};

// Initialize Google Drive API
const getDriveClient = () => {
  const credentials = getCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  return google.drive({ version: "v3", auth });
};

// Disable body parsing, we'll handle it with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Extract form data
    const department = Array.isArray(fields.department)
      ? fields.department[0]
      : fields.department;
    const level = Array.isArray(fields.level) ? fields.level[0] : fields.level;
    const semester = Array.isArray(fields.semester)
      ? fields.semester[0]
      : fields.semester;
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !department || !level || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate file type
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    // Initialize Google Drive client
    const drive = getDriveClient();

    // Create folder structure: Department/Level/Semester
    const folderId = await createFolderStructure(
      drive,
      department,
      level,
      semester
    );

    // Upload file to Google Drive
    const fileMetadata = {
      name: file.originalFilename || file.newFilename,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.filepath),
    };

    const driveFile = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name, webViewLink",
    });

    // Clean up temporary file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      message: "File uploaded successfully",
      fileId: driveFile.data.id,
      fileName: driveFile.data.name,
      webViewLink: driveFile.data.webViewLink,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
}

// Helper function to create folder structure in Google Drive
async function createFolderStructure(drive, department, level, semester) {
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  // Create or find Department folder
  const deptFolderId = await findOrCreateFolder(
    drive,
    department,
    rootFolderId
  );

  // Create or find Level folder
  const levelFolderId = await findOrCreateFolder(
    drive,
    `Level ${level}`,
    deptFolderId
  );

  // Create or find Semester folder
  const semesterFolderId = await findOrCreateFolder(
    drive,
    semester,
    levelFolderId
  );

  return semesterFolderId;
}

// Helper function to find or create a folder
async function findOrCreateFolder(drive, folderName, parentId) {
  // Search for existing folder
  const query = `name='${folderName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;

  const response = await drive.files.list({
    q: query,
    fields: "files(id, name)",
    spaces: "drive",
  });

  if (response.data.files.length > 0) {
    return response.data.files[0].id;
  }

  // Create new folder if not found
  const fileMetadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
    parents: [parentId],
  };

  const folder = await drive.files.create({
    requestBody: fileMetadata,
    fields: "id",
  });

  return folder.data.id;
}
