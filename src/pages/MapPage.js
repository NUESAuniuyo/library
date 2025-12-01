import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, Maximize2, Minimize2 } from 'lucide-react';

// Image map configuration
const MAP_CONFIG = {
  width: 1200,
  height: 800,
  imageUrl: '/images/map.jpg'
};

const MapPage = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(null);
  const [initialScale, setInitialScale] = useState(1);
  const mapRef = useRef(null);
  const controls = useAnimation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isFullscreen) return;
      resetView();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      setInitialDistance(distance);
      setInitialScale(scale);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && touchStart) {
      setPosition({
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y,
      });
    } else if (e.touches.length === 2 && initialDistance !== null) {
      const distance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const newScale = Math.min(Math.max(0.5, (distance / initialDistance) * initialScale), 3);
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStart(null);
    setInitialDistance(null);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left mouse button
    e.preventDefault();
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetView = async () => {
    await controls.start({
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.3 }
    });
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen().catch(err => {
        console.error('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Rest of your component remains the same...
return (
  <div className="min-h-screen bg-gray-50 pt-16 md:pt-24">
    <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 md:mb-6 px-2"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Campus Map</h1>
        <p className="text-sm text-gray-600">Navigate through our university campus</p>
      </motion.div>

      <div 
        ref={mapRef}
        className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 relative"
      >
        <div 
          className="relative w-full touch-none"
          style={{ 
            paddingBottom: '66.67%',
            overflow: 'hidden'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={controls}
            style={{
              x: position.x,
              y: position.y,
              scale: scale,
              touchAction: 'none',
              userSelect: 'none'
            }}
          >
            <img
              src={MAP_CONFIG.imageUrl}
              alt="Campus Map"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable="false"
            />
          </motion.div>
        </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-10">
            <button
              onClick={zoomIn}
              className="p-2 md:p-3 bg-white/90 rounded-full shadow-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 md:p-3 bg-white/90 rounded-full shadow-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
            <button
              onClick={resetView}
              className="p-2 md:p-3 bg-white/90 rounded-full shadow-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Reset view"
            >
              <Compass className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 md:p-3 bg-white/90 rounded-full shadow-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              ) : (
                <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="p-2 md:p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <p className="text-xs md:text-sm text-center text-gray-600">
              {window.innerWidth < 768 
                ? "Pinch to zoom, drag to pan" 
                : "Use the controls to zoom in/out or drag to pan"}
            </p>
          </div>
        </div>

        {/* Key Locations */}
        <div className="py-4 md:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-2">
          {[
            { 
              name: "Main Library", 
              hours: "8:00 AM - 10:00 PM (Mon-Sat)",
              icon: "📚"
            },
            { 
              name: "Administrative Block", 
              hours: "8:00 AM - 4:00 PM (Mon-Fri)",
              icon: "🏛️"
            },
            { 
              name: "Student Center", 
              hours: "7:00 AM - 11:00 PM (Daily)",
              icon: "🎓"
            }
          ].map((location, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{location.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-gray-800">{location.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{location.hours}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;