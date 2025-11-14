const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const formidable = require("formidable");
const fs = require("fs");

// Load environment variables
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Parse the service account credentials from environment variable
const getCredentials = () => {
  console.log("Getting credentials...");
  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT environment variable not set");
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

    // Fix private key formatting - ensure proper line breaks
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
    }

    console.log("Credentials parsed successfully");
    console.log("Project ID:", credentials.project_id);
    console.log("Client Email:", credentials.client_email);

    return credentials;
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

// Helper function to create folder structure in Google Drive
async function createFolderStructure(
  drive,
  department,
  level,
  semester,
  course,
  uploadType
) {
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  // Create or find Department folder
  const deptFolderId = await findOrCreateFolder(
    drive,
    department,
    rootFolderId
  );

  // Create or find Level folder (e.g., "100 Level", "200 Level")
  const levelFolderId = await findOrCreateFolder(
    drive,
    `${level} Level`,
    deptFolderId
  );

  // Create or find Semester folder (e.g., "First Semester", "Second Semester")
  const semesterFolderId = await findOrCreateFolder(
    drive,
    semester,
    levelFolderId
  );

  // Create or find Course folder (e.g., "CPE 201 - Computer Programming II")
  const courseFolderId = await findOrCreateFolder(
    drive,
    course,
    semesterFolderId
  );

  // Create or find Upload Type folder (e.g., "Textbooks", "Past Questions", "Materials/Notes")
  const uploadTypeFolderId = await findOrCreateFolder(
    drive,
    uploadType,
    courseFolderId
  );

  return uploadTypeFolderId;
}

// Test endpoint
app.get("/api/test", (req, res) => {
  console.log("Test API hit!");

  return res.status(200).json({
    message: "API is working!",
    method: req.method,
    timestamp: new Date().toISOString(),
    env: {
      hasGoogleCreds: !!process.env.GOOGLE_SERVICE_ACCOUNT,
      hasFolderId: !!process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID,
    },
  });
});

// Upload endpoint
app.post("/api/upload", async (req, res) => {
  console.log("API endpoint hit:", req.method);

  try {
    // Parse the multipart form data
    const form = new formidable.IncomingForm({
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
    const course = Array.isArray(fields.course)
      ? fields.course[0]
      : fields.course;
    const uploadType = Array.isArray(fields.uploadType)
      ? fields.uploadType[0]
      : fields.uploadType;
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !department || !level || !semester || !course || !uploadType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate file type
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    // Initialize Google Drive client
    const drive = getDriveClient();

    // Create folder structure: Department/Level/Semester/Course/UploadType
    const folderId = await createFolderStructure(
      drive,
      department,
      level,
      semester,
      course,
      uploadType
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
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📁 Environment variables loaded:`, {
    hasGoogleCreds: !!process.env.GOOGLE_SERVICE_ACCOUNT,
    hasFolderId: !!process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID,
  });
});
