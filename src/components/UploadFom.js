import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const departments = [
    "Computer Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Food Engineering",
    "Agricultural Engineering",
    "Petroleum Engineering",
  ];

  const levels = ["100", "200", "300", "400", "500"];
  const semesters = ["First Semester", "Second Semester"];
  const uploadTypes = ["Textbooks", "Past Questions", "Materials/Notes"];

  // Course database organized by department, level, and semester
  const courseDatabase = {
    "Computer Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "CPE 101 - Introduction to Computing",
          "GST 101 - Communication in English",
          "GST 103 - Nigerian Peoples and Culture",
        ],
        "Second Semester": [
          "MTH 102 - General Mathematics II",
          "PHY 102 - General Physics II",
          "CHM 102 - General Chemistry II",
          "ENG 102 - Use of English II",
          "CPE 102 - Computer Programming I",
          "GST 102 - Logic and Philosophy",
          "GST 104 - History and Philosophy of Science",
        ],
      },
      200: {
        "First Semester": [
          "MTH 201 - Mathematical Methods I",
          "PHY 201 - Physics for Engineers I",
          "CPE 201 - Computer Programming II",
          "CPE 203 - Digital Logic Design",
          "EEE 201 - Circuit Analysis I",
          "MEE 201 - Engineering Drawing",
          "GST 201 - Nigerian Peoples and Culture",
        ],
        "Second Semester": [
          "MTH 202 - Mathematical Methods II",
          "PHY 202 - Physics for Engineers II",
          "CPE 202 - Data Structures and Algorithms",
          "CPE 204 - Computer Architecture",
          "EEE 202 - Circuit Analysis II",
          "MEE 202 - Engineering Mechanics",
          "GST 202 - Peace and Conflict Resolution",
        ],
      },
      300: {
        "First Semester": [
          "CPE 301 - Microprocessor Systems",
          "CPE 303 - Operating Systems",
          "CPE 305 - Database Systems",
          "CPE 307 - Software Engineering",
          "EEE 301 - Electronic Circuits I",
          "MTH 301 - Numerical Analysis",
        ],
        "Second Semester": [
          "CPE 302 - Computer Networks",
          "CPE 304 - System Programming",
          "CPE 306 - Digital Signal Processing",
          "CPE 308 - Artificial Intelligence",
          "EEE 302 - Electronic Circuits II",
          "MTH 302 - Statistics for Engineers",
        ],
      },
      400: {
        "First Semester": [
          "CPE 401 - Computer Graphics",
          "CPE 403 - Embedded Systems",
          "CPE 405 - Network Security",
          "CPE 407 - Machine Learning",
          "CPE 409 - Project I",
          "EEE 401 - Control Systems",
        ],
        "Second Semester": [
          "CPE 402 - Distributed Systems",
          "CPE 404 - Mobile Computing",
          "CPE 406 - Internet of Things",
          "CPE 408 - Cybersecurity",
          "CPE 410 - Project II",
          "EEE 402 - Digital Communications",
        ],
      },
      500: {
        "First Semester": [
          "CPE 501 - Advanced Computer Architecture",
          "CPE 503 - Cloud Computing",
          "CPE 505 - Blockchain Technology",
          "CPE 507 - Research Methodology",
          "CPE 509 - Industrial Training",
        ],
        "Second Semester": [
          "CPE 502 - Advanced Networks",
          "CPE 504 - Quantum Computing",
          "CPE 506 - Final Year Project",
          "CPE 508 - Entrepreneurship",
          "CPE 510 - Seminar",
        ],
      },
    },
    "Electrical Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "EEE 101 - Introduction to Electrical Engineering",
          "GST 101 - Communication in English",
        ],
        "Second Semester": [
          "MTH 102 - General Mathematics II",
          "PHY 102 - General Physics II",
          "CHM 102 - General Chemistry II",
          "ENG 102 - Use of English II",
          "EEE 102 - Engineering Drawing",
          "GST 102 - Logic and Philosophy",
        ],
      },
      200: {
        "First Semester": [
          "MTH 201 - Mathematical Methods I",
          "PHY 201 - Physics for Engineers I",
          "EEE 201 - Circuit Analysis I",
          "EEE 203 - Electromagnetic Fields I",
          "EEE 205 - Digital Electronics",
          "MEE 201 - Engineering Mechanics",
        ],
        "Second Semester": [
          "MTH 202 - Mathematical Methods II",
          "PHY 202 - Physics for Engineers II",
          "EEE 202 - Circuit Analysis II",
          "EEE 204 - Electromagnetic Fields II",
          "EEE 206 - Analog Electronics",
          "MEE 202 - Thermodynamics",
        ],
      },
    },
    "Mechanical Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "MEE 101 - Introduction to Mechanical Engineering",
          "GST 101 - Communication in English",
        ],
        "Second Semester": [
          "MTH 102 - General Mathematics II",
          "PHY 102 - General Physics II",
          "CHM 102 - General Chemistry II",
          "ENG 102 - Use of English II",
          "MEE 102 - Engineering Drawing",
          "GST 102 - Logic and Philosophy",
        ],
      },
    },
    "Civil Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "CVE 101 - Introduction to Civil Engineering",
          "GST 101 - Communication in English",
        ],
        "Second Semester": [
          "MTH 102 - General Mathematics II",
          "PHY 102 - General Physics II",
          "CHM 102 - General Chemistry II",
          "ENG 102 - Use of English II",
          "CVE 102 - Engineering Drawing",
          "GST 102 - Logic and Philosophy",
        ],
      },
    },
    "Chemical Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "CHE 101 - Introduction to Chemical Engineering",
          "GST 101 - Communication in English",
        ],
      },
    },
    "Food Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "FDE 101 - Introduction to Food Engineering",
          "GST 101 - Communication in English",
        ],
      },
    },
    "Agricultural Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "AGE 101 - Introduction to Agricultural Engineering",
          "GST 101 - Communication in English",
        ],
      },
    },
    "Petroleum Engineering": {
      100: {
        "First Semester": [
          "MTH 101 - General Mathematics I",
          "PHY 101 - General Physics I",
          "CHM 101 - General Chemistry I",
          "ENG 101 - Use of English I",
          "PTE 101 - Introduction to Petroleum Engineering",
          "GST 101 - Communication in English",
        ],
      },
    },
  };

  // Get available courses based on selected department, level, and semester
  const getAvailableCourses = () => {
    if (!department || !level || !semester) return [];
    return courseDatabase[department]?.[level]?.[semester] || [];
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size <= 9 * 1024 * 1024) {
        setFile(selectedFile);
        setMessage({ text: `Selected: ${selectedFile.name}`, isError: false });
      } else {
        setMessage({ text: "File size must be less than 9MB", isError: true });
      }
    } else if (selectedFile) {
      setMessage({ text: "Only PDF files are allowed", isError: true });
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !department || !level || !semester || !course || !uploadType) {
      setMessage({
        text: "Please fill all fields and select a file",
        isError: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("department", department);
    formData.append("level", level);
    formData.append("semester", semester);
    formData.append("course", course);
    formData.append("uploadType", uploadType);

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    setIsUploading(true);
    setMessage({ text: "Uploading...", isError: false });

    try {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001/api/upload"
          : "/api/upload";

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage({ text: "File uploaded successfully!", isError: false });
      // Reset forms
      setFile(null);
      setDepartment("");
      setLevel("");
      setSemester("");
      setCourse("");
      setUploadType("");
      document.getElementById("file-upload").value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        text: `Upload failed: ${error.message || "Please try again later"}`,
        isError: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Upload Study Material
      </h2>

      {/* Test API Button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={async () => {
            try {
              const apiUrl =
                process.env.NODE_ENV === "development"
                  ? "http://localhost:3001/api/test"
                  : "/api/test";
              const response = await fetch(apiUrl);
              const data = await response.json();
              setMessage({ text: `API Test: ${data.message}`, isError: false });
            } catch (error) {
              setMessage({
                text: `API Test Failed: ${error.message}`,
                isError: true,
              });
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test API Connection
        </button>
      </div>

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

        {/* Course Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading || !semester} // Disable if no semester is selected
          >
            <option value="">Select Course</option>
            {getAvailableCourses().map((courseItem) => (
              <option key={courseItem} value={courseItem}>
                {courseItem}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Type Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Type
          </label>
          <select
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading || !course} // Disable if no course is selected
          >
            <option value="">Select Upload Type</option>
            {uploadTypes.map((type) => (
              <option key={type} value={type}>
                {type}
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
                  {file.name} ({file.size / (1024 * 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message.text && (
          <div
            className={`p-3 rounded-md ${
              message.isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={
              isUploading ||
              !file ||
              !department ||
              !level ||
              !semester ||
              !course ||
              !uploadType
            }
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nuesa-green hover:bg-nuesa-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nuesa-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Uploading...
              </>
            ) : (
              "Upload Material"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
