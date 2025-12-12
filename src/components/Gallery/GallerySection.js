import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const GallerySection = () => {
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
      default:
        return `g${index}.jpg`;
    }
  };

  const galleryImages = [
    { id: 1, name: 'g1.jpg' },
    { id: 2, name: 'g2.jpg' },
    { id: 3, name: 'g3.jpg' },
    { id: 4, name: 'g4.jpg' },
    { id: 5, name: 'g5.jpg' },
    { id: 6, name: 'g6.jpg' },
    { id: 7, name: 'g7.jpg' },
    { id: 8, name: 'g8.jpg' },
    { id: 9, name: 'g9.jpg' },
    { id: 10, name: 'g10.jpg' },
    { id: 11, name: 'g11.jpg' },
    { id: 12, name: 'g12.jpg' },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            NUESA <span className="text-nuesa-green">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capture memorable moments and events from our engineering community
          </p>
          <div className="w-24 h-1 bg-nuesa-green mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                      // Fallback to a placeholder image if image doesn't exist
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(image.title)}&size=400&background=2E7D32&color=ffffff`;
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/gallery"
            className="inline-block bg-nuesa-green hover:bg-nuesa-green-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Full Gallery
          </Link>
        </motion.div>
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
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                  <p className="text-white/80">NUESA Uniuyo Engineering Gallery</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
