import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import axios from 'axios';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    level: '',
    semester: '',
    course: '',
    uploadType: '',
    file: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size <= 15 * 1024 * 1024) {
        setFormData(prev => ({ ...prev, file: selectedFile }));
        setMessage({ text: `Selected: ${selectedFile.name}`, isError: false });
      } else {
        setMessage({ text: "File size must be less than 15MB", isError: true });
        e.target.value = "";
      }
    } else if (selectedFile) {
      setMessage({ text: "Only PDF files are allowed", isError: true });
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { file, department, level, semester, course, uploadType } = formData;
    
    if (!file || !department || !level || !semester || !course || !uploadType) {
      setMessage({
        text: "Please fill all fields and select a file",
        isError: true,
      });
      return;
    }

    setIsUploading(true);

    const data = new FormData();
    data.append('file', file);
    data.append('department', department);
    data.append('level', level);
    data.append('semester', semester);
    data.append('course', extractCourseCode(course)); // Send only the course code
    data.append('uploadType', uploadType);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });

      setMessage({ text: "File uploaded successfully!", isError: false });
      
      // Reset form
      setFormData({
        department: '',
        level: '',
        semester: '',
        course: '',
        uploadType: '',
        file: null
      });
      document.getElementById("file-upload").value = "";
      
    } catch (error) {
      console.error('Upload failed:', error);
      
      let errorMessage = "Upload failed: ";
      
      if (!error.response) {
        // Network error
        if (error.code === 'ECONNREFUSED') {
          errorMessage += "Cannot connect to server. Please ensure the backend server is running on localhost:5000";
        } else if (error.code === 'ERR_NETWORK') {
          errorMessage += "Network error. Please check your internet connection and ensure the server is accessible";
        } else {
          errorMessage += "Network error. Please check if the backend server is running and accessible";
        }
      } else {
        // Server responded with error
        errorMessage += error.response?.data?.message || error.message || "Please try again";
      }
      
      setMessage({
        text: errorMessage,
        isError: true
      });
    } finally {
      setIsUploading(false);
    }
  };

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
  const semesters = ["1st Semester", "2nd Semester"];
  const uploadTypes = ["Textbooks", "Past Questions", "Materials/Notes"];

  const getAvailableCourses = () => {
    const { department, level, semester } = formData;
    if (!department || !level || !semester) return [];
    return courseDatabase[department]?.[level]?.[semester] || [];
  };

  const extractCourseCode = (courseString) => {
    if (!courseString) return '';
    // Extract the course code (e.g., "MTH 111" from "MTH 111 - General Mathematics")
    const match = courseString.match(/^([A-Z]{2,4}\s*\d{3,4})/i);
    return match ? match[1].toUpperCase() : courseString;
  };

  const courseDatabase = {
    "Mechanical Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "MEE 111 - Introduction to Mechanical Engineering",
          "MEE 112 - Engineering Drawing I",
          "GET 111 - Engineering in Society",
          "CHM 117 - General Chemistry Practical I",
          "PHY 112 - UNIUYO Physics"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "CHM 128 - General Practical Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "UUY-STAT 121 - Probability I",
          "GST 121 - Nigerian People and Culture"
        ]
      },
      200: {
        "1st Semester": [
          "GET 211 - Applied Electricity",
          "GET 212 - Fundamentals of Fluid Mechanics",
          "GET 213 - Engineering Mathematics",
          "GET 214 - Computing and Software Development",
          "GET 215 - Strength of Materials",
          "GST 211 - Philosophy, Logic and Human Existence"
        ],
        "2nd Semester": [
          "GET 221 - Engineering Materials",
          "GET 222 - Student Workshop Practice",
          "GET 223 - Fundamentals of Fluid Thermodynamics",
          "GET 224 - Engineering Mathematics II",
          "UUY-GET 225 - Applied Mechanics",
          "ENT 226 - Entrepreneurship and Innovation"
        ]
      },
      300: {
        "1st Semester": [
          "MEE 301 - Machine Design I",
          "MEE 303 - Heat Transfer",
          "MEE 305 - Manufacturing Processes",
          "MTH 301 - Numerical Methods",
          "ELE 301 - Electrical Machines & Drives"
        ],
        "2nd Semester": [
          "MEE 302 - Theory of Machines I",
          "MEE 304 - Engineering Measurement & Instrumentation",
          "MEE 306 - Fluid Mechanics II",
          "MEE 308 - Thermodynamics II",
          "GST 301 - Industrial Safety & Hazard Management"
        ]
      },
      400: {
        "1st Semester": [
          "GRE 411 - Numerical Analysis",
          "GRE 412 - Engineering Economics",
          "MEE411 - Applied Thermodynamics 1",
          "MEE 412 - Applied Fluid Mechanics 1",
          "MEE 413 - Mechanics of machines",
          "MEE 414 - Control Systems",
          "MEE 415 - Mechaine Design II",
          "MEE 416 - Mechanical Engineering Lab III",
          "MEE 417 - Technology Policy and Development"
        ],
        "2nd Semester": [
          "MEE 402 - Manufacturing Automation"
        ]
      },
      500: {
        "1st Semester": [
          "GRE 511 - Engineering Management and Law",
          "MEE 511 - Engineering Metallurgy Applied Design",
          "MEE 512 - Applied Design",
          "MEE 513 - Mechanical Engineering Lab IV"
        ],
        "2nd Semester": [
          "MEE 521 - Applied Thermodynamics 2",
          "MEE 522 - Appied fluid mechanics II",
          "MEE 523 - Engineering materials selection and economics",
          "MEE 525 - Mechanical engineering lab V"
        ]
      }
    },
    "Electrical Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "EEE 111 - Introduction to Electrical and Electronic Engineering",
          "CPE 101 - Introduction to Computing",
          "GET 111 - Engineering in Society"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "PHY 128 - Practical Physics II",
          "EEE 121 - Basic Electrical Engineering",
          "EEE 122 - Engineering Drawing",
          "GST 121 - Nigerian People and Culture"
        ]
      },
      200: {
        "1st Semester": [
          "EEE 211 - Electrical Circuit Theory",
          "EEE 212 - Electromagnetic Field Theory",
          "MTH 211 - Mathematical Methods I",
          "MEE 211 - Engineering Mechanics",
          "GST 211 - Philosophy, Logic and Human Existence"
        ],
        "2nd Semester": [
          "EEE 221 - Electronics I",
          "EEE 222 - Electrical Machines I",
          "EEE 223 - Electrical Measurements",
          "MTH 221 - Mathematical Methods II",
          "ENT 226 - Entrepreneurship and Innovation"
        ]
      },
      300: {
        "1st Semester": [
          "EEE 311 - Electronics II",
          "EEE 312 - Electrical Machines II",
          "EEE 313 - Signals and Systems",
          "EEE 314 - Power Systems I",
          "EEE 315 - Electromagnetic Field Theory II",
          "EEE 316 - Control Systems I"
        ],
        "2nd Semester": [
          "EEE 321 - Power Electronics",
          "EEE 322 - Power Systems II",
          "EEE 323 - Digital Signal Processing",
          "EEE 324 - Microprocessors and Microcontrollers",
          "EEE 325 - Control Systems II",
          "EEE 326 - Electrical Installation Design",
          "GST 311 - Entrepreneurship Development"
        ]
      },
      400: {
        "1st Semester": [
          "GRE 411 - Numerical Analysis I",
          "GRE 412 - Engineering Economics",
          "ELE 411 - Electric Machines II",
          "ELE 412 - Electric Power System II",
          "ELE 413 - Communication Principles II",
          "ELE 414 - Control Engineering I",
          "ELE 415 - Electronic Circuit II"
        ],
        "2nd Semester": [
          "GRE 421 - SIWES Industrial Training"
        ]
      },
      500: {
        "1st Semester": [
          "GRE 511 - Engineering Management & Law",
          "CPE 511 - Digital Communication Network",
          "ELE 512 - Control Engineering II",
          "ELE 513 - Advanced Circuit Techniques",
          "ELE 517 - Communication Systems",
          "ELE 518 - Signal Analysis",
          "ELE 519 - Data Communications"
        ],
        "2nd Semester": [
          "ELE 525 - Process Control Engineering",
          "ELE 522 - Reliability & Maintainability of Machines & Systems",
          "ELE 523 - Electromechanical Devices & Design",
          "ELE 524 - Power Electronics & Drives",
          "ELE 526 - Engineering Analysis",
          "ELE 528 - Digital Signal Processing"
        ]
      }
    },
    "Computer Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "GST 111 - Communication in English",
          "CPE 111 - Introduction to Computing",
          "CPE 112 - Computer Programming I",
          "GET 111 - Engineering in Society"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "UUY-STAT 121 - Probability I",
          "GST 121 - Nigerian People and Culture"
        ]
      },
      200: {
        "1st Semester": [
          "GET 211 - Applied Electricity",
          "GET 212 - Fundamentals of Fluid Mechanics",
          "GET 213 - Engineering Mathematics",
          "GET 214 - Computing and Software Development",
          "GET 215 - Strength of Materials",
          "GST 211 - Philosophy, Logic and Human Existence"
        ],
        "2nd Semester": [
          "GET 221 - Engineering Materials",
          "GET 222 - Student Workshop Practice",
          "GET 224 - Engineering Mathematics II",
          "UUY-GET 225 - Applied Mechanics",
          "ENT 221 - Entrepreneurship and Innovation"
        ]
      }
    },
    "Petroleum Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "PEE 101 - Introduction to Petroleum and Gas Industry",
          "GET 111 - Engineering in Society",
          "CHM 117 - General Chemistry Practical I",
          "PHY 112 - UNIUYO Physics"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "CHM 128 - General Practical Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "UUY-STAT 121 - Probability I",
          "GST 121 - Nigerian People and Culture"
        ]
      }
    },
    "Agricultural Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "ABE 102 - Introduction to Agricultural and Biosystem Engineering",
          "GET 111 - Engineering in Society",
          "CHM 117 - General Chemistry Practical I",
          "PHY 112 - UNIUYO Physics"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "CHM 128 - General Practical Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "UUY-STAT 121 - Probability I",
          "GST 121 - Nigerian People and Culture"
        ]
      }
    },
    "Food Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "FDE 102 - Introduction to Food Engineering",
          "GET 111 - Engineering in Society",
          "CHM 117 - General Chemistry Practical I",
          "PHY 112 - UNIUYO Physics"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "CHM 128 - General Practical Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "UUY-STAT 121 - Probability I",
          "GST 121 - Nigerian People and Culture"
        ]
      }
    },
    "Chemical Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "TCH 101 - Introduction to Chemical Engineering",
          "GET 111 - Engineering in Society",
          "CHM 117 - General Chemistry Practical I",
          "PHY 112 - UNIUYO Physics"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "UUY-STAT 121 - Probability I",
          "GST 121 - Nigerian People and Culture"
        ]
      }
    },
    "Civil Engineering": {
      100: {
        "1st Semester": [
          "MTH 111 - General Mathematics",
          "PHY 111 - General Physics",
          "PHY 117 - General Practical Physics",
          "CHM 111 - General Chemistry I",
          "GST 111 - Communication in English",
          "CEE 101 - Introduction to Civil Engineering",
          "GET 111 - Engineering in Society",
          "CHM 117 - General Chemistry Practical I",
          "PHY 112 - UNIUYO Physics"
        ],
        "2nd Semester": [
          "MTH 121 - General Mathematics II",
          "UUY-MTH 122 - General Mathematics III",
          "UUY-PHY 121 - General Physics",
          "UUY-PHY 122 - General Physics IV",
          "PHY 128 - Practical Physics II",
          "CHM 121 - General Chemistry II",
          "GET 121 - General Graphics and Solid Modelling",
          "GST 121 - Nigerian People and Culture"
        ]
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Upload Study Material
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
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
            name="level"
            value={formData.level}
            onChange={handleChange}
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
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading || !formData.level}
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
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading || !formData.semester}
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
            name="uploadType"
            value={formData.uploadType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
            disabled={isUploading || !formData.course}
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
            PDF File (Max 15MB)
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
              <p className="text-xs text-gray-500">PDF up to 15MB</p>
              {formData.file && (
                <p className="text-sm text-green-600">
                  {formData.file.name} ({(formData.file.size / (1024 * 1024)).toFixed(2)} MB)
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
              !formData.file ||
              !formData.department ||
              !formData.level ||
              !formData.semester ||
              !formData.course ||
              !formData.uploadType
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