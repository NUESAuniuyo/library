import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';

// Import dean's image


const facultyLeadership = [
  {
    name: 'Prof. John Doe',
    position: 'Dean, Faculty of Engineering',
    tenure: '2020 - Present',
    image: '/images/dean.jpg',  // Direct path to the image in the public folder
    bio: 'Distinguished professor and researcher with over 20 years of experience in engineering education and leadership.',
    achievements: [
      'Ph.D. in Engineering from MIT',
      'Published over 100 research papers',
      'Recipient of the National Engineering Excellence Award',
      'Fellow of the Nigerian Society of Engineers'
    ]
  }
];

const FacultyLeadership = () => {
  console.log('Image path:', facultyLeadership[0].image);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-center">
        {facultyLeadership.map((person, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative w-32 h-32 mx-auto">
              <img 
                src={person.image} 
                alt={person.name}
                className="w-full h-full rounded-full object-cover border-4 border-nuesa-green"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=300&background=2E7D32&color=ffffff`;
                }}
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
            <p className="text-green-700 font-semibold">{person.position}</p>
            <div className="flex justify-center items-center space-x-1 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{person.tenure}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{person.bio}</p>

            <h4 className="font-semibold text-gray-900 flex justify-center items-center">
              <Award className="w-4 h-4 mr-2 text-green-600" />
              Achievements
            </h4>

            <ul className="text-left space-y-1">
              {person.achievements.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FacultyLeadership;