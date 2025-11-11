import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ChevronDown, Book, Users as UsersIcon, FileText, Award, Clock, FileSearch, GraduationCap } from 'lucide-react';
import NuesaImage from '../logo/Nuesa.png';

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
              Welcome to<span className="text-green-400"> NUESA Uniuyo E-Library</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your gateway to academic excellence and research resources at the Faculty of Engineering, University of Uyo.
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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