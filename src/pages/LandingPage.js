import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ChevronDown, Book, Users as UsersIcon, FileText, Award, Clock, FileSearch, GraduationCap } from 'lucide-react';
import NuesaImage from '../logo/Nuesa.png';
import GallerySection from '../components/Gallery/GallerySection';

// Stats data
const stats = [
  { icon: Book, value: '1000+', label: 'E-Books' },
  { icon: UsersIcon, value: '5000+', label: 'Students' },
  { icon: FileText, value: '50+', label: 'Departments' },
  { icon: Award, value: '24/7', label: 'Access' }
];

// Features data
const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Resources',
    description: 'Access a vast collection of academic materials, research papers, and reference books all in one place.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Study at your own pace with round-the-clock access to all our digital resources.'
  },
  {
    icon: FileSearch,
    title: 'Easy Navigation',
    description: 'Find exactly what you need with our intuitive search and categorization system.'
  },
  {
    icon: Users,
    title: 'Collaborate',
    description: 'Connect with peers, share notes, and collaborate on projects through our platform.'
  },
  {
    icon: GraduationCap,
    title: 'Expert Guidance',
    description: 'Get access to curated reading lists and recommendations from faculty members.'
  },
  {
    icon: Award,
    title: 'Stay Updated',
    description: 'Never miss important announcements, deadlines, or new additions to our collection.'
  }
];

// Typing Animation Component
const TypingText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Typing speed

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length && isTyping) {
      // Start typing out after a pause
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000); // Pause before typing out

      return () => clearTimeout(timeout);
    } else if (!isTyping && displayText.length > 0) {
      // Typing out effect
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, 50); // Typing out speed

      return () => clearTimeout(timeout);
    } else if (!isTyping && displayText.length === 0) {
      // Restart typing
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setCurrentIndex(0);
      }, 1000); // Pause before restarting

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTyping, displayText, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={NuesaImage}
            alt="NUESA Background"
            className="hero-bg"
          />
          <div className="hero-overlay" />
        </div>

        {/* Hero Content */}
        <div className="hero-content text-center text-white px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="hero-text mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to<span className="text-green-400"> <TypingText text="NUESA Uniuyo E-Library" /></span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
              style={{ 
                fontFamily: 'Georgia, serif',
                fontSize: '1.25rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '0.05em'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your gateway to <span className="font-semibold text-white">academic excellence</span> and <span className="font-semibold text-white">research resources</span> at the <span className="font-bold text-green-400">Faculty of Engineering</span>, <span className="text-green-300">University of Uyo</span>.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/departments"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Resources</span>
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg text-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                <span>Learn More</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-white/70" />
            </div>
          </motion.div>
        </div>
      </section>

      
      {/* Rest of your sections remain the same */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Statistics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students already benefiting from our platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">Our Platform</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of academic resources with our comprehensive digital library
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of engineering students who are already using our platform to excel in their studies.
            </p>
            <Link
              to="/departments"
              className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-4 inline-flex items-center gap-2 rounded-lg transition-colors duration-300 font-semibold"
            >
              <BookOpen className="w-5 h-5" />
              <span>Get Started Now</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 