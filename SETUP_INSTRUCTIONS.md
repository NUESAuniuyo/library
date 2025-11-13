# Google Drive Upload Setup Instructions

## ✅ What's Been Done

1. Created `/api/upload.js` - Vercel serverless function for Google Drive uploads
2. Installed required packages: `googleapis` and `formidable`
3. Updated upload form to use `/api/upload` endpoint
4. Created `.env.local` with your service account credentials

## 🔧 What You Need to Do

### Step 1: Get Your Google Drive Folder ID

1. Go to Google Drive: https://drive.google.com
2. Create a folder called "NUESA Library" (or use an existing one)
3. Open that folder
4. Look at the URL - it will look like:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
   ```
5. Copy the ID after `/folders/` (e.g., `1a2b3c4d5e6f7g8h9i0j`)

### Step 2: Share Folder with Service Account

1. Right-click the folder → Share
2. Add this email as an Editor:
   ```
   nuesa-digital-storage@nuesa-digital-storage.iam.gserviceaccount.com
   ```
3. Click "Send"

### Step 3: Update Environment Variable

Open `.env.local` and replace `YOUR_FOLDER_ID_HERE` with your actual folder ID:

```env
GOOGLE_DRIVE_ROOT_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j
```

### Step 4: Test Locally

```bash
npm start
```

Then:

1. Go to http://localhost:3000/admin
2. Login with: DOA / nuesa2024
3. Try uploading a PDF

### Step 5: Deploy to Vercel

1. Add environment variables in Vercel dashboard:

   - Go to your project → Settings → Environment Variables
   - Add `GOOGLE_SERVICE_ACCOUNT` (paste the entire JSON)
   - Add `GOOGLE_DRIVE_ROOT_FOLDER_ID` (your folder ID)

2. Deploy:
   ```bash
   git add .
   git commit -m "Add Google Drive upload functionality"
   git push
   ```

## 📁 Folder Structure

Files will be organized automatically:

```
NUESA Library/
├── Computer Engineering/
│   ├── 100 Level/
│   │   ├── First Semester/
│   │   │   ├── CPE 101 - Introduction to Computing/
│   │   │   │   ├── Textbooks/
│   │   │   │   ├── Past Questions/
│   │   │   │   └── Materials/Notes/
│   │   │   ├── MTH 101 - General Mathematics I/
│   │   │   │   ├── Textbooks/
│   │   │   │   ├── Past Questions/
│   │   │   │   └── Materials/Notes/
│   │   │   └── ... (other courses)
│   │   └── Second Semester/
│   │       └── ... (similar structure)
│   ├── 200 Level/
│   └── ... (up to 500 Level)
├── Electrical Engineering/
├── Mechanical Engineering/
└── ... (all 8 departments)
```

## 🔒 Security Notes

- `.env.local` is in `.gitignore` - credentials won't be committed
- Service account credentials are only accessible server-side
- Never expose credentials in frontend code

## 🐛 Troubleshooting

**"Upload failed"**: Check that:

- Folder ID is correct
- Service account has Editor access to the folder
- Environment variables are set in Vercel

**"Permission denied"**: Share the folder with the service account email
