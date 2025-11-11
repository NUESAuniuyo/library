import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [semester, setSemester] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const departments = [
    'Computer Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Food Engineering',
    'Agricultural Engineering',
    'Petroleum Engineering'
  ];

  const levels = ['100', '200', '300', '400', '500'];
  const semesters = ['First Semester', 'Second Semester'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size <= 9 * 1024 * 1024) {
        setFile(selectedFile);
        setMessage({ text: `Selected: ${selectedFile.name}`, isError: false });
      } else {
        setMessage({ text: 'File size must be less than 9MB', isError: true });
      }
    } else if (selectedFile) {
      setMessage({ text: 'Only PDF files are allowed', isError: true });
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !department || !level || !semester) {
      setMessage({ text: 'Please fill all fields and select a file', isError: true });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('department', department);
    formData.append('level', level);
    formData.append('semester', semester);

 console.log('FormData entries:');
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
    setIsUploading(true);
    setMessage({ text: 'Uploading...', isError: false });

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include'
});

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setMessage({ text: 'File uploaded successfully!', isError: false });
      // Reset forms
      setFile(null);
      setDepartment('');
      setLevel('');
      setSemester('');
      document.getElementById('file-upload').value = '';
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        text: `Upload failed: ${error.message || 'Please try again later'}`, 
        isError: true 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Study Material</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Level Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading}
          >
            <option value="">Select Level</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl} Level
              </option>
            ))}
          </select>
        </div>

        {/* Semester Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading || !level} // Disable if no level is selected
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PDF File (Max 9MB)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-nuesa-green hover:text-nuesa-green-dark focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf"
                    disabled={isUploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 9MB</p>
              {file && (
                <p className="text-sm text-green-600">
                  {file.name} ({(file.size / (1024 * 1024).toFixed(2))} MB)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message.text && (
          <div 
            className={`p-3 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isUploading || !file || !department || !level || !semester}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nuesa-green hover:bg-nuesa-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nuesa-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Uploading...
              </>
            ) : (
              'Upload Material'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;