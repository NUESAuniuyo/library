import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Materials API
export const materialsAPI = {
  // Fetch materials for a specific course
  getCourseMaterials: async (department, level, semester, courseCode) => {
    try {
      const response = await api.get('/materials', {
        params: {
          department,
          level,
          semester,
          courseCode
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching course materials:', error);
      throw error;
    }
  },

  // Fetch materials by type (textbooks, past questions, notes)
  getMaterialsByType: async (department, level, semester, courseCode, materialType) => {
    try {
      const response = await api.get('/materials/type', {
        params: {
          department,
          level,
          semester,
          courseCode,
          materialType
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching materials by type:', error);
      throw error;
    }
  }
};

// Upload API (for completeness)
export const uploadAPI = {
  uploadFile: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
};

export default api;
