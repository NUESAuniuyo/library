import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  FileText, 
  Video, 
  Image, 
  File,
  Calendar,
  Clock,
  User,
  Star,
  Search
} from 'lucide-react';

const CoursePage = () => {
  const { departmentId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Sample course data
  const courseData = {
    code: 'MEE 201',
    title: 'Statics',
    credits: 3,
    instructor: 'Dr. James Okon',
    semester: '1st Semester, 200 Level',
    description: 'This course covers the fundamental principles of statics including forces, moments, equilibrium of particles and rigid bodies, analysis of structures, friction, and centroids.',
    objectives: [
      'Understand the concept of force and moment systems',
      'Apply equilibrium principles to solve engineering problems',
      'Analyze trusses, frames, and machines',
      'Calculate centroids and moments of inertia',
      'Solve problems involving friction'
    ]
  };

  const materials = [
    {
      id: 1,
      title: 'Course Outline and Syllabus',
      type: 'pdf',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      downloads: 245,
      rating: 4.8,
      description: 'Complete course outline with learning objectives and assessment criteria'
    },
    {
      id: 2,
      title: 'Chapter 1: Introduction to Statics',
      type: 'pdf',
      size: '5.7 MB',
      uploadDate: '2024-01-20',
      downloads: 198,
      rating: 4.6,
      description: 'Basic concepts, units, and fundamental principles of statics'
    },
    {
      id: 3,
      title: 'Lecture Video: Force Systems',
      type: 'video',
      size: '125 MB',
      uploadDate: '2024-01-25',
      downloads: 156,
      rating: 4.9,
      description: 'Comprehensive video lecture on force systems and resultants'
    },
    {
      id: 4,
      title: 'Problem Set 1: Force Vectors',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-02-01',
      downloads: 189,
      rating: 4.5,
      description: 'Practice problems on force vectors and their applications'
    },
    {
      id: 5,
      title: 'Lab Manual: Equilibrium Experiments',
      type: 'pdf',
      size: '8.2 MB',
      uploadDate: '2024-02-05',
      downloads: 134,
      rating: 4.7,
      description: 'Laboratory experiments on equilibrium of forces and moments'
    },
    {
      id: 6,
      title: 'Midterm Exam Solutions',
      type: 'pdf',
      size: '3.1 MB',
      uploadDate: '2024-02-15',
      downloads: 267,
      rating: 4.8,
      description: 'Detailed solutions to midterm examination questions'
    },
    {
      id: 7,
      title: 'Truss Analysis Diagrams',
      type: 'image',
      size: '4.5 MB',
      uploadDate: '2024-02-20',
      downloads: 98,
      rating: 4.4,
      description: 'Collection of truss analysis diagrams and examples'
    },
    {
      id: 8,
      title: 'Reference Textbook Chapter 3',
      type: 'pdf',
      size: '12.8 MB',
      uploadDate: '2024-02-25',
      downloads: 176,
      rating: 4.6,
      description: 'Equilibrium of rigid bodies from reference textbook'
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-blue-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || material.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-r from-nuesa-green to-nuesa-green-light text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to={`/departments/${departmentId}`}
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Department</span>
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {courseData.code}
                  </span>
                  <span className="bg-nuesa-orange px-3 py-1 rounded-full text-sm font-medium">
                    {courseData.credits} Credits
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {courseData.title}
                </h1>
                
                <p className="text-xl mb-6 leading-relaxed">
                  {courseData.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{courseData.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{courseData.semester}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Learning Objectives</h3>
                <ul className="space-y-2 text-sm">
                  {courseData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-nuesa-orange rounded-full mt-2 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search course materials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="pdf">PDF Documents</option>
                    <option value="video">Videos</option>
                    <option value="image">Images</option>
                  </select>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  Showing {filteredMaterials.length} of {materials.length} materials
                </div>
              </motion.div>

              {/* Materials Grid */}
              <div className="space-y-4">
                {filteredMaterials.map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            {getFileIcon(material.type)}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {material.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {material.description}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                              </span>
                              <span>{material.size}</span>
                              <span className="flex items-center space-x-1">
                                <Download className="w-4 h-4" />
                                <span>{material.downloads} downloads</span>
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center space-x-1">
                                {renderStars(material.rating)}
                              </div>
                              <span className="text-sm text-gray-600">({material.rating})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <button className="btn-primary py-2 px-4 text-sm inline-flex items-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                          <button className="btn-secondary py-2 px-4 text-sm inline-flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Course Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Materials:</span>
                      <span className="font-semibold">{materials.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Downloads:</span>
                      <span className="font-semibold">{materials.reduce((sum, m) => sum + m.downloads, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Rating:</span>
                      <span className="font-semibold">4.6/5</span>
                    </div>
                  </div>
                </div>
                
                {/* Ad Space */}
                <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs">AD</span>
                    </div>
                    <p className="text-xs">Google AdSense</p>
                    <p className="text-xs">300x250</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursePage;
