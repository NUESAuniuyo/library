import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageName = (index) => {
    switch(index) {
      case 1:
        return 'g1.jpg'; // SUG President at praise festival
      case 2:
        return 'g2.jpg'; // NUESA students gathering
      case 3:
        return 'g3.jpg'; // Engineering faculty meeting
      case 4:
        return 'g4.jpg'; // Praise festival
      case 5:
        return 'g5.jpg'; // Student activities
      case 6:
        return 'g6.jpg'; // Campus event
      case 7:
        return 'g7.jpg'; // NUESA students in praise festival
      case 8:
        return 'g8.jpg'; // Faculty president speech at praise festival
      case 9:
        return 'g9.jpg'; // Multiple presidents at praise festival
      case 10:
        return 'g10.jpg'; // Student praying in praise festival
      case 11:
        return 'g11.jpg'; // Faculty president arriving at inauguration
      case 12:
        return 'g12.jpg'; // NUESA president with executives
      case 13:
        return 'g13.jpg'; // Additional image
      case 14:
        return 'g14.jpg'; // Additional image
      case 15:
        return 'g15.jpg'; // Additional image
      case 16:
        return 'g16.jpg'; // Large image - inauguration
      case 17:
        return 'g17.jpg'; // Large image - praise festival
      case 18:
        return 'g18.jpg'; // Large image
      case 19:
        return 'g19.jpg'; // Large image
      case 20:
        return 'g20.jpg'; // Large image
      case 21:
        return 'g21.jpg'; // Large image
      case 22:
        return 'g22.jpg'; // Large image
      case 23:
        return 'g23.jpg'; // Large image
      default:
        return `g${index}.jpg`;
    }
  };

  const galleryImages = [
    { id: 1, name: 'g1.jpg', title: 'SUG President at Praise Festival' },
    { id: 2, name: 'g2.jpg', title: 'NUESA Students Gathering' },
    { id: 3, name: 'g3.jpg', title: 'Engineering Faculty Meeting' },
    { id: 4, name: 'g4.jpg', title: 'Praise Festival Celebration' },
    { id: 5, name: 'g5.jpg', title: 'Student Activities' },
    { id: 6, name: 'g6.jpg', title: 'Campus Event' },
    { id: 7, name: 'g7.jpg', title: 'NUESA Students in Praise Festival' },
    { id: 8, name: 'g8.jpg', title: 'Faculty President Presenting Speech at Praise Festival' },
    { id: 9, name: 'g9.jpg', title: 'SUG President, NUESA President and Other Presidents at Praise Festival' },
    { id: 10, name: 'g10.jpg', title: 'NUESA Student Praying in Praise Festival' },
    { id: 11, name: 'g11.jpg', title: 'Faculty President Arriving During Inauguration' },
    { id: 12, name: 'g12.jpg', title: 'NUESA President with Chief of Staff, Chief Protocol Officer, Chief Branding Officer' },
    { id: 13, name: 'g13.jpg', title: 'Faculty Event' },
    { id: 14, name: 'g14.jpg', title: 'Student Activities' },
    { id: 15, name: 'g15.jpg', title: 'Campus Life' },
    { id: 16, name: 'g16.jpg', title: 'The Call - NUESA Uniuyo Inauguration' },
    { id: 17, name: 'g17.jpg', title: 'Praise Festival - NUESA Uniuyo' },
    { id: 18, name: 'g18.jpg', title: 'NUESA Executive Council Meeting' },
    { id: 19, name: 'g19.jpg', title: 'Faculty of Engineering Event' },
    { id: 20, name: 'g20.jpg', title: 'NUESA Student Activities' },
    { id: 21, name: 'g21.jpg', title: 'Engineering Department Event' },
    { id: 22, name: 'g22.jpg', title: 'NUESA Academic Session' },
    { id: 23, name: 'g23.jpg', title: 'University of Uyo Engineering Event' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Gallery Header */}
      <div className="py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              NUESA <span className="text-nuesa-green">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Explore our comprehensive collection of memorable moments, events, and achievements from the NUESA Uniuyo community
            </p>
            <div className="w-32 h-1 bg-nuesa-green mx-auto rounded-full"></div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                  <div className="aspect-square w-full">
                    <img
                      src={`/images/${image.name}`}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(image.title)}&size=400&background=2E7D32&color=ffffff`;
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`/images/${getImageName(selectedImage)}`}
                  alt={galleryImages.find(img => img.id === selectedImage)?.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                              </div>

              {/* Navigation */}
              <div className="absolute left-4 right-4 top-1/2 transform -translate-y-1/2 flex justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage > 1 ? selectedImage - 1 : galleryImages.length);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage < galleryImages.length ? selectedImage + 1 : 1);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
