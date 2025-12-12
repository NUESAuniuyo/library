import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Calendar, 
  Mail, 
  Phone,
  Star,
  Trophy,
  GraduationCap,
  Building
} from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('faculty');

  const facultyLeadership = [
    {
      name: 'Prof. Akindele Folarin Alonge',
      position: 'Dean, Faculty of Engineering',
      tenure: '2022 - Present',
      image: '/images/dean.jpg',
      bio: 'Prof. Akindele Folarin Alonge is a Professor of Agricultural and Food Engineering with expertise in renewable energy, postharvest technology, and engineering properties of biological materials. He is an accomplished academic, researcher, and professional engineer.',
      achievements: [
        'Published over 140 articles in local and international journals',
        'Presented more than 45 invited conference papers',
        'Pioneer Editor of the Journal of Research and Innovations in Engineering (JORIE)',
        'Fellow, Nigerian Academy of Engineering (FAEng)',
        'Fellow, International Academy for Agricultural and Biosystems Engineers (FIAABE)',
        'Served as National Chairman, Nigerian Institution of Agricultural Engineers (NIAE)',
        'Recipient of the Graduate Engineer of the Year Award (1989, NSE Ibadan Branch)',
        'Expert in solar drying, renewable energy, and oil seed processing'
      ]
    }
  ];
  

  const nuesaExecutives = [
    {
      name: 'James Anietie',
      position: 'President',
      image: '/images/president.jpg',
      tenure: '2025 - Present',
      bio: 'Leads the NUESA UNIUYO Chapter, fostering unity and innovation among engineering students.',
      initiatives: [
        'Promoted student welfare and leadership development',
        'Enhanced collaboration across engineering departments',
        'Organized faculty-wide engineering symposiums',
        'Strengthened communication between executives and members'
      ]
    },
    {
      name: 'Nyong Mmokatubasi',
      position: 'Vice President',
      image: '/images/v.p.jpg',
      tenure: '2025 - Present',
      bio: 'Supports the president in coordinating executive activities and promoting gender inclusion in engineering.',
      initiatives: [
        'Coordinated inter-departmental engagements',
        'Encouraged female participation in technical projects',
        'Supervised NUESA mentorship programs',
        'Promoted academic excellence among members'
      ]
    },
    {
      name: 'Jimbo Nseobong',
      position: 'Secretary General',
      image: '/images/secgen.jpg',
      tenure: '2025 - Present',
      bio: 'Responsible for all NUESA administrative documentation and communication.',
      initiatives: [
        'Digitized meeting records and student communications',
        'Streamlined NUESA correspondence workflow',
        'Introduced document archiving system for transparency',
        'Supported event coordination logistics'
      ]
    },
    {
      name: 'Akwaubok Emeh',
      position: 'Assistant Secretary General',
      image: '/images/Asec.jpg',
      tenure: '2025 - Present',
      bio: 'Assists the Secretary General and oversees student information management.',
      initiatives: [
        'Supported secretariat operations and documentation',
        'Organized student orientation programs',
        'Improved data handling efficiency in the association',
        'Coordinated internal communications for projects'
      ]
    },
    {
      name: 'Eyo Precious',
      position: 'Treasurer',
      image: '/images/tresurer.jpg',
      tenure: '2025 - Present',
      bio: 'Manages NUESA’s financial operations with accountability and transparency.',
      initiatives: [
        'Introduced a financial tracking system for all dues',
        'Ensured transparent financial reporting',
        'Promoted fiscal discipline in event budgeting',
        'Collaborated on NUESA welfare projects funding'
      ]
    },
    {
      name: 'Favour Tony',
      position: 'Director of Academics',
      image: '/images/DOA.jpg',
      tenure: '2025 - Present',
      bio: 'Promotes academic excellence and learning opportunities for engineering students.',
      initiatives: [
        'Organized academic tutorials and workshops',
        'Facilitated collaborations with faculty members',
        'Led academic performance improvement drives',
        'Hosted academic competitions and seminars',
        'Devloper of NUESA-Uniuyo digital library'
      ]
    },
    {
      name: 'Daniel Honour-God',
      position: 'Director of Information',
      image: '/images/DOi.jpg',
      tenure: '2025 - Present',
      bio: 'Handles publicity, information dissemination, and digital engagement for NUESA.',
      initiatives: [
        'Revamped NUESA’s online presence and media content',
        'Introduced regular newsletters and media highlights',
        'Improved awareness of NUESA projects and events',
        'Promoted student achievements on digital platforms'
      ]
    },
    {
      name: 'Goodnews Fortune',
      position: 'Director of Sports',
      image: '/images/DOst.jpg',
      tenure: '2025 - Present',
      bio: 'Promotes fitness, sportsmanship, and recreational events among engineering students.',
      initiatives: [
        'Organized inter-departmental sports tournaments',
        'Encouraged physical wellness campaigns',
        'Fostered team spirit among students through sports',
        'Championed NUESA Sports Week initiative'
      ]
    },
    {
      name: 'Okoh Emmanuel',
      position: 'Director of Socials',
      image: '/images/DOS.jpg',
      tenure: '2025- Present',
      bio: 'Coordinates all NUESA social and cultural activities.',
      initiatives: [
        'Planned the annual NUESA cultural and dinner night',
        'Strengthened social connections within departments',
        'Promoted creative talent showcases',
        'Managed event planning committees effectively'
      ]
    },
    {
      name: 'Ubi Gladys',
      position: 'Financial Secretary',
      image: '/images/finsec.jpg',
      tenure: '2025 - Present',
      bio: 'Oversees collection, recording, and reporting of NUESA financial transactions.',
      initiatives: [
        'Improved dues collection efficiency',
        'Introduced simplified record-keeping methods',
        'Promoted transparency in student payments',
        'Supported financial planning for projects'
      ]
    },
    {
      name: 'John Christopher',
      position: 'Director of Transport',
      image: '/images/DOT.jpg',
      tenure: '2025 - Present',
      bio: 'Oversees all logistics and transportation needs of the association.',
      initiatives: [
        'Ensured smooth logistics during faculty events',
        'Coordinated student mobility during excursions',
        'Improved transport system reliability',
        'Promoted road safety awareness among members'
      ]
    },
    {
      name: 'Jackson Truth',
      position: 'Director of Protocols',
      image: '/images/Dop.jpg',
      tenure: '2025 - Present',
      bio: 'Handles official event organization and protocol duties for the association.',
      initiatives: [
        'Coordinated event hosting protocols and order',
        'Assisted with official representation and correspondence',
        'Managed dignitary engagements during events',
        'Maintained professional standards at official functions'
      ]
    }
  ];
  

  const departmentHODs = [
    {
      name: 'Dr. Okon J. Esua',
      department: 'Agricultural & Food Engineering',
      tenure: '2020 – Present',
      image: '/images/HODf-a.jpg',  // you can set this to the image you have (shown above)
      specialization: 'Renewable Energy & Food Processing Systems',
      achievements: [
        'Published over 140 research articles in reputable journals',
        'Recognized among top 600 Nigerian scientists (Google Scholar ranking)',
        'Advanced AI and automation in agricultural engineering research',
        'Promoted food safety and renewable energy innovations'
      ]
    },
    {
      name: 'Dr. Kingsley C. Egemba',
      department: 'Chemical Engineering',
      tenure: '2021 – Present',
      image: '/images/chmHOD.jpg',
      specialization: 'Process Design & Optimization',
      achievements: [
        'Improved teaching & research standards in Chemical Engineering',
        'Supervised multiple undergraduate & postgraduate projects',
        'Published works in process engineering & safety',
        'Enhanced laboratory facilities & staff collaboration'
      ]
    },
    {
      name: 'Dr. Ofonime A. Harry',
      department: 'Civil Engineering',
      tenure: '2019 – Present',
      image: '/images/HODcivil.jpg',
      specialization: 'Geotechnical & Structural Engineering',
      achievements: [
        'Led World Bank-supported infrastructure projects',
        'Published studies on soil stabilization & erosion control',
        'Strengthened departmental ties with engineering bodies',
        'Promoted sustainable infrastructure innovations'
      ] 
    },
    {
      name: 'Dr. Philip M. Asuquo',
      department: 'Computer Engineering',
      tenure: '2020 – Present',
      image: '/images/HOD.jpg',
      specialization: 'Cybersecurity & IoT',
      achievements: [
        'Collaborated with international IoT research hubs (e.g. PETRAS)',
        'Promoted AI-driven curriculum and student-led projects',
        'Published in cybersecurity & embedded systems',
        'Upgraded departmental ICT infrastructure'
      ]
    },
    {
      name: 'Dr. Nseobong I. Okpura',
      department: 'Electrical & Electronics Engineering',
      tenure: '2019 – Present',
      image: '/images/HODelect.jpg',
      specialization: 'Power Systems & Control Engineering',
      achievements: [
        'Enhanced research in power systems & renewables',
        'Mentored young engineers (via IEEE / UNIUYO projects)',
        'Developed partnerships with energy sectors',
        'Expanded practical lab & workshop training'
      ]
    },
    {
      name: 'Dr. Idorenyin E. Markson',
      department: 'Mechanical Engineering',
      tenure: '2018 – Present',
      image: '/images/HODmec.jpg',
      specialization: 'Thermo-Fluids & Machine Design',
      achievements: [
        'Fostered collaboration between students & industry',
        'Supervised innovative projects (manufacturing, robotics)',
        'Encouraged entrepreneurship in mechanical design',
        'Boosted departmental visibility & research output'
      ]
    },
    {
      name: 'Dr. Anietie N. Okon',
      department: 'Petroleum Engineering',
      tenure: '2019 – Present',
      image: '/images/petHOD.jpg',
      specialization: 'Reservoir Engineering & Renewable Energy',
      achievements: [
        'PhD in Petroleum Engineering (UNIUYO) :contentReference[oaicite:2]{index=2}',
        'International consultant on oil & energy systems',
        'Published extensively on renewable energy & sustainability :contentReference[oaicite:3]{index=3}',
        'Research excellence & recognition (e.g. in Google Scholar rankings) :contentReference[oaicite:4]{index=4}'
      ]
    },

  ];

  const tabs = [
    { id: 'faculty', label: 'Faculty Leadership', icon: Building },
    { id: 'nuesa', label: 'NUESA Executives', icon: Users },
    { id: 'hods', label: 'Department HODs', icon: GraduationCap }
  ];

  const renderProfileCard = (person, type) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card p-6 group"
    >
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=300&background=2E7D32&color=ffffff`;
            }}
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
        <p className="text-nuesa-green font-semibold mb-1">{person.position}</p>
        {person.department && (
          <p className="text-gray-600 text-sm">{person.department}</p>
        )}
        {person.level && (
          <p className="text-gray-600 text-sm">{person.level}</p>
        )}
        <div className="flex items-center justify-center space-x-1 mt-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{person.tenure}</span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{person.bio}</p>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
          {type === 'faculty' ? (
            <>
              <Award className="w-4 h-4 mr-2 text-nuesa-orange" />
              Achievements
            </>
          ) : type === 'nuesa' ? (
            <>
              <Star className="w-4 h-4 mr-2 text-nuesa-orange" />
              Key Initiatives
            </>
          ) : (
            <>
              <Trophy className="w-4 h-4 mr-2 text-nuesa-orange" />
              Achievements
            </>
          )}
        </h4>
        <ul className="space-y-1">
          {(person.achievements || person.initiatives)?.map((item, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <div className="w-1.5 h-1.5 bg-nuesa-green rounded-full mt-2 mr-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {person.contact && (
        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-nuesa-green" />
            <span>{person.contact.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-nuesa-green" />
            <span>{person.contact.phone}</span>
          </div>
        </div>
      )}

      {person.specialization && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            <strong>Specialization:</strong> {person.specialization}
          </p>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-r from-nuesa-green to-nuesa-green-light text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Leadership & About Us
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Meet the distinguished leaders who guide our faculty and student body 
              towards excellence in engineering education and innovation.
            </p>
            <div className="flex justify-center items-center space-x-8 text-lg">
              <div className="flex items-center space-x-2">
                <Building className="w-6 h-6" />
                <span>Faculty Leadership</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Student Executives</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-nuesa-green text-white shadow-lg'
                        : 'text-gray-600 hover:text-nuesa-green'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {activeTab === 'faculty' && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Faculty Leadership</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our distinguished deans who have shaped the faculty's vision and direction.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {facultyLeadership.map((person, index) => (
                  <div key={index}>
                    {renderProfileCard(person, 'faculty')}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'nuesa' && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">NUESA Executive Council</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Meet the student leaders driving innovation and excellence in our engineering community.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nuesaExecutives.map((person, index) => (
                  <div key={index}>
                    {renderProfileCard(person, 'nuesa')}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hods' && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Heads of Departments</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Academic leaders guiding each department towards excellence in education and research.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departmentHODs.map((person, index) => (
                  <div key={index}>
                    {renderProfileCard(person, 'hods')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      
      {/* Faculty Stats */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Faculty at a Glance</h2>
            <p className="text-xl text-gray-600">Key statistics about our faculty</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-nuesa-green mb-2">8</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-nuesa-green mb-2">50+</div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-nuesa-green mb-2">2,000+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-nuesa-green mb-2">25+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
