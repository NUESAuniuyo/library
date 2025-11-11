import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft,  BookOpen } from 'lucide-react';

// Import HOD images
import hodPetroleum from '../logo/HODpet.jpg';
import hodComputer from '../logo/HOD.jpg';
import hodFood from '../logo/HODf-a.jpg';
import hodAgricultural from '../logo/HODf-a.jpg';
import hodMechanical from '../logo/HODmec.jpg';
import hodElectrical from '../logo/HODelect.jpg';
import hodChemical from '../logo/chmHOD.jpg';
import hodCivil from '../logo/HODcivil.jpg'




// Textbook data for all courses
const courseTextbooks = {
  // 100 Level - First Semester
  'MTH 111': {
    title: 'General Mathematics',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to University Mathematics', 
        url: 'https://drive.google.com/file/d/1uCfOsBfMCR0eteNKT5sxqaYLgmRCg91W/view?usp=drive_link' 
      },
      { 
        title: '2020 Type A Past Question', 
        url: 'https://drive.google.com/file/d/166lTzSGvyzHIx-4hY_yTjynKudN0gJ4-/view?usp=drive_link' 
      }
    ]
  },
  'PHY 111': {
    title: 'General Physics',
    credits: 2,
    textbooks: [
      { 
        title: 'Physics 111', 
        url: 'https://drive.google.com/file/d/1Vc6ekv6WVcaLSRw1h0Lxet9KFEe5RaZf/view?usp=sharing' 
      }
    ]
  },
  'PHY 117': {
    title: 'General Practical Physics',
    credits: 1,
    textbooks: [
      { title: 'Physics Practical Guide', url: '#' }
    ]
  },
  'CHM 111': {
    title: 'General Chemistry I',
    credits: 1,
    textbooks: [
      { 
        title: 'Ebbing and Gammon Chemistry', 
        url: 'https://drive.google.com/file/d/1z2HzHGm7j8a-icNy7FGn2pRfk6oScD5c/view?usp=drive_link' 
      }
    ]
  },
  'GST 111': {
    title: 'Communication in English',
    credits: 2,
    textbooks: [
      { 
        title: 'Effective Use of English Vol. 1', 
        url: 'https://drive.google.com/file/d/1MHlaPeCcOywBg8wMmw3YluQK5rbIRsAx/view?usp=drive_link' 
      }
    ]
  },
  'MEE 111': {
    title: 'Introduction to Mechanical Engineering',
    credits: 1,
    textbooks: [
      { 
        title: 'MEE111 Note 1', 
        url: 'https://drive.google.com/file/d/1Hbk9hNoJPonbF76ugeOv9IjVL5jVtB0t/view?usp=drive_link' 
      },
      { 
        title: 'MEE111 Note 2', 
        url: 'https://drive.google.com/file/d/1HV2Ni__RvlcHMMVG7xiddKSsHTG5UJW2/view?usp=drive_link' 
      }
    ]
  },
  'MEE 112': {
    title: 'Engineering Drawing I',
    credits: 1,
    textbooks: [
      { title: 'Engineering Drawing Guide', url: '#' }
    ]
  },
  'GET 111': {
    title: 'Engineering in Society',
    credits: 1,
    textbooks: [
      { title: 'Engineering in Society', url: '#' }
    ]
  },
  'CHM 117': {
    title: 'General Chemistry Practical I',
    credits: 1,
    textbooks: [
      { title: 'Chemistry Practical Guide', url: '#' }
    ]
  },
  'PHY 112': {
    title: 'UNIUYO Physics',
    credits: 2,
    textbooks: [
      { title: 'UNIUYO Physics', url: '#' }
    ]
  },
  'EEE 111': {
  title: 'Introduction to Electrical and Electronic Engineering',
  credits: 2,
  textbooks: [
    { 
      title: 'Basic Electronics: Principles and Applications', 
      url: '#'  // Replace with actual link
    }
  ]
},
'FDE 102': {
  title: 'Introduction to Food Engineering',
  credits: 2,
  textbooks: [
    { 
      title: 'Introduction to Food Engineering', 
      url: '#'  // Replace with actual link
    }
  ]
},

'PEE 101': {
  title: 'Introduction to Petroleum and Gas Industry',
  credits: 2,
  textbooks: [
    { 
      title: 'Introduction to Petroleum Engineering', 
      url: '#'  // Replace with actual link
    }
  ]
},

'ABE 102': {
  title: 'Introduction to Agricultural and Biosystem Engineering',
  credits: 2,
  textbooks: [
    { 
      title: 'Introduction to Agricultural Engineering Technology', 
      url: '#'  // Replace with actual link
    }
  ]
},

'TCH 101': {
  title: 'Introduction to Chemical Engineering',
  credits: 2,
  textbooks: [
    { 
      title: 'Introduction to Chemical Engineering: Tools for Today and Tomorrow', 
      url: '#'  // Replace with actual link
    }
  ]
},
'CPE 102': {
  title: 'Introduction to Computer Engineering',
  credits: 2,
  textbooks: [
    { 
      title: 'Introduction to Computer Engineering', 
      url: '#'  // Replace with actual link
    }
  ]
},
'CEE 101': {
  title: 'Introduction to Civil Engineering',
  credits: 2,
  textbooks: [
    { 
      title: 'Introduction to Civil Engineering', 
      url: '#'  // Replace with actual link
    }
  ]
},
  // 100 Level - Second Semester
  'MTH 121': {
    title: 'General Mathematics II',
    credits: 2,
    textbooks: [
      { 
        title: 'Advanced Engineering Mathematics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'UUY-MTH 122': {
    title: 'General Mathematics III',
    credits: 2,
    textbooks: [
      { 
        title: 'Engineering Mathematics',  
        url: '#'  // Replace with actual link
      }
    ]
  },
  'UUY-PHY 121': {
    title: 'General Physics',
    credits: 2,
    textbooks: [
      { 
        title: 'University Physics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'UUY-PHY 122': {
    title: 'General Physics IV',
    credits: 2,
    textbooks: [
      { 
        title: 'Modern Physics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'PHY 128': {
    title: 'Practical Physics II',
    credits: 1,
    textbooks: [
      { 
        title: 'Physics Laboratory Manual', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'CHM 121': {
    title: 'General Chemistry II',
    credits: 2,
    textbooks: [
      { 
        title: 'Chemistry: The Central Science', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'CHM 128': {
    title: 'General Practical Chemistry II',
    credits: 1,
    textbooks: [
      { 
        title: 'Chemistry Laboratory Manual', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 121': {
    title: 'General Graphics and Solid Modelling',
    credits: 2,
    textbooks: [
      { 
        title: 'Engineering Graphics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'UUY-STAT 121': {
    title: 'Probability I',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Probability', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GST 121': {
    title: 'Nigerian People and Culture',
    credits: 2,
    textbooks: [
      { 
        title: 'Nigerian Peoples and Culture', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  // 200 Level - First Semester
  'GET 211': {
    title: 'Applied Electricity',
    credits: 3,
    textbooks: [
      { 
        title: 'Basic Electrical Engineering', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 212': {
    title: 'Fundamentals of Fluid Mechanics',
    credits: 3,
    textbooks: [
      { 
        title: 'Introduction to Fluid Mechanics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 213': {
    title: 'Engineering Mathematics',
    credits: 3,
    textbooks: [
      { 
        title: 'Advanced Engineering Mathematics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 214': {
    title: 'Computing and Software Development',
    credits: 3,
    textbooks: [
      { 
        title: 'Introduction to Programming for Engineers', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 215': {
    title: 'Strength of Materials',
    credits: 3,
    textbooks: [
      { 
        title: 'Mechanics of Materials', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GST 211': {
    title: 'Philosophy, Logic and Human Existence',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Philosophy and Logic', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  // 200 Level - Second Semester
  'GET 221': {
    title: 'Engineering Materials',
    credits: 3,
    textbooks: [
      { 
        title: 'Materials Science and Engineering', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 222': {
    title: 'Student Workshop Practice',
    credits: 2,
    textbooks: [
      { 
        title: 'Workshop Technology and Practice', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 223': {
    title: 'Fundamentals of Fluid Thermodynamics',
    credits: 3,
    textbooks: [
      { 
        title: 'Thermodynamics: An Engineering Approach', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'GET 224': {
    title: 'Engineering Mathematics II',
    credits: 3,
    textbooks: [
      { 
        title: 'Advanced Engineering Mathematics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'UUY-GET 225': {
    title: 'Applied Mechanics',
    credits: 3,
    textbooks: [
      { 
        title: 'Engineering Mechanics: Dynamics', 
        url: '#'  // Replace with actual link
      }
    ]
  },
  'ENT 226': {
    title: 'Entrepreneurship and Innovation',
    credits: 2,
    textbooks: [
      { 
        title: 'Engineering Entrepreneurship', 
        url: '#'  // Replace with actual link
      }
    ]
  }
};


  

// Department data
const departmentData = {
  mechanical: {
    name: 'Mechanical Engineering',
    hod: 'Dr. Idorenyin E. Markson',
   hodImage: hodMechanical,
description: 'The Mechanical Engineering Department is dedicated to advancing the field through innovative research, comprehensive education, and practical applications in design, manufacturing, and analysis of mechanical systems.',
    vision: 'To be a leading department in mechanical engineering education and research in West Africa.',
    mission: 'To provide quality education and conduct cutting-edge research in mechanical engineering while serving the community.',
   
  },
   electrical: {
      name: 'Electrical Engineering',
      hod: 'Dr. Nseobong I. Okpura',
      hodImage: hodElectrical,
      description:
        'The Electrical Engineering Department focuses on power systems, control systems, electronics, and telecommunications — preparing graduates for careers in power generation, automation, and electronics design.',
      vision:
        'To be a centre of excellence in power, control and communication engineering in the region.',
      mission:
        'To educate and mentor engineers with deep technical competence in electrical engineering, strong ethics, and industry-ready skills.',
     },
  
    computer: {
      name: 'Computer Engineering',
      hod: 'Dr. Philip M. Asuquo',
      hodImage: hodComputer,
      description:
        'Computer Engineering blends hardware and software to develop computing systems, embedded devices, networks and intelligent applications for industry and research.',
      vision:
        'To lead in computing innovation and produce professionals who drive digital transformation.',
      mission:
        'To deliver rigorous instruction and research opportunities in computer architecture, systems, networking and AI, producing highly employable graduates.',
      
},
  
petroleum: {
  name: 'Petroleum Engineering',
  hod: 'Dr. Anietie N. Okon',
  hodImage: hodPetroleum,  // Add this line
  description:
    'The Petroleum Engineering Department trains students in upstream and downstream petroleum operations including exploration, drilling, reservoir engineering and production systems.',
  vision:
    'To be a regional leader in petroleum technology, research and sustainable hydrocarbon development.',
  mission:
    'To equip students with theoretical knowledge and practical skills for safe, efficient and environmentally responsible petroleum operations.',
  },
  
    agricultural: {
      name: 'Agricultural Engineering',
      hod: 'Dr. Okon J. Esua',
      hodImage: hodAgricultural,
      description:
        'Agricultural Engineering applies engineering principles to agricultural production, mechanization, irrigation, post-harvest handling and sustainable farm infrastructure.',
      vision:
        'To transform agricultural production through engineering innovation and sustainable technologies.',
      mission:
        'To produce competent agricultural engineers capable of improving food production systems and rural livelihoods.',
     },
  
    food: {
      name: 'Food Engineering',
      hod: 'Dr. Okon J. Esua',
      hodImage: hodFood,
      description:
        'Food Engineering focuses on the design and optimization of food processing systems, quality assurance, safety, and value-chain engineering for food products.',
      vision:
        'To be a reference point for food process innovation, safety and industrial collaboration.',
      mission:
        'To train food engineers skilled in process design, preservation, quality control and sustainable food systems.',
    },
  
    chemical: {
      name: 'Chemical Engineering',
      hod: hodChemical,
    description:
        'Chemical Engineering covers process design, reaction engineering, thermodynamics, separations and materials — preparing students for work in process industries and research.',
      vision:
        'To lead in process innovation, materials technology and sustainable chemical production.',
      mission:
        'To educate chemical engineers with strong analytical, design and operational skills for industry and academia.',
      },
  
    civil: {
      name: 'Civil Engineering',
      hod: hodCivil,
      description:
        'Civil Engineering focuses on the planning, design, construction and maintenance of infrastructure — including structures, transportation, water resources and geotechnical systems.',
      vision:
        'To be a leader in sustainable infrastructure development and civil engineering education.',
      mission:
        'To train civil engineers capable of delivering safe, resilient and sustainable infrastructure solutions.',
    },
  };

// Levels and courses data
export const levels = [
// ================= MECHANICAL ENGINEERING =================
{
  department: 'mechanical',
  level: '100',
  name: 'First Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'MTH 111', 
          title: 'General Mathematics', 
          credits: 2, 
          description: 'Basic mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'PHY 111', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Fundamentals of mechanics, heat, and thermodynamics.' 
        },
        { 
          code: 'PHY 117', 
          title: 'General Practical Physics', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'CHM 111', 
          title: 'General Chemistry I', 
          credits: 1, 
          description: 'Basic principles of chemistry for engineers.' 
        },
        { 
          code: 'GST 111', 
          title: 'Communication in English', 
          credits: 2, 
          description: 'English language and communication skills.' 
        },
        { 
          code: 'MEE 111', 
          title: 'Introduction to Mechanical Engineering', 
          credits: 1, 
          description: 'Overview of mechanical engineering profession.' 
        },
        { 
          code: 'MEE 112', 
          title: 'Engineering Drawing I', 
          credits: 1, 
          description: 'Fundamentals of technical drawing.' 
        },
        { 
          code: 'GET 111', 
          title: 'Engineering in Society', 
          credits: 1, 
          description: 'Role of engineering in societal development.' 
        },
        { 
          code: 'CHM 117', 
          title: 'General Chemistry Practical I', 
          credits: 1, 
          description: 'Laboratory work in basic chemistry.' 
        },
        { 
          code: 'PHY 112', 
          title: 'UNIUYO Physics', 
          credits: 2, 
          description: 'Physics principles with local context.' 
        }
      ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'MTH 121', 
          title: 'General Mathematics II', 
          credits: 2, 
          description: 'Advanced mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'UUY-MTH 122', 
          title: 'General Mathematics III', 
          credits: 2, 
          description: 'Further mathematical principles and applications in engineering.' 
        },
        { 
          code: 'UUY-PHY 121', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Continuation of fundamental physics principles.' 
        },
        { 
          code: 'UUY-PHY 122', 
          title: 'General Physics IV', 
          credits: 2, 
          description: 'Advanced topics in physics for engineering applications.' 
        },
        { 
          code: 'PHY 128', 
          title: 'Practical Physics II', 
          credits: 1, 
          description: 'Laboratory work in intermediate physics experiments.' 
        },
        { 
          code: 'CHM 121', 
          title: 'General Chemistry II', 
          credits: 2, 
          description: 'Advanced principles of chemistry for engineers.' 
        },
        { 
          code: 'CHM 128', 
          title: 'General Practical Chemistry II', 
          credits: 1, 
          description: 'Laboratory work in intermediate chemistry.' 
        },
        { 
          code: 'GET 121', 
          title: 'General Graphics and Solid Modelling', 
          credits: 2, 
          description: 'Introduction to technical drawing and 3D modeling.' 
        },
        { 
          code: 'UUY-STAT 121', 
          title: 'Probability I', 
          credits: 2, 
          description: 'Basic probability theory and applications.' 
        },
        { 
          code: 'GST 121', 
          title: 'Nigerian People and Culture', 
          credits: 2, 
          description: 'Study of Nigerian cultural diversity and heritage.' 
        }
      ]
    }
  ]
},

// ================= 200 LEVEL - MECHANICAL ENGINEERING =================
{
  department: 'mechanical',
  level: '200',
  name: 'Second Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GET 211', 
          title: 'Applied Electricity', 
          credits: 3, 
          description: 'Fundamentals of electrical circuits and systems for mechanical engineers.' 
        },
        { 
          code: 'GET 212', 
          title: 'Fundamentals of Fluid Mechanics', 
          credits: 3, 
          description: 'Basic principles of fluid statics, dynamics, and applications.' 
        },
        { 
          code: 'GET 213', 
          title: 'Engineering Mathematics', 
          credits: 3, 
          description: 'Advanced mathematical methods for engineering applications.' 
        },
        { 
          code: 'GET 214', 
          title: 'Computing and Software Development', 
          credits: 3, 
          description: 'Introduction to programming and software development for engineers.' 
        },
        { 
          code: 'GET 215', 
          title: 'Strength of Materials', 
          credits: 3, 
          description: 'Analysis of stress, strain, and deformation in solid materials.' 
        },
        { 
          code: 'GST 211', 
          title: 'Philosophy, Logic and Human Existence', 
          credits: 2, 
          description: 'Critical thinking and philosophical analysis of human existence.' 
        }
      ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GET 221', 
          title: 'Engineering Materials', 
          credits: 3, 
          description: 'Study of properties, structures, and applications of engineering materials.' 
        },
        { 
          code: 'GET 222', 
          title: 'Student Workshop Practice', 
          credits: 2, 
          description: 'Practical training in basic engineering workshop processes and techniques.' 
        },
        { 
          code: 'GET 223', 
          title: 'Fundamentals of Fluid Thermodynamics', 
          credits: 3, 
          description: 'Basic principles of thermodynamics with applications to fluid systems.' 
        },
        { 
          code: 'GET 224', 
          title: 'Engineering Mathematics II', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering problem solving.' 
        },
        { 
          code: 'UUY-GET 225', 
          title: 'Applied Mechanics', 
          credits: 3, 
          description: 'Application of mechanical principles to engineering systems and structures.' 
        },
        { 
          code: 'ENT 226', 
          title: 'Entrepreneurship and Innovation', 
          credits: 2, 
          description: 'Fundamentals of starting and managing innovative engineering ventures.' 
        }
      ]
    }
  ]
},

    // ================= 300 LEVEL - MECHANICAL ENGINEERING =================
{
  department: 'mechanical',
  level: '300',
  name: 'Third Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'MEE 301', 
          title: 'Machine Design I', 
          credits: 3, 
          description: 'Strength of materials, stress, strain analysis.' 
        },
        { 
          code: 'MEE 303', 
          title: 'Heat Transfer', 
          credits: 3, 
          description: 'Conduction, convection, and radiation heat transfer.' 
        },
        { 
          code: 'MEE 305', 
          title: 'Manufacturing Processes', 
          credits: 3, 
          description: 'Casting, forming, and machining processes.' 
        },
        { 
          code: 'MTH 301', 
          title: 'Numerical Methods', 
          credits: 3, 
          description: 'Computational techniques for engineering problems.' 
        },
        { 
          code: 'ELE 301', 
          title: 'Electrical Machines & Drives', 
          credits: 3, 
          description: 'Motors, generators, and control systems.' 
        }
      ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'MEE 302', 
          title: 'Theory of Machines I', 
          credits: 3, 
          description: 'Kinematics of machines and mechanisms.' 
        },
        { 
          code: 'MEE 304', 
          title: 'Engineering Measurement & Instrumentation', 
          credits: 3, 
          description: 'Sensors, transducers, and measurement techniques.' 
        },
        { 
          code: 'MEE 306', 
          title: 'Fluid Mechanics II', 
          credits: 3, 
          description: 'Flow in pipes, pumps, and turbines.' 
        },
        { 
          code: 'MEE 308', 
          title: 'Thermodynamics II', 
          credits: 3, 
          description: 'Power cycles, refrigeration, and compressors.' 
        },
        { 
          code: 'GST 301', 
          title: 'Industrial Safety & Hazard Management', 
          credits: 2, 
          description: 'Safety protocols and risk assessment.' 
        }
      ]
    }
  ]
},

// ================= 400 LEVEL - MECHANICAL ENGINEERING =================
{
  department: 'mechanical',
  level: '400',
  name: 'Fourth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
         { 
          code: 'GRE 411', 
          title: 'Numerical Analysis', 
          credits: 3, 
          description: 'Numerical methods for solving engineering problems.' 
        },
        { 
          code: 'GRE 412', 
          title: 'Engineering Economics', 
          credits: 2, 
          description: 'Economic analysis of engineering projects.' 
        },
        { 
          code: 'MEE411', 
          title: 'Applied Thermodynamics 1', 
          credits: 2, 
          description: 'Thermodynamics applications in engineering systems.' 
        },
        { 
          code: 'MEE 412', 
          title: 'Applied Fluid Mechanics 1', 
          credits: 2, 
          description: 'Fluid mechanics applications in engineering systems.' 
        },
        { 
          code: 'MEE 413', 
          title: 'Mechanics of machines', 
          credits: 3, 
          description: 'Mechanics of machines and mechanisms.' 
        },
        { 
          code: 'MEE 414', 
          title: 'Control Systems', 
          credits: 3, 
          description: 'Control systems and their applications.' 
        },
        { 
          code: 'MEE 415', 
          title: 'Mechaine Design II', 
          credits: 3, 
          description: 'Mechanics of machines and mechanisms.' 
        },
        { 
          code: 'MEE 416', 
          title: 'Mechanical Engineering Lab III', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'MEE 417', 
          title: 'Technology Policy and Development', 
          credits: 2, 
          description: 'Policy and development of technology.' 
        }
        ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'MEE 402', 
          title: 'Manufacturing Automation', 
          credits: 3, 
          description: 'CNC, robotics, and smart factories.' 
        },
       ]
    }
  ]
},

// ================= 500 LEVEL - MECHANICAL ENGINEERING =================
{
  department: 'mechanical',
  level: '500',
  name: 'Fifth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GRE 511', 
          title: 'Engineering Management and Law', 
          credits: 2, 
          description: 'Management and law for engineers.' 
        },
        { 
          code: 'MEE 511', 
          title: ' Engineering Metallurgy Applied Design', 
          credits: 3, 
          description: 'Metallurgical processes and applications.' 
        },
        { 
          code: 'MEE 512', 
          title: 'Applied Design', 
          credits: 3, 
          description: 'Applied design and analysis.' 
        },
        { 
          code: 'MEE 513', 
          title: 'Mechanical Engineering Lab IV', 
          credits: 1, 
          description: 'Mechanical engineering lab IV.' 
        },
      ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'MEE 521', 
          title: 'Applied Thermodynamics 2', 
          credits: 3, 
          description: 'Thermodynamics applications in engineering systems.' 
        },
        { 
          code: 'MEE 522', 
          title: 'Appied fluid mechanics II ', 
          credits: 3, 
          description: 'Fluid mechanics applications in engineering systems.' 
        },
        { 
          code: 'MEE 523', 
          title: 'Engineering materials selection and economics', 
          credits: 3, 
          description: 'Efficiency, sustainability, and energy auditing.' 
        },
        { 
          code: 'MEE 525', 
          title: 'Mechanical engineering lab V', 
          credits: 2, 
          description: 'Mechanical engineering lab V.' 
        }
      ]
    }
  ]
},
    // ================= ELECTRICAL ENGINEERING =================
{
  department: 'electrical',
  level: '100',
  name: 'First Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'MTH 111', 
          title: 'General Mathematics', 
          credits: 2, 
          description: 'Basic mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'PHY 111', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Fundamentals of mechanics, heat, and thermodynamics.' 
        },
        { 
          code: 'PHY 117', 
          title: 'General Practical Physics', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'CHM 111', 
          title: 'General Chemistry I', 
          credits: 1, 
          description: 'Basic principles of chemistry for engineers.' 
        },
        { 
          code: 'GST 111', 
          title: 'Communication in English', 
          credits: 2, 
          description: 'English language and communication skills.' 
        },
        { 
          code: 'EEE 111', 
          title: 'Introduction to Electrical Engineering', 
          credits: 2, 
          description: 'Overview of electrical engineering profession and basic concepts.' 
        },
        { 
          code: 'CPE 101', 
          title: 'Introduction to Computing', 
          credits: 2, 
          description: 'Fundamentals of computing and programming.' 
        },
        { 
          code: 'GET 111', 
          title: 'Engineering in Society', 
          credits: 1, 
          description: 'Role of engineering in societal development.' 
        }
      ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'MTH 121', 
          title: 'General Mathematics II', 
          credits: 2, 
          description: 'Advanced mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'UUY-MTH 122', 
          title: 'General Mathematics III', 
          credits: 2, 
          description: 'Further mathematical principles and applications in engineering.' 
        },
        { 
          code: 'UUY-PHY 121', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Continuation of fundamental physics principles.' 
        },
        { 
          code: 'PHY 128', 
          title: 'Practical Physics II', 
          credits: 1, 
          description: 'Laboratory work in intermediate physics experiments.' 
        },
        { 
          code: 'EEE 121', 
          title: 'Basic Electrical Engineering', 
          credits: 3, 
          description: 'Fundamentals of electrical circuits and systems.' 
        },
        { 
          code: 'EEE 122', 
          title: 'Engineering Drawing', 
          credits: 2, 
          description: 'Technical drawing and circuit diagrams.' 
        },
        { 
          code: 'GST 121', 
          title: 'Nigerian People and Culture', 
          credits: 2, 
          description: 'Study of Nigerian cultural diversity and heritage.' 
        }
      ]
    }
  ]
},

// ================= 200 LEVEL - ELECTRICAL ENGINEERING =================
{
  department: 'electrical',
  level: '200',
  name: 'Second Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'EEE 211', 
          title: 'Electrical Circuit Theory', 
          credits: 3, 
          description: 'Analysis of electrical circuits and network theorems.' 
        },
        { 
          code: 'EEE 212', 
          title: 'Electromagnetic Field Theory', 
          credits: 3, 
          description: 'Fundamentals of electromagnetic fields and waves.' 
        },
        { 
          code: 'MTH 211', 
          title: 'Mathematical Methods I', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering.' 
        },
        { 
          code: 'MEE 211', 
          title: 'Engineering Mechanics', 
          credits: 2, 
          description: 'Principles of mechanics and their applications.' 
        },
        { 
          code: 'GST 211', 
          title: 'Philosophy, Logic and Human Existence', 
          credits: 2, 
          description: 'Critical thinking and philosophical analysis.' 
        }
      ]
    },

    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'EEE 221', 
          title: 'Electronics I', 
          credits: 3, 
          description: 'Basic electronic devices and circuits.' 
        },
        { 
          code: 'EEE 222', 
          title: 'Electrical Machines I', 
          credits: 3, 
          description: 'Principles of electromechanical energy conversion.' 
        },
        { 
          code: 'EEE 223', 
          title: 'Electrical Measurements', 
          credits: 2, 
          description: 'Techniques and instruments for electrical measurements.' 
        },
        { 
          code: 'MTH 221', 
          title: 'Mathematical Methods II', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering II.' 
        },
        { 
          code: 'ENT 226', 
          title: 'Entrepreneurship and Innovation', 
          credits: 2, 
          description: 'Fundamentals of starting and managing engineering ventures.' 
        }
      ]
    }
  ]
},
  
// ================= 300 LEVEL - ELECTRICAL ENGINEERING =================
{
  department: 'electrical',
  level: '300',
  name: 'Third Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'EEE 311', 
          title: 'Electronics II', 
          credits: 3, 
          description: 'Advanced electronic circuits and applications.' 
        },
        { 
          code: 'EEE 312', 
          title: 'Electrical Machines II', 
          credits: 3, 
          description: 'Analysis and applications of electrical machines.' 
        },
        { 
          code: 'EEE 313', 
          title: 'Signals and Systems', 
          credits: 3, 
          description: 'Analysis of continuous and discrete time signals and systems.' 
        },
        { 
          code: 'EEE 314', 
          title: 'Power Systems I', 
          credits: 3, 
          description: 'Introduction to power system analysis and components.' 
        },
        { 
          code: 'EEE 315', 
          title: 'Electromagnetic Field Theory II', 
          credits: 3, 
          description: 'Advanced electromagnetic field theory and applications.' 
        },
        { 
          code: 'EEE 316', 
          title: 'Control Systems I', 
          credits: 3, 
          description: 'Introduction to control system analysis and design.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'EEE 321', 
          title: 'Power Electronics', 
          credits: 3, 
          description: 'Power semiconductor devices and their applications.' 
        },
        { 
          code: 'EEE 322', 
          title: 'Power Systems II', 
          credits: 3, 
          description: 'Power system protection and stability.' 
        },
        { 
          code: 'EEE 323', 
          title: 'Digital Signal Processing', 
          credits: 3, 
          description: 'Digital signal processing techniques and applications.' 
        },
        { 
          code: 'EEE 324', 
          title: 'Microprocessors and Microcontrollers', 
          credits: 3, 
          description: 'Architecture and programming of microprocessors.' 
        },
        { 
          code: 'EEE 325', 
          title: 'Control Systems II', 
          credits: 3, 
          description: 'State-space analysis and digital control systems.' 
        },
        { 
          code: 'EEE 326', 
          title: 'Electrical Installation Design', 
          credits: 2, 
          description: 'Design of electrical installations and wiring systems.' 
        },
        { 
          code: 'GST 311', 
          title: 'Entrepreneurship Development', 
          credits: 2, 
          description: 'Principles of entrepreneurship and business development.' 
        }
      ]
    }
  ]
},

// ================= 400 LEVEL - ELECTRICAL ENGINEERING =================
{
  department: 'electrical',
  level: '400',
  name: 'Fourth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [ 
        { 
          code: 'GRE 411', 
          title: 'Numerical Analysis I', 
          credits: 3, 
          description: 'Numerical methods for solving engineering problems.' 
        },
        { 
          code: 'GRE 412', 
          title: 'Engineering Economics', 
          credits: 2, 
          description: 'Economic analysis of engineering projects and decisions.' 
        },
        { 
          code: 'ELE 411', 
          title: 'Electric Machines II', 
          credits: 2, 
          description: 'Advanced study of electrical machines and their applications.' 
        },
        { 
          code: 'ELE 412', 
          title: 'Electric Power System II', 
          credits: 2, 
          description: 'Advanced power system analysis and operation.' 
        },
        { 
          code: 'ELE 413', 
          title: 'Communication Principles II', 
          credits: 2, 
          description: 'Advanced principles of communication systems.' 
        },
        { 
          code: 'ELE 414', 
          title: 'Control Engineering I', 
          credits: 2, 
          description: 'Fundamentals of control systems and feedback control.' 
        },
        { 
          code: 'ELE 415', 
          title: 'Electronic Circuit II', 
          credits: 2, 
          description: 'Advanced electronic circuit analysis and design.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GRE 421', 
          title: 'SIWES Industrial Training', 
          credits: 6, 
          description: 'Supervised industrial work experience to expose students to real-world engineering practice.' 
        }
       ]
    }
  ]
},
    // ================= 500 LEVEL - ELECTRICAL ENGINEERING =================
{
  department: 'electrical',
  level: '500',
  name: 'Fifth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GRE 511', 
          title: 'Engineering Management & Law', 
          credits: 2, 
          description: 'Principles of engineering management and legal aspects of engineering practice.' 
        },
        { 
          code: 'CPE 511', 
          title: 'Digital Communication Network', 
          credits: 3, 
          description: 'Design and analysis of digital communication networks.' 
        },
        { 
          code: 'ELE 512', 
          title: 'Control Engineering II', 
          credits: 2, 
          description: 'Advanced topics in control systems engineering.' 
        },
        { 
          code: 'ELE 513', 
          title: 'Advanced Circuit Techniques', 
          credits: 2, 
          description: 'Advanced methods in electronic circuit design and analysis.' 
        },
        { 
          code: 'ELE 517', 
          title: 'Communication Systems', 
          credits: 2, 
          description: 'Principles and design of modern communication systems.' 
        },
        { 
          code: 'ELE 518', 
          title: 'Signal Analysis', 
          credits: 2, 
          description: 'Advanced techniques for signal processing and analysis.' 
        },
        { 
          code: 'ELE 519', 
          title: 'Data Communications', 
          credits: 3, 
          description: 'Fundamentals of data communication systems and networks.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'ELE 525', 
          title: 'Process Control Engineering', 
          credits: 2, 
          description: 'Control systems for industrial processes.' 
        },
        { 
          code: 'ELE 522', 
          title: 'Reliability & Maintainability of Machines & Systems', 
          credits: 2, 
          description: 'Principles of reliability engineering and system maintenance.' 
        },
        { 
          code: 'ELE 523', 
          title: 'Electromechanical Devices & Design', 
          credits: 2, 
          description: 'Design and analysis of electromechanical systems.' 
        },
        { 
          code: 'ELE 524', 
          title: 'Power Electronics & Drives', 
          credits: 3, 
          description: 'Power electronic converters and motor drives.' 
        },
        { 
          code: 'ELE 526', 
          title: 'Engineering Analysis', 
          credits: 3, 
          description: 'Advanced analytical methods for engineering problems.' 
        },
        { 
          code: 'ELE 528', 
          title: 'Digital Signal Processing', 
          credits: 2, 
          description: 'Digital techniques for signal processing applications.' 
        }
      ]
    }
  ]
}, 

// ================= COMPUTER ENGINEERING =================
{
  department: 'computer',
  level: '100',
  name: 'First Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'MTH 111', 
          title: 'General Mathematics', 
          credits: 2, 
          description: 'Basic mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'PHY 111', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Fundamentals of mechanics, heat, and thermodynamics.' 
        },
        { 
          code: 'PHY 117', 
          title: 'General Practical Physics', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'GST 111', 
          title: 'Communication in English', 
          credits: 2, 
          description: 'English language and communication skills.' 
        },
        { 
          code: 'CPE 111', 
          title: 'Introduction to Computing', 
          credits: 2, 
          description: 'Fundamentals of computing and programming.' 
        },
        { 
          code: 'CPE 112', 
          title: 'Computer Programming I', 
          credits: 2, 
          description: 'Introduction to programming concepts and problem solving.' 
        },
        { 
          code: 'GET 111', 
          title: 'Engineering in Society', 
          credits: 1, 
          description: 'Role of engineering in societal development.' 
        }
      ]
    },

 // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'MTH 121', 
          title: 'General Mathematics II', 
          credits: 2, 
          description: 'Advanced mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'UUY-MTH 122', 
          title: 'General Mathematics III', 
          credits: 2, 
          description: 'Further mathematical principles and applications in engineering.' 
        },
        { 
          code: 'UUY-PHY 121', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Continuation of fundamental physics principles.' 
        },
        { 
          code: 'UUY-PHY 122', 
          title: 'General Physics IV', 
          credits: 2, 
          description: 'Advanced topics in physics for engineering applications.' 
        },
        { 
          code: 'PHY 128', 
          title: 'Practical Physics II', 
          credits: 1, 
          description: 'Laboratory work in intermediate physics experiments.' 
        },
        { 
          code: 'CHM 121', 
          title: 'General Chemistry II', 
          credits: 2, 
          description: 'Advanced principles of chemistry for engineers.' 
        },
        
      { 
          code: 'GET 121', 
          title: 'General Graphics and Solid Modelling', 
          credits: 2, 
          description: 'Introduction to technical drawing and 3D modeling.' 
        },
        { 
          code: 'UUY-STAT 121', 
          title: 'Probability I', 
          credits: 2, 
          description: 'Basic probability theory and applications.' 
        },
        { 
          code: 'GST 121', 
          title: 'Nigerian People and Culture', 
          credits: 2, 
          description: 'Study of Nigerian cultural diversity and heritage.' 
        }
      ]
    }
  ]
},

// ================= 200 LEVEL - COMPUTER ENGINEERING =================
{
  department: 'computer',
  level: '200',
  name: 'Second Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GET 211', 
          title: 'Applied Electricity', 
          credits: 3, 
          description: 'Fundamentals of electrical circuits and systems for mechanical engineers.' 
        },
        { 
          code: 'GET 212', 
          title: 'Fundamentals of Fluid Mechanics', 
          credits: 3, 
          description: 'Basic principles of fluid statics, dynamics, and applications.' 
        },
        { 
          code: 'GET 213', 
          title: 'Engineering Mathematics', 
          credits: 3, 
          description: 'Advanced mathematical methods for engineering applications.' 
        },
        { 
          code: 'GET 214', 
          title: 'Computing and Software Development', 
          credits: 3, 
          description: 'Introduction to programming and software development for engineers.' 
        },
        { 
          code: 'GET 215', 
          title: 'Strength of Materials', 
          credits: 3, 
          description: 'Analysis of stress, strain, and deformation in solid materials.' 
        },
        { 
          code: 'GST 211', 
          title: 'Philosophy, Logic and Human Existence', 
          credits: 2, 
          description: 'Critical thinking and philosophical analysis of human existence.' 
        }
      ]
    },

    // ================= 2nd Semester =================
   {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GET 221', 
          title: 'Engineering Materials', 
          credits: 3, 
          description: 'Study of properties, structures, and applications of engineering materials.' 
        },
        { 
          code: 'GET 222', 
          title: 'Student Workshop Practice', 
          credits: 2, 
          description: 'Practical training in basic engineering workshop processes and techniques.' 
        },
       
        { 
          code: 'GET 224', 
          title: 'Engineering Mathematics II', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering problem solving.' 
        },
        { 
          code: 'UUY-GET 225', 
          title: 'Applied Mechanics', 
          credits: 3, 
          description: 'Application of mechanical principles to engineering systems and structures.' 
        },
        { 
          code: 'ENT 221', 
          title: 'Entrepreneurship and Innovation', 
          credits: 2, 
          description: 'Fundamentals of starting and managing innovative engineering ventures.' 
        }
      ]
    }
  ]
}
];
function DepartmentDetail() {
  const { departmentId: deptId } = useParams();
  const [selectedLevel, setSelectedLevel] = useState('100');
  const department = departmentData[deptId];

  // Get available levels for the current department
  const departmentLevels = [...new Set(
    levels
      .filter(level => level.department === deptId)
      .map(level => level.level)
  )].sort();

  // Get current level data 
  const currentLevel = levels.find(
    level => level.department === deptId && level.level === selectedLevel
  );

  // Handle textbook selection
  const handleTextbookSelect = (url) => {
    if (url) window.open(url, '_blank');
  };

  if (!department) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Department not found</h1>
          <p className="text-gray-600 mt-2">The department with ID: {deptId} could not be found.</p>
          <Link to="/departments" className="mt-4 inline-flex items-ceter text-nuesa-green">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-nuesa-green to-nuesa-green-dark text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/departments"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Departments
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {department.name}
                </h1>
                <p className="text-lg mb-6 leading-relaxed">
                  {department.description}
                </p>
               <div className="flex items-center space-x-3 text-lg">
  {department.hodImage && (
    <img 
      src={department.hodImage} 
      alt={`${department.hod}, Head of Department`}
      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
    />
  )}
  <div>
    <div className="text-sm text-gray-300">Head of Department</div>
    <div className="font-medium">{department.hod}</div>
  </div>
</div>
              </div>

              {department.stats && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{department.stats?.students || 'N/A'}</div>
                      <div className="text-sm opacity-80">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{department.stats?.faculty || 'N/A'}</div>
                      <div className="text-sm opacity-80">Faculty</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{department.stats?.courses || 'N/A'}</div>
                      <div className="text-sm opacity-80">Courses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{department.stats?.labs || 'N/A'}</div>
                      <div className="text-sm opacity-80">Labs</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Level Selector */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Academic Level</h2>
          <div className="flex flex-wrap gap-2">
            {departmentLevels.map(level => (
              <button
                key={level}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-nuesa-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                {level} Level
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      {currentLevel && (
        <section className="container mx-auto px-4 pb-16">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {currentLevel.semesters.map((semester, index) => (
              <div key={index} className="border-b last:border-b-0">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-nuesa-green mb-6 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    {semester.semester} - {currentLevel.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {semester.courses.map((course, idx) => {
                      const courseInfo = courseTextbooks[course.code] || course;
                      const hasTextbooks = courseInfo.textbooks && courseInfo.textbooks.length > 0;
                      
                      return (
                        <div 
                          key={idx} 
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-mono font-bold text-nuesa-green">{course.code}</h4>
                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                              </div>
                              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                            
                            {hasTextbooks && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <label 
                                  htmlFor={`textbooks-${course.code}`} 
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Available Textbooks:
                                </label>
                                <select
                                  id={`textbooks-${course.code}`}
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-nuesa-green focus:border-nuesa-green transition-colors"
                                  defaultValue=""
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      handleTextbookSelect(e.target.value);
                                      e.target.value = '';
                                    }
                                  }}
                                >
                                  <option value="" disabled>-- Select a textbook --</option>
                                  {courseInfo.textbooks.map((textbook, tIdx) => (
                                    <option key={tIdx} value={textbook.url}>
                                      {textbook.title}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            
                            {!hasTextbooks && (
                              <div className="text-xs text-gray-400 mt-2">
                                No textbooks available
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vision & Mission Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-nuesa-green mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">{department.vision}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-nuesa-green mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">{department.mission}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DepartmentDetail;   
