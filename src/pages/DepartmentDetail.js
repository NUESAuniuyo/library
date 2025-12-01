import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Download, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { materialsAPI } from '../services/api';

// Import HOD images
import hodPetroleum from '../logo/HODpet.jpg';
import hodComputer from '../logo/HOD.jpg';
import hodFood from '../logo/HODf-a.jpg';
import hodAgricultural from '../logo/HODf-a.jpg';
import hodMechanical from '../logo/HODmec.jpg';
import hodElectrical from '../logo/HODelect.jpg';
import hodChemical from '../logo/chmHOD.jpg';
import hodCivil from '../logo/HODcivil.jpg';

// Textbook data for all courses organized by department
const courseTextbooks = {
  // ================= GENERAL COURSES (All Departments) =================
  // Mathematics Courses
  'MTH 111': {
    title: 'General Mathematics',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to University Mathematics', 
        url: 'https://drive.google.com/file/d/1uCfOsBfMCR0eteNKT5sxqaYLgmRCg91W/view?usp=drive_link' 
      },
      { 
        title: 'Past question', 
        url: 'https://drive.google.com/file/d/1OqkZ90nn0foFeXxE47nz-qO4qZwi0F2I/view?usp=drive_link' 
      }
    ]
  },
  'MTH 121': {
    title: 'General Mathematics II',
    credits: 2,
    textbooks: [
      { 
        title: 'Advanced Engineering Mathematics', 
        url: 'https://drive.google.com/file/d/1paSsHkX6gOvW_dpqeu-s0v_7Z-bhVx5a/view?usp=drive_link'
      },
      { 
        title: 'Work book', 
        url: 'https://drive.google.com/file/d/1UHSPsET7DEYdvQZOLtF4jOP58q6NNDlO/view?usp=drive_link'
      },
      { 
        title: 'Mathematics II Past Questions', 
        url: 'https://drive.google.com/file/d/1c-JVTWwHueN_ys2y6CEpQ8dXq9J2jBmi/view?usp=drive_link'
      },
      {
        title: 'past question',
        url: 'https://drive.google.com/file/d/17VJAyE1-_3hNCUKfiSGv3WXXD51qZv3P/view?usp=drive_link'
      }
    ]
  },
  'UUY-MTH 122': {
    title: 'General Mathematics III',
    credits: 2,
    textbooks: [
      { 
        title: 'kinematics textbook',  
        url: 'https://drive.google.com/file/d/1c-JVTWwHueN_ys2y6CEpQ8dXq9J2jBmi/view?usp=drive_link'
      },
      { 
        title: 'Vectors', 
        url: 'https://drive.google.com/file/d/13Bn67IaA2XJas85124M3Flifwr68Tak5/view?usp=drive_link'
      },
      { 
        title: 'lecture note', 
        url: 'https://drive.google.com/file/d/1hYTpdzmDJUDOIG5-Eoie2MTG5fvn5doB/view?usp=drive_link'
      }
    ]
  },

  // Physics Courses
  'PHY 111': {
    title: 'General Physics',
    credits: 2,
    textbooks: [
      { 
        title: 'Physics 111 - Main Textbook', 
        url: '' 
      },
      { 
        title: 'Physics 111 - Supplementary Materials', 
        url: 'https://drive.google.com/file/d/1Vc6ekv6WVcaLSRw1h0Lxet9KFEe5RaZf/view?usp=sharing' 
      },
      { 
        title: 'Physics 111 - Past Questions', 
        url: 'https://drive.google.com/file/d/1qmpwwrUXm9XHOLoyBoORvoLAyw9J-QpM/view?usp=drive_link' 
      }
    ]
  },
  'PHY 117': {
    title: 'General Practical Physics',
    credits: 1,
    textbooks: [
      { title: 'past question', url: 'https://drive.google.com/file/d/1OzhsW7vqqrsOLQir6dwmhWJfgvHY17nl/view?usp=drive_link' },
      
    ]
  },
  'PHY 112': {
    title: 'UNIUYO Physics',
    credits: 2,
    textbooks: [
      { title: 'UNIUYO Physics', url: 'https://drive.google.com/file/d/1cc59ca3dqvlIEpSZ6hEYsN5kV_unUmcP/view?usp=drive_link' },
      
    ]
  },
  'UUY-PHY 121': {
    title: 'General Physics',
    credits: 2,
    textbooks: [
      { 
        title: 'University Physics 121 textbook', 
        url: 'https://drive.google.com/file/d/11hQ1mgZGklGDIFSU26tMiAFprTiwXENC/view?usp=drive_link'
      },
      { 
        title: 'physics 121 past question', 
        url: 'https://drive.google.com/file/d/1Xj674KYVQUWgKNn7EMZ6UyzpMirp5n9-/view?usp=sharing'
      },
      { 
        title: 'physics 121 formulars', 
        url: 'https://drive.google.com/file/d/18uT387GPdJIpDrQhmATZ2x1zun9gTwA_/view?usp=sharing'
      },
      {
        title: 'physics 121 past question ',
        urls: 'https://drive.google.com/file/d/1DplRHwhDl30xCyWyQWxa05HVgEX_V4q-/view?usp=sharing'
      }
    ]
  },
  'UUY-PHY 122': {
    title: 'General Physics IV',
    credits: 2,
    textbooks: [
      { 
        title: 'UUY- Physics 122 texbook ', 
        url: 'https://drive.google.com/file/d/1aGPgOa4kO0nFWhmqns2FoKD6ZwEo6vDQ/view?usp=drive_link'
      },
 
    ]
  },
  'PHY 128': {
    title: 'Practical Physics II',
    credits: 1,
    textbooks: [
      { 
        title: 'Experiment solution Manual', 
        url: 'https://drive.google.com/file/d/17VJAyE1-_3hNCUKfiSGv3WXXD51qZv3P/view?usp=drive_link'
      },
 
    ]
  },

  // Chemistry Courses
  'CHM 111': {
    title: 'General Chemistry I',
    credits: 1,
    textbooks: [
      { 
        title: 'Ebbing and Gammon Chemistry', 
        url: 'https://drive.google.com/file/d/1z2HzHGm7j8a-icNy7FGn2pRfk6oScD5c/view?usp=drive_link' 
      },
      { 
        title: 'Chemical equlibrum', 
        url: 'https://drive.google.com/file/d/1FkV1BUFxBTtYYerahON8YG-3DoMQ81TJ/view?usp=drive_link' 
      },
     
    ]
  },
  'CHM 117': {
    title: 'General Chemistry Practical I',
    credits: 1,
    textbooks: [
      { title: 'Past question', url: 'https://drive.google.com/file/d/1Ezr180kdnrPGnv9MF7x9UuKPRncm-eO1/view?usp=drive_link' },
     
    ]
  },
  'CHM 121': {
    title: 'General Chemistry II',
    credits: 2,
    textbooks: [
      { 
        title: 'Chemistry of Alkane', 
        url: 'https://drive.google.com/file/d/1UgfDj4GyWKn8F21eCZH5P7IBhDiapM1K/view?usp=drive_link'
      },
      { 
        title: 'CHM 121 Texbook', 
        url: 'https://drive.google.com/file/d/1t_SbuNO9HOPbYS7lJL81iCM897I0IZna/view?usp=drive_link'
      },
      { 
        title: 'https://drive.google.com/file/d/1AlN2-VryJa6BhpBxtv_YqZI8N9sMS61p/view?usp=drive_link', 
        url: 'Past question'
      }
    ]
  },
  'CHM 128': {
    title: 'General Practical Chemistry II',
    credits: 1,
    textbooks: [
      { title: '', url: '' },
  
    ]
  },

  // GST Courses
  'GST 111': {
    title: 'Communication in English',
    credits: 2,
    textbooks: [
      { 
        title: 'Effective Use of English Vol. 1', 
        url: '' 
      },
  
    ]
  },
  'GST 121': {
    title: 'Nigerian People and Culture',
    credits: 2,
    textbooks: [
      { 
        title: 'Nigerian Peoples and Culture', 
        url: 'https://drive.google.com/file/d/1BGbW6iPi7wJH_ZpdsvaNsMzWp1va2c0o/view?usp=sharing'
      },
  
    ]
  },
  'GST 211': {
    title: 'Philosophy, Logic and Human Existence',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Philosophy and Logic', 
        url: 'https://drive.google.com/file/d/1X3k1vBuILPS23yCuFGbCw8CqqykCjWva/view?usp=drive_link'
      }
    ]
  },

  // GET Courses (General Engineering)
  'GET 111': {
    title: 'Engineering in Society',
    credits: 1,
    textbooks: [
      { title: 'Engineering in Society', url: 'https://drive.google.com/file/d/1-01i4_8AWELeAdq5hc_M0coAUYVfqmTl/view?usp=drive_link' },
     
    ]
  },
  'GET 121': {
    title: 'General Graphics and Solid Modelling',
    credits: 2,
    textbooks: [
      { 
        title: 'Engineering Graphics', 
        url: 'https://drive.google.com/file/d/1HhlSpFk5tEcGhiHq3gYtdOUBpRIga1uW/view?usp=drive_link'
      },
   
    ]
  },
  'UUY-STAT 121': {
    title: 'Probability I',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Probability', 
        url: 'https://drive.google.com/file/d/117U6TVsxTo38j25s6c6tmG0HaWn0lpNK/view?usp=drive_link'
      },
      { 
        title: 'Statistics and Probability lecture notes', 
        url: 'https://drive.google.com/file/d/1NZO0DVW2lIoS2veoZ2QnhXajW3llw6js/view?usp=sharing'
      }
    ]
  },

  // ================= ELECTRICAL ENGINEERING =================
  'EEE 111': {
    title: 'Introduction to Electrical and Electronic Engineering',
    credits: 2,
    textbooks: [
      { 
        title: 'Basic Electronics: Principles and Applications', 
        url: '#'
      },
      { 
        title: 'Electrical Engineering Fundamentals', 
        url: '#'
      },
      { 
        title: 'Electronics Lab Manual', 
        url: '#'
      }
    ]
  },

  // ================= COMPUTER ENGINEERING =================
  'CPE 102': {
    title: 'Introduction to Computer Engineering',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Computer Engineering', 
        url: '#'
      },
      { 
        title: 'Digital Logic Design', 
        url: '#'
      },
      { 
        title: 'Computer Architecture Basics', 
        url: '#'
      }
    ]
  },

  // ================= PETROLEUM ENGINEERING =================
  'PEE 101': {
    title: 'Introduction to Petroleum and Gas Industry',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Petroleum Engineering', 
        url: '#'
      },
      { 
        title: 'Petroleum Industry Fundamentals', 
        url: '#'
      },
      { 
        title: 'Oil and Gas Technology', 
        url: '#'
      }
    ]
  },

  // ================= FOOD ENGINEERING =================
  'FDE 102': {
    title: 'Introduction to Food Engineering',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Food Engineering', 
        url: '#'
      },
      { 
        title: 'Food Processing Technology', 
        url: '#'
      },
      { 
        title: 'Food Engineering Lab Manual', 
        url: '#'
      }
    ]
  },

  // ================= AGRICULTURAL ENGINEERING =================
  'ABE 102': {
    title: 'Introduction to Agricultural and Biosystem Engineering',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Agricultural Engineering Technology', 
        url: '#'
      },
      { 
        title: 'Agricultural Machinery Handbook', 
        url: '#'
      },
      { 
        title: 'Biosystems Engineering Guide', 
        url: '#'
      }
    ]
  },

  // ================= CHEMICAL ENGINEERING =================
  'TCH 101': {
    title: 'Introduction to Chemical Engineering',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Chemical Engineering: Tools for Today and Tomorrow', 
        url: '#'
      },
      { 
        title: 'Chemical Engineering Fundamentals', 
        url: '#'
      },
      { 
        title: 'Chemical Process Engineering', 
        url: '#'
      }
    ]
  },

  // ================= CIVIL ENGINEERING =================
  'CEE 101': {
    title: 'Introduction to Civil Engineering',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Civil Engineering', 
        url: '#'
      },
      { 
        title: 'Civil Engineering Materials', 
        url: '#'
      },
      { 
        title: 'Structural Analysis Basics', 
        url: '#'
      }
    ]
  },
  'GET 211': {
    title: 'Applied Electricity',
    credits: 3,
    textbooks: [
      { 
        title: 'Basic Electrical Engineering', 
        url: 'https://drive.google.com/drive/folders/1RYbCNkipEMqhhHvYrSr7w5P54KppiFa4?usp=drive_link'},
        {
          title:'Textbook of electrical technology',
          url:'https://drive.google.com/file/d/11yXSe_nNTbh4-e18CVr3L5xs9DSgn1RR/view?usp=sharing'
        },

        {
          title:'Kirchoff Circuit Law',
          url:'https://drive.google.com/file/d/1_dqOp0eJ14ROvH-xVM8GuSsq8RZwiTGh/view?usp=drive_link'
        },     {
          title:'DC.Circuit',
          url:'https://drive.google.com/file/d/1ha-4szcm1vTuDORLtqxBO9currshvpet/view?usp=drive_link'
        }



    ]
  },
  'GET 212': {
    title: 'Fundamentals of Fluid Mechanics',
    credits: 3,
    textbooks: [
      { 
        title: 'Introduction to Fluid Mechanics', 
        url: 'https://drive.google.com/file/d/1MkTDwd9L87i6AX61qNop1kr-WHtbA9HC/view?usp=drive_link'  // Replace with actual link
      },
{
        title: 'Rashput Fuild mechanics',
        url:'https://drive.google.com/file/d/1gteAIWEtTebfRQ75u66toMve94qg1dmU/view?usp=sharing'
      },

  {
        title: 'fundamental of fuild mechanics ',
        url:'https://drive.google.com/file/d/120I7kYALJ32eJggFyRL0VcMH4yH7J8ij/view?usp=sharing'
      },

      {
        title: 'Course outline',
        url: 'https://drive.google.com/file/d/1R2YGADpfSVFtWqpLUsRROSr-QWA0-Cqo/view?usp=drive_link'
      }

    ]
  },
  'GET 213': {
    title: 'Engineering Mathematics',
    credits: 3,
    textbooks: [
      { 
        title: 'past question', 
        url: 'https://drive.google.com/file/d/1lwqZG4g6hYFGf6C4DQ17PybXo__5ZNfv/view?usp=drive_link'  // Replace with actual link
      },
    {
      title: '',
      url: ''
    },
       {
      title: 'Enginering mathematics by John bird ',
      url: 'https://drive.google.com/file/d/1FovzriulcaIX8lodZO3b0N9QQbYxfv2w/view?usp=drive_link'
    },
       {
      title: 'Engnering mathemaics by K.A.Stroud',
      url: 'https://drive.google.com/file/d/1LrHYkON-7SYRQPVUpb7AjC6VyIGL1wiX/view?usp=drive_link'
    },
    ]
  },
  'GET 214': {
    title: 'Computing and Software Development',
    credits: 3,
    textbooks: [
      { 
        title: 'Introduction to python syntax', 
        url: 'https://drive.google.com/file/d/1TwKA0KAQUyXfqr5Oscg1dM2d0RArIxPS/view?usp=drive_link'  // Replace with actual link
      },
      {
        title:'python expression',
        url: 'https://drive.google.com/file/d/1qzxHRboSe-rg9iEGmgA0h-QRiZ0WcOhY/view?usp=drive_link'
      },

      { 
        title:'Decision',
        url: 'https://drive.google.com/file/d/1VHQy0r3kjkevrVekf-u-lyEONqMUauqR/view?usp=drive_link'
      },

    {
      title: 'Loops',
      url: 'https://drive.google.com/file/d/1jUHDuwlwhPFAriLoCL_Ez-JPm9vn8raj/view?usp=drive_link',
    },

    {
      title: 'python data structures',
      url: 'https://drive.google.com/file/d/1sNuFZO4E1VL25Foqt5lMy09JVLJ-emiW/view?usp=drive_link',
    },
    {
      title: 'Python funtion',
      url: 'https://drive.google.com/file/d/16dydfPGFuPG8uaRtqpJv18qiF1dxFN7v/view?usp=sharing'
    },

  {
      title: 'OOP',
      url: 'https://drive.google.com/file/d/1Eijkv8tN1n8I1x9HM5bErFcfgA_7Wh8e/view?usp=sharing'
    },
      {
      title: 'PYTHON BASICS-SAMPLE CHAPTERS',
      url: 'https://drive.google.com/file/d/1ETbcFd6rcaBtoGJDhB88x334BN_6mCal/view?usp=drive_link'
    },
  {
      title: 'Introduction to python programing',
      url: 'https://drive.google.com/file/d/1ydncYDULp-AVbK9NUgT6_jYa0VgVLY45/view?usp=drive_link'
    },

     {
      title: 'Mastering python ',
      url: 'https://drive.google.com/file/d/1kCUQFmntadDHh5G3R5m5ByQ6AvzA20k6/view?usp=drive_link'
    },

   

    ]
  },
  'GET 215': {
    title: 'Strength of Materials',
    credits: 3,
    textbooks: [
      { 
        title: 'GET 215 note ', 
        url: 'https://drive.google.com/file/d/13YqNThpkd38wcRFNPKc9pt2YfFfq4YVb/view?usp=drive_link'  // Replace with actual link
      },

      {
        title:'Strength of marterials 2',
        url:'https://drive.google.com/file/d/1_z08NNtDMXf_VNwdL_HQF1BmlbptxpRm/view?usp=drive_link'
      }
    ]
  },
  'GST 211': {
    title: 'Philosophy, Logic and Human Existence',
    credits: 2,
    textbooks: [
      { 
        title: 'Introduction to Philosophy and Logic', 
        url: 'https://drive.google.com/file/d/1X3k1vBuILPS23yCuFGbCw8CqqykCjWva/view?usp=drive_link'  // Replace with actual link
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
        url: 'https://drive.google.com/file/d/1SCjuwHgQA0kgTudnzcdHeFZzQT5xCdgp/view?usp=drive_link'  // Replace with actual link
      },

      {
        title: 'callister-materials-science-and-engineering',
        url:  'https://drive.google.com/file/d/1VL2-R3_K7D-KnUdS0WKW-tLNA4OS5b8V/view?usp=drive_link'
      },
        {
        title: 'Engineering Materials',
        url:  'https://drive.google.com/file/d/131zxdaxImcLo3TvJz_rf3z_w5X3tRE1X/view?usp=sharing'
      },
        {
        title: 'Engineering Materials lecture note ',
        url:  'https://drive.google.com/file/d/1xzI_KVk_FGTqvgnyVeWZNaqrz1KoMFEy/view?usp=sharing'
      },

      {
        title:'Past question ',
        url:'https://drive.google.com/file/d/1ZazhxJSsylJx67__2hUM6jNKmf2DavRp/view?usp=sharing'
      }
    ]
  },
  'GET 222': {
    title: 'Student Workshop Practice',
    credits: 2,
    textbooks: [
      { 
        title: 'Workshop Practice Manual', 
        url: 'https://drive.google.com/file/d/1pUjwjg63HmuAb51Tx96DFQ8AD6hAM6bQ/view?usp=sharing'  // Replace with actual link
      }
    ]
  },
  'GET 223': {
    title: 'Fundamentals of Fluid Thermodynamics',
    credits: 3,
    textbooks: [
      { 
        title: 'Applied Thermodynamics', 
        url: 'https://drive.google.com/file/d/1nFaxUXE205oc1b0Fh2k6ndmCGkKY4Blc/view?usp=sharing'  // Replace with actual link
      }
    ]
  },
  'GET 224': {
    title: 'Engineering Mathematics II',
    credits: 3,
    textbooks: [
      { 
        title: 'Engineering Mathematics by John Bird', 
        url: 'https://drive.google.com/file/d/1FovzriulcaIX8lodZO3b0N9QQbYxfv2w/view?usp=drive_link'  // Replace with actual link
      },

      {
        title: 'Enginering mathematics by K.A.Stroud',
        url: 'https://drive.google.com/file/d/1LrHYkON-7SYRQPVUpb7AjC6VyIGL1wiX/view?usp=drive_link'
      },

        {
        title: 'Enginerring mathematics by H.K.Das',
        url: 'https://drive.google.com/file/d/1DCQ3PrIsO0zHofpH5t2zV1P6E8m0E25i/view?usp=sharing'
      },

        {
        title: 'Difrential equation',
        url: 'https://drive.google.com/file/d/187iwU9bhMJKXJ8UwJ4W4vBkI9dSMDdgz/view?usp=sharing'
      }
    ]
  },
  'ENT 221': {
    title: 'Entrepreneurship and Innovation',
    credits: 2,
    textbooks: [
      { 
        title: 'Engineering Entrepreneurship', 
        url: 'https://drive.google.com/file/d/1iFjZWukizEy4NZOkHwGYVvloGvb8MHYl/view?usp=drive_link'
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
          code: 'GET 311', 
          title: 'Engineering mathematics III ', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering problems' 
        },
        { 
          code: 'GET 312', 
          title: 'Engineering Statistics and data analysis', 
          credits: 3, 
          description: 'Statistical methods for data analysis and decison making' 
        },
        { 
          code: 'UUY-MEE 311', 
          title: 'computer aided design', 
          credits: 2, 
          description: 'computer adided design for mechanical engineers' 
        },
        { 
          code: 'UYY-MEE 312', 
          title: 'Measurement and instrumentation', 
          credits: 1, 
          description: 'Measurement and instrumentation for engineers ' 
        },
        { 
          code: 'UYY-MEE 313', 
          title: 'Control system', 
          credits: 2, 
          description: 'Motors, generators, and control systems.' 
        },

         { 
          code: 'UUY-MEE 314', 
          title: 'Theory of machines', 
          credits: 2, 
          description: '' 
        },

         { 
          code: 'UUY-MEE 315', 
          title: 'Manufaturing Technology', 
          credits: 2, 
          description: '' 
        },

         { 
          code: 'UUY-MEE 316', 
          title: 'Mechanical lab 1', 
          credits: 2, 
          description: '' 
        },
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
          code: 'GET 121', 
          title: 'General Graphics and Solid Modelling', 
          credits: 2, 
          description: 'Introduction to technical drawing and 3D modeling.' 
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
          code: 'ENT 221', 
          title: 'Entrepreneurship and Innovation', 
          credits: 2, 
          description: 'Fundamentals of starting and managing innovative engineering ventures.' 
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
          code: 'GET 311', 
          title: 'Engineering Mathematics III', 
          credits: 3, 
          description: 'Advanced mathematical methods for engineering applications' 
        },
        { 
          code: 'GET 312', 
          title: 'Engineering Statistics and data  analysis', 
          credits: 2, 
          description: 'Statistical method for data analysis and decion making' 
        },
        { 
          code: 'UUY-EEE 311', 
          title: 'Measurement & Instrumentation', 
          credits: 2, 
          description: 'Principles of measurement and instrumentation in engineering.' 
        },
        { 
          code: 'UUY-EEE 312', 
          title: 'Analogue Electronics circuits', 
          credits: 2, 
          description: '' 
        },
        { 
          code: 'UUY-EEE 313', 
          title: 'Electric Circuit Theory I', 
          credits: 2, 
          description: '' 
        },

         { 
          code: 'UUY-EEE 314', 
          title: 'Electromagnetic Fields & Waves ', 
          credits: 2, 
          description: '' 
        },

         { 
          code: 'GST 311', 
          title: 'Peace and conflict resolution', 
          credits: 2, 
          description: '' 
        },
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GET 321', 
          title: 'Engineering Mathematics IV', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering applications.' 
        },
        { 
          code: 'GET 322', 
          title: 'Engineering Communication, Technical Writing and Presentation', 
          credits: 3, 
          description: 'Development of communication skills for technical documentation and presentations.' 
        },
        { 
          code: 'GET 324', 
          title: 'SIWES II - Students Work Experience Scheme', 
          credits: 4, 
          description: 'Industrial attachment and practical work experience in engineering.' 
        },
        { 
          code: 'ENT 312', 
          title: 'Venture Creation', 
          credits: 2, 
          description: 'Principles and practices of creating and managing new business ventures.' 
        },
        { 
          code: 'GET 325', 
          title: 'Introduction to Artificial Intelligence, Machine Learning and Convergent Technologies', 
          credits: 3, 
          description: 'Study of AI fundamentals, machine learning algorithms, and emerging convergent technologies.' 
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
        },
      ]
    }
  ]
},

// ================= 300 LEVEL - COMPUTER ENGINEERING =================
{
  department: 'computer',
  level: '300',
  name: 'Third Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GET 311', 
          title: 'Engineering Mathematics III', 
          credits: 3, 
          description: 'Advanced mathematical methods for engineering applications.' 
        },
        { 
          code: 'GET 312', 
          title: 'Engineering Statistics and Data Analysis', 
          credits: 3, 
          description: 'Statistical methods for data analysis and decision making.' 
        },
        { 
          code: 'CPE 311', 
          title: 'Computer Organization and Architecture', 
          credits: 2, 
          description: 'Study of computer organization, architecture, and design principles.' 
        },
        { 
          code: 'CPE 312', 
          title: 'Measurement and Instrumentation', 
          credits: 3, 
          description: 'Principles of measurement and instrumentation in computer engineering.' 
        },
        { 
          code: 'EEE 321', 
          title: 'Analogue Electronic Circuits', 
          credits: 2, 
          description: 'Analysis and design of analog electronic circuits and systems.' 
        },
        { 
          code: 'GST 311', 
          title: 'Peace and Conflict Resolution', 
          credits: 2, 
          description: 'Study of peace building and conflict resolution strategies.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GET 321', 
          title: 'Engineering Mathematics IV', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering applications.' 
        },
        { 
          code: 'GET 322', 
          title: 'Engineering Communication, Technical Writing and Presentation', 
          credits: 2, 
          description: 'Development of communication skills for technical documentation and presentations.' 
        },
        { 
          code: 'GET 323', 
          title: 'Renewable Energy Systems and Technologies', 
          credits: 3, 
          description: 'Study of renewable energy sources, systems, and emerging technologies.' 
        },
        { 
          code: 'GET 324', 
          title: 'SIWES II - Students Work Experience Scheme', 
          credits: 4, 
          description: 'Industrial attachment and practical work experience in engineering.' 
        },
        { 
          code: 'EEE 322', 
          title: 'Digital Electronics Circuits', 
          credits: 3, 
          description: 'Design and analysis of digital electronic circuits and systems.' 
        },
        { 
          code: 'ENT 312', 
          title: 'Venture Creation', 
          credits: 2, 
          description: 'Principles and practices of creating and managing new business ventures.' 
        }
      ]
    }
  ]
},

// ================= 400 LEVEL - COMPUTER ENGINEERING =================
{
  department: 'computer',
  level: '400',
  name: 'Fourth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'CPE 411', 
          title: 'Microprocessor Systems and Interfacing', 
          credits: 3, 
          description: 'Study of microprocessor architecture, systems design, and interfacing techniques.' 
        },
        { 
          code: 'CPE 412', 
          title: 'Control Systems', 
          credits: 3, 
          description: 'Analysis and design of control systems for engineering applications.' 
        },
        { 
          code: 'CPE 413', 
          title: 'Data Communication and Networks', 
          credits: 3, 
          description: 'Principles of data communication and computer network design.' 
        },
        { 
          code: 'CPE 415', 
          title: 'Computer Software Engineering', 
          credits: 3, 
          description: 'Software engineering principles, methodologies, and best practices.' 
        },
        { 
          code: 'CPE 416', 
          title: 'Prototyping Technologies', 
          credits: 3, 
          description: 'Modern prototyping techniques and technologies for engineering applications.' 
        }
      ]
    }
  ]
},

// ================= 500 LEVEL - COMPUTER ENGINEERING =================
{
  department: 'computer',
  level: '500',
  name: 'Fifth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'CPE 511', 
          title: 'Reliability and Maintainability', 
          credits: 3, 
          description: 'Study of system reliability, maintainability, and failure analysis.' 
        },
        { 
          code: 'CPE 512', 
          title: 'Embedded System Design', 
          credits: 3, 
          description: 'Design and implementation of embedded systems and applications.' 
        },
        { 
          code: 'CPE 514', 
          title: 'Digital Signal Processing', 
          credits: 3, 
          description: 'Digital signal processing techniques and applications in engineering.' 
        },
        { 
          code: 'CPE 515', 
          title: 'Digital System Design with VHDL', 
          credits: 3, 
          description: 'Design of digital systems using VHDL hardware description language.' 
        },
        { 
          code: 'CPE 516', 
          title: 'Artificial Neural Network', 
          credits: 3, 
          description: 'Study of artificial neural networks and their applications.' 
        },
        { 
          code: 'CPE 517', 
          title: 'Cyberpreneurship & Cyberlaw', 
          credits: 2, 
          description: 'Legal aspects and entrepreneurship in cyberspace and digital business.' 
        },
        { 
          code: 'CPE 518', 
          title: 'Computer Graphics & Animation', 
          credits: 3, 
          description: 'Principles of computer graphics, rendering, and animation techniques.' 
        },
        { 
          code: 'CPE 519', 
          title: 'Computer Security Techniques I', 
          credits: 3, 
          description: 'Fundamental techniques and principles of computer security.' 
        },
        { 
          code: 'GET 501', 
          title: 'Engineering Management', 
          credits: 3, 
          description: 'Management principles and practices for engineering projects and organizations.' 
        },
        { 
          code: 'GET 502', 
          title: 'Engineering Law', 
          credits: 3, 
          description: 'Legal principles and regulations relevant to engineering practice.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'CPE 521', 
          title: 'Digital Image Processing', 
          credits: 2, 
          description: 'Techniques and algorithms for digital image processing and analysis.' 
        },
        { 
          code: 'CPE 522', 
          title: 'Fuzzy Logic & Programming', 
          credits: 2, 
          description: 'Fuzzy logic systems and their programming applications.' 
        },
        { 
          code: 'CPE 523', 
          title: 'Robotics & Automation', 
          credits: 2, 
          description: 'Principles of robotics design and automated systems.' 
        },
        { 
          code: 'CPE 524', 
          title: 'Cryptography Principles & Applications', 
          credits: 2, 
          description: 'Fundamental principles and practical applications of cryptography.' 
        },
        { 
          code: 'CPE 525', 
          title: 'Design & Installation of Electrical & ICT Services', 
          credits: 3, 
          description: 'Design principles and installation techniques for electrical and ICT infrastructure.' 
        },
        { 
          code: 'CPE 526', 
          title: 'Computer Security Techniques II', 
          credits: 2, 
          description: 'Advanced techniques and strategies for computer security.' 
        }
      ]
    }
  ]
},

// ================= 100 LEVEL - CIVIL ENGINEERING =================
{
  department: 'civil',
  level: '100',
  name: 'First Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GST 111', 
          title: 'Communication in English', 
          credits: 2, 
          description: 'Development of effective communication skills in English.' 
        },
        { 
          code: 'CHM 111', 
          title: 'General Chemistry I', 
          credits: 1, 
          description: 'Fundamental concepts and principles of chemistry.' 
        },
        { 
          code: 'CHM 117', 
          title: 'General Chemistry Practical I', 
          credits: 1, 
          description: 'Laboratory work in basic chemistry.' 
        },
        { 
          code: 'GET 111', 
          title: 'Engineering in Society', 
          credits: 1, 
          description: 'Role and impact of engineering in society.' 
        },
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
          code: 'PHY 112', 
          title: 'UNIUYO Physics', 
          credits: 2, 
          description: 'Physics principles with local context.' 
        },
        { 
          code: 'PHY 117', 
          title: 'General Practical Physics', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'CEE 111', 
          title: 'Introduction to Civil Engineering', 
          credits: 2, 
          description: 'Introduction to civil engineering principles and practices.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GST 112', 
          title: 'Nigerian People and Culture', 
          credits: 2, 
          description: 'Study of Nigerian cultural diversity and heritage.' 
        },
        { 
          code: 'GET 121', 
          title: 'General Graphics and Solid Modelling', 
          credits: 2, 
          description: 'Introduction to technical drawing and 3D modeling.' 
        },
        { 
          code: 'MTH 121', 
          title: 'General Mathematics II', 
          credits: 2, 
          description: 'Advanced mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'PHY 122', 
          title: 'General Physics III', 
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
          code: 'MTH 122', 
          title: 'General Mathematics III', 
          credits: 2, 
          description: 'Further advanced mathematical techniques for engineering.' 
        },
        { 
          code: 'STAT 121', 
          title: 'Probability I', 
          credits: 2, 
          description: 'Introduction to probability theory and statistical methods.' 
        }
      ]
    }
  ]
},

// ================= 200 LEVEL - CIVIL ENGINEERING =================
{
  department: 'civil',
  level: '200',
  name: 'Second Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GST 211', 
          title: 'Philosophy, Logic and Human Existence', 
          credits: 2, 
          description: 'Critical thinking and philosophical analysis.' 
        },
        { 
          code: 'GET 211', 
          title: 'Applied Electricity', 
          credits: 3, 
          description: 'Fundamentals of electrical circuits and systems for civil engineers.' 
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
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'ENT 221', 
          title: 'Entrepreneurship and Innovation', 
          credits: 2, 
          description: 'Fundamentals of starting and managing innovative engineering ventures.' 
        },
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
          code: 'CEE 221', 
          title: 'Civil Engineering Drawing', 
          credits: 2, 
          description: 'Technical drawing and drafting techniques for civil engineering applications.' 
        }
      ]
    }
  ]
},

// ================= 300 LEVEL - CIVIL ENGINEERING =================
{
  department: 'civil',
  level: '300',
  name: 'Third Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GET 311', 
          title: 'Engineering Mathematics III', 
          credits: 3, 
          description: 'Advanced mathematical methods for engineering applications.' 
        },
        { 
          code: 'CEE 311', 
          title: 'Fluid Mechanics', 
          credits: 3, 
          description: 'Study of fluid behavior and its applications in civil engineering.' 
        },
        { 
          code: 'CEE 312', 
          title: 'Engineering Geology', 
          credits: 3, 
          description: 'Geological principles and their applications in engineering projects.' 
        },
        { 
          code: 'CEE 313', 
          title: 'Structural Mechanics I', 
          credits: 3, 
          description: 'Analysis of structural elements and their behavior under loads.' 
        },
        { 
          code: 'UYY-CEE 314', 
          title: 'Soil Mechanics', 
          credits: 3, 
          description: 'Study of soil properties and behavior for foundation design.' 
        },
        { 
          code: 'GET 312', 
          title: 'Engineering Statistics and Data Analysis', 
          credits: 3, 
          description: 'Statistical methods for data analysis and decision making.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GET 321', 
          title: 'Engineering Mathematics IV', 
          credits: 3, 
          description: 'Advanced mathematical techniques for engineering applications.' 
        },
        { 
          code: 'GET 322', 
          title: 'Engineering Communication, Technical Writing and Presentation', 
          credits: 3, 
          description: 'Development of communication skills for technical documentation and presentations.' 
        },
        { 
          code: 'GET 323', 
          title: 'Renewable Energy Systems and Technologies', 
          credits: 3, 
          description: 'Study of renewable energy sources, systems, and emerging technologies.' 
        },
        { 
          code: 'GET 324', 
          title: 'SIWES II - Students Work Experience Scheme', 
          credits: 4, 
          description: 'Industrial attachment and practical work experience in engineering.' 
        },
        { 
          code: 'ENT 322', 
          title: 'Venture Creation', 
          credits: 2, 
          description: 'Principles and practices of creating and managing new business ventures.' 
        }
      ]
    }
  ]
},

// ================= 400 LEVEL - CIVIL ENGINEERING =================
{
  department: 'civil',
  level: '400',
  name: 'Fourth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'CEE 411', 
          title: 'Hydraulics and Hydrology', 
          credits: 3, 
          description: 'Study of water flow, hydraulic systems, and hydrological analysis.' 
        },
        { 
          code: 'CEE 412', 
          title: 'Civil Engineering Practice', 
          credits: 3, 
          description: 'Professional practice and project management in civil engineering.' 
        },
        { 
          code: 'CEE 413', 
          title: 'Structural Mechanics II', 
          credits: 3, 
          description: 'Advanced analysis of structural systems and design principles.' 
        },
        { 
          code: 'CEE 414', 
          title: 'Design of Structures II', 
          credits: 3, 
          description: 'Advanced structural design methods and applications.' 
        },
        { 
          code: 'CEE 415', 
          title: 'Soil Mechanics II', 
          credits: 3, 
          description: 'Advanced soil mechanics and foundation engineering principles.' 
        },
        { 
          code: 'CEE 416', 
          title: 'Engineering Surveying & Photogrammetry II', 
          credits: 3, 
          description: 'Advanced surveying techniques and photogrammetric applications.' 
        },
        { 
          code: 'CEE 417', 
          title: 'Highway Engineering', 
          credits: 3, 
          description: 'Design, construction, and maintenance of highway systems.' 
        }
      ]
    }
  ]
},

// ================= 500 LEVEL - CIVIL ENGINEERING =================
{
  department: 'civil',
  level: '500',
  name: 'Fifth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'CEE 511', 
          title: 'Structural Design', 
          credits: 4, 
          description: 'Advanced structural design principles and applications.' 
        },
        { 
          code: 'CEE 512', 
          title: 'Geotechnical Engineering', 
          credits: 3, 
          description: 'Advanced geotechnical analysis and earth structure design.' 
        },
        { 
          code: 'CEE 513', 
          title: 'Water Resources & Environmental Engineering', 
          credits: 3, 
          description: 'Water resource management and environmental engineering principles.' 
        },
        { 
          code: 'CEE 514', 
          title: 'Highway & Transportation Engineering', 
          credits: 3, 
          description: 'Advanced highway and transportation system design.' 
        },
        { 
          code: 'CEE 515', 
          title: 'Foundation Engineering', 
          credits: 3, 
          description: 'Design and analysis of foundation systems.' 
        },
        { 
          code: 'CEE 516', 
          title: 'Construction Engineering', 
          credits: 3, 
          description: 'Construction methods, planning, and project management.' 
        },
        { 
          code: 'CEE 517', 
          title: 'Hydraulics Design', 
          credits: 3, 
          description: 'Design of hydraulic systems and water control structures.' 
        },
        { 
          code: 'CEE 518', 
          title: 'Waste Management Engineering', 
          credits: 3, 
          description: 'Waste treatment, disposal, and environmental protection systems.' 
        },
        { 
          code: 'CEE 519', 
          title: 'Terotechnology', 
          credits: 3, 
          description: 'Maintenance engineering and asset management strategies.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'CEE 510', 
          title: 'Building Services Engineering', 
          credits: 3, 
          description: 'Design and integration of building services systems.' 
        },
        { 
          code: 'GET 501', 
          title: 'Engineering Management', 
          credits: 3, 
          description: 'Management principles and practices for engineering projects and organizations.' 
        },
        { 
          code: 'GET 502', 
          title: 'Engineering Law', 
          credits: 2, 
          description: 'Legal principles and regulations relevant to engineering practice.' 
        }
      ]
    }
  ]
},

// ================= 100 LEVEL - PETROLEUM ENGINEERING =================
{
  department: 'petroleum',
  level: '100',
  name: 'First Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GST 111', 
          title: 'Communication in English', 
          credits: 2, 
          description: 'Development of effective communication skills in English.' 
        },
        { 
          code: 'CHM 111', 
          title: 'General Chemistry I', 
          credits: 1, 
          description: 'Fundamental concepts and principles of chemistry.' 
        },
        { 
          code: 'GET 111', 
          title: 'Engineering in Society', 
          credits: 1, 
          description: 'Role and impact of engineering in society.' 
        },
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
          code: 'PHY 112', 
          title: 'UNIUYO Physics', 
          credits: 2, 
          description: 'Physics principles with local context.' 
        },
        { 
          code: 'PHY 117', 
          title: 'General Practical Physics', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'PEE 111', 
          title: 'Introduction to Petroleum and Gas Industry', 
          credits: 2, 
          description: 'Overview of petroleum industry operations and gas sector.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GST 121', 
          title: 'Nigerian People and Culture', 
          credits: 2, 
          description: 'Study of Nigerian cultural diversity and heritage.' 
        },
        { 
          code: 'CHM 121', 
          title: 'General Chemistry II', 
          credits: 2, 
          description: 'Advanced principles of chemistry for engineers.' 
        },
        { 
          code: 'CHM 128', 
          title: 'General Chemistry Practical II', 
          credits: 1, 
          description: 'Laboratory work in advanced chemistry experiments.' 
        },
        { 
          code: 'PHY 121', 
          title: 'General Physics II', 
          credits: 2, 
          description: 'Electricity, magnetism, and modern physics.' 
        },
        { 
          code: 'PHY 122', 
          title: 'General Physics III', 
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
          code: 'MTH 121', 
          title: 'General Mathematics II', 
          credits: 2, 
          description: 'Advanced mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'MTH 122', 
          title: 'General Mathematics III', 
          credits: 2, 
          description: 'Further advanced mathematical techniques for engineering.' 
        },
        { 
          code: 'STAT 121', 
          title: 'Probability I', 
          credits: 2, 
          description: 'Introduction to probability theory and statistical methods.' 
        },
        { 
          code: 'GET 121', 
          title: 'General Graphics and Solid Modelling', 
          credits: 2, 
          description: 'Introduction to technical drawing and 3D modeling.' 
        }
      ]
    }
  ]
},

// ================= 200 LEVEL - PETROLEUM ENGINEERING =================
{
  department: 'petroleum',
  level: '200',
  name: 'Second Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GST 211', 
          title: 'Philosophy, Logic and Human Existence', 
          credits: 2, 
          description: 'Critical thinking and philosophical analysis.' 
        },
        { 
          code: 'GET 211', 
          title: 'Applied Electricity', 
          credits: 3, 
          description: 'Fundamentals of electrical circuits and systems for petroleum engineers.' 
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
          code: 'PEE 211', 
          title: 'Petroleum Geology', 
          credits: 3, 
          description: 'Study of geological formations and petroleum systems.' 
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
          code: 'GET 225', 
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
},

// ================= 300 LEVEL - PETROLEUM ENGINEERING =================
{
  department: 'petroleum',
  level: '300',
  name: 'Third Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GST 311', 
          title: 'Peace and Conflict Resolution', 
          credits: 2, 
          description: 'Study of peace building and conflict resolution strategies.' 
        },
        { 
          code: 'GET 312', 
          title: 'Engineering Statistics and Data Analysis', 
          credits: 3, 
          description: 'Statistical methods for data analysis and decision making.' 
        },
        { 
          code: 'PEE 311', 
          title: 'Drilling Technology', 
          credits: 2, 
          description: 'Principles and techniques of drilling operations in petroleum industry.' 
        },
        { 
          code: 'PEE 313', 
          title: 'Applied Geophysics and Petroleum Exploration', 
          credits: 2, 
          description: 'Geophysical methods and techniques for petroleum exploration.' 
        },
        { 
          code: 'PEE 314', 
          title: 'Petroleum Production Engineering I', 
          credits: 2, 
          description: 'Introduction to petroleum production methods and equipment.' 
        },
        { 
          code: 'PEE 315', 
          title: 'Rock and Fluid Properties', 
          credits: 2, 
          description: 'Study of reservoir rock properties and fluid behavior.' 
        },
        { 
          code: 'PEE 317', 
          title: 'Industrial Studies', 
          credits: 2, 
          description: 'Industrial case studies and field visits in petroleum industry.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'PEE 310', 
          title: 'Fundamentals of Reservoir Engineering', 
          credits: 2, 
          description: 'Basic principles of reservoir engineering and analysis.' 
        },
        { 
          code: 'PEE 312', 
          title: 'Production and Reservoir Laboratory', 
          credits: 2, 
          description: 'Laboratory studies of production and reservoir properties.' 
        },
        { 
          code: 'GET 322', 
          title: 'Engineering Communication, Technical Writing and Presentation', 
          credits: 3, 
          description: 'Development of communication skills for technical documentation and presentations.' 
        },
        { 
          code: 'GET 324', 
          title: 'SIWES II - Students Work Experience Scheme', 
          credits: 4, 
          description: 'Industrial attachment and practical work experience in engineering.' 
        },
        { 
          code: 'ENT 312', 
          title: 'Venture Creation', 
          credits: 2, 
          description: 'Principles and practices of creating and managing new business ventures.' 
        }
      ]
    }
  ]
},

// ================= 400 LEVEL - PETROLEUM ENGINEERING =================
{
  department: 'petroleum',
  level: '400',
  name: 'Fourth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'PEE 411', 
          title: 'Industrial Studies III', 
          credits: 3, 
          description: 'Advanced industrial case studies and field visits in petroleum industry.' 
        },
        { 
          code: 'PEE 412', 
          title: 'Applied Geophysics and Petroleum Exploration', 
          credits: 2, 
          description: 'Advanced geophysical methods and techniques for petroleum exploration.' 
        },
        { 
          code: 'PEE 413', 
          title: 'Drilling Technology II', 
          credits: 3, 
          description: 'Advanced drilling operations and well completion techniques.' 
        },
        { 
          code: 'PEE 414', 
          title: 'Reservoir Engineering II', 
          credits: 3, 
          description: 'Advanced reservoir engineering analysis and management.' 
        },
        { 
          code: 'PEE 415', 
          title: 'Petroleum Production Engineering II', 
          credits: 3, 
          description: 'Advanced petroleum production methods and optimization.' 
        },
        { 
          code: 'PEE 416', 
          title: 'Well Logging', 
          credits: 3, 
          description: 'Well logging techniques and formation evaluation.' 
        },
        { 
          code: 'PEE 417', 
          title: 'Oil Pollution and Control', 
          credits: 3, 
          description: 'Environmental impact and control of oil pollution.' 
        },
        { 
          code: 'TIE 412', 
          title: 'Engineering Economics', 
          credits: 2, 
          description: 'Economic analysis and decision making in engineering projects.' 
        }
      ]
    }
  ]
},

// ================= 500 LEVEL - PETROLEUM ENGINEERING =================
{
  department: 'petroleum',
  level: '500',
  name: 'Fifth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GET 501', 
          title: 'Engineering Management', 
          credits: 3, 
          description: 'Management principles and practices for engineering projects and organizations.' 
        },
        { 
          code: 'GET 502', 
          title: 'Engineering Law', 
          credits: 2, 
          description: 'Legal principles and regulations relevant to engineering practice.' 
        },
        { 
          code: 'PEE 511', 
          title: 'Drilling Technology III', 
          credits: 3, 
          description: 'Advanced drilling technology and well intervention techniques.' 
        },
        { 
          code: 'PEE 512', 
          title: 'Reservoir Engineering III', 
          credits: 3, 
          description: 'Advanced reservoir engineering and field development planning.' 
        },
        { 
          code: 'PEE 513', 
          title: 'Petroleum Refining Technology', 
          credits: 3, 
          description: 'Petroleum refining processes and technology.' 
        },
        { 
          code: 'PEE 514', 
          title: 'Petroleum Production Engineering III', 
          credits: 3, 
          description: 'Advanced production engineering and optimization techniques.' 
        },
        { 
          code: 'PEE 515', 
          title: 'Reservoir Modelling and Simulation', 
          credits: 3, 
          description: 'Computer modeling and simulation of reservoir systems.' 
        },
        { 
          code: 'PEE 516', 
          title: 'Enhanced Oil Recovery', 
          credits: 2, 
          description: 'Advanced techniques for enhanced oil recovery methods.' 
        },
        { 
          code: 'PEE 517', 
          title: 'Petroleum Economics and Management', 
          credits: 2, 
          description: 'Economic analysis and management in petroleum industry.' 
        },
        { 
          code: 'PEE 519', 
          title: 'Petroleum Product Transport & Storage', 
          credits: 2, 
          description: 'Transportation and storage systems for petroleum products.' 
        }
      ]
    }
  ]
},

// ================= 100 LEVEL - CHEMICAL ENGINEERING =================
{
  department: 'chemical',
  level: '100',
  name: 'First Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GST 111', 
          title: 'Communication in English', 
          credits: 2, 
          description: 'Development of effective communication skills in English.' 
        },
        { 
          code: 'GET 111', 
          title: 'Engineering in Society', 
          credits: 1, 
          description: 'Role and impact of engineering in society.' 
        },
        { 
          code: 'CHM 111', 
          title: 'General Chemistry I', 
          credits: 1, 
          description: 'Fundamental concepts and principles of chemistry.' 
        },
        { 
          code: 'CHM 117', 
          title: 'General Chemistry Practical I', 
          credits: 1, 
          description: 'Laboratory work in basic chemistry.' 
        },
        { 
          code: 'PHY 111', 
          title: 'General Physics', 
          credits: 2, 
          description: 'Fundamentals of mechanics, heat, and thermodynamics.' 
        },
        { 
          code: 'PHY 112', 
          title: 'UNIUYO Physics', 
          credits: 2, 
          description: 'Physics principles with local context.' 
        },
        { 
          code: 'PHY 117', 
          title: 'General Practical Physics', 
          credits: 1, 
          description: 'Laboratory work in basic physics experiments.' 
        },
        { 
          code: 'TCH 111', 
          title: 'Introduction to Chemical Engineering', 
          credits: 2, 
          description: 'Overview of chemical engineering principles and applications.' 
        },
        { 
          code: 'MTH 111', 
          title: 'General Mathematics', 
          credits: 2, 
          description: 'Basic mathematical concepts and techniques for engineers.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GST 112', 
          title: 'Nigerian People and Culture', 
          credits: 2, 
          description: 'Study of Nigerian cultural diversity and heritage.' 
        },
        { 
          code: 'MTH 121', 
          title: 'General Mathematics II', 
          credits: 2, 
          description: 'Advanced mathematical concepts and techniques for engineers.' 
        },
        { 
          code: 'GET 121', 
          title: 'General Graphics and Solid Modelling', 
          credits: 2, 
          description: 'Introduction to technical drawing and 3D modeling.' 
        },
        { 
          code: 'MTH 122', 
          title: 'General Mathematics III', 
          credits: 2, 
          description: 'Further advanced mathematical techniques for engineering.' 
        },
        { 
          code: 'PHY 122', 
          title: 'General Physics III', 
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
          code: 'STAT 121', 
          title: 'Probability I', 
          credits: 2, 
          description: 'Introduction to probability theory and statistical methods.' 
        },
        { 
          code: 'PHY 121', 
          title: 'General Physics II', 
          credits: 2, 
          description: 'Electricity, magnetism, and modern physics.' 
        },
        { 
          code: 'CHM 121', 
          title: 'General Chemistry II', 
          credits: 2, 
          description: 'Advanced principles of chemistry for engineers.' 
        },
        { 
          code: 'CHM 128', 
          title: 'General Chemistry Practical II', 
          credits: 1, 
          description: 'Laboratory work in advanced chemistry experiments.' 
        }
      ]
    }
  ]
},

// ================= 200 LEVEL - CHEMICAL ENGINEERING =================
{
  department: 'chemical',
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
          description: 'Fundamentals of electrical circuits and systems for chemical engineers.' 
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
          description: 'Critical thinking and philosophical analysis.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'ENT 221', 
          title: 'Entrepreneurship and Innovation', 
          credits: 2, 
          description: 'Fundamentals of starting and managing innovative engineering ventures.' 
        },
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
          code: 'GET 225', 
          title: 'Applied Mechanics', 
          credits: 3, 
          description: 'Application of mechanical principles to engineering systems and structures.' 
        }
      ]
    }
  ]
},

// ================= 300 LEVEL - CHEMICAL ENGINEERING =================
{
  department: 'chemical',
  level: '300',
  name: 'Third Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'CHE 311', 
          title: 'Transfer Processes I', 
          credits: 2, 
          description: 'Study of momentum, heat, and mass transfer principles.' 
        },
        { 
          code: 'CHE 312', 
          title: 'Chemical Engineering Thermodynamics', 
          credits: 2, 
          description: 'Thermodynamic principles and applications in chemical engineering.' 
        },
        { 
          code: 'CHE 313', 
          title: 'Separation Processes I', 
          credits: 2, 
          description: 'Introduction to separation techniques and processes.' 
        },
        { 
          code: 'CHE 314', 
          title: 'Separation Processes II', 
          credits: 2, 
          description: 'Advanced separation techniques and process design.' 
        },
        { 
          code: 'CHE 316', 
          title: 'Renewable Energy Systems and Technologies', 
          credits: 3, 
          description: 'Study of renewable energy sources and their engineering applications.' 
        },
        { 
          code: 'CHE 317', 
          title: 'Biochemical Engineering', 
          credits: 2, 
          description: 'Principles and applications of biochemical processes.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'GET 322', 
          title: 'Engineering Communication, Technical Writing and Presentation', 
          credits: 3, 
          description: 'Development of communication skills for technical documentation and presentations.' 
        },
        { 
          code: 'GET 324', 
          title: 'SIWES II - Students Work Experience Scheme', 
          credits: 4, 
          description: 'Industrial attachment and practical work experience in engineering.' 
        },
        { 
          code: 'GET 325', 
          title: 'Introduction to Artificial Intelligence, Machine Learning and Convergent Technologies', 
          credits: 3, 
          description: 'Study of AI fundamentals, machine learning algorithms, and emerging convergent technologies.' 
        },
        { 
          code: 'CHE 322', 
          title: 'Numerical Methods in Chemical Engineering', 
          credits: 2, 
          description: 'Application of numerical methods in chemical engineering problems.' 
        }
      ]
    }
  ]
},

// ================= 400 LEVEL - CHEMICAL ENGINEERING =================
{
  department: 'chemical',
  level: '400',
  name: 'Fourth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'GRE 412', 
          title: 'Engineering Economics', 
          credits: 3, 
          description: 'Economic analysis and decision making in engineering projects.' 
        },
        { 
          code: 'CHE 411', 
          title: 'Heat Transfer', 
          credits: 3, 
          description: 'Study of heat transfer mechanisms and applications in chemical engineering.' 
        },
        { 
          code: 'CHE 412', 
          title: 'Transport Phenomena', 
          credits: 3, 
          description: 'Advanced study of momentum, heat, and mass transfer phenomena.' 
        },
        { 
          code: 'CHE 413', 
          title: 'Separation Process II', 
          credits: 3, 
          description: 'Advanced separation processes and process design.' 
        },
        { 
          code: 'CHE 414', 
          title: 'Chemical Engineering Thermodynamics', 
          credits: 3, 
          description: 'Advanced thermodynamic principles and applications.' 
        },
        { 
          code: 'CHE 415', 
          title: 'Particulate Engineering', 
          credits: 3, 
          description: 'Study of particulate systems and powder technology.' 
        },
        { 
          code: 'CHE 416', 
          title: 'Plant Design I', 
          credits: 3, 
          description: 'Introduction to chemical plant design and process integration.' 
        }
      ]
    }
  ]
},

// ================= 500 LEVEL - CHEMICAL ENGINEERING =================
{
  department: 'chemical',
  level: '500',
  name: 'Fifth Year',
  semesters: [
    // ================= 1st Semester =================
    {
      semester: '1st Semester',
      courses: [
        { 
          code: 'CHE 511', 
          title: 'Chemical Reaction Engineering I', 
          credits: 3, 
          description: 'Fundamentals of chemical reaction kinetics and reactor design.' 
        },
        { 
          code: 'CHE 512', 
          title: 'Process Dynamics and Control I', 
          credits: 3, 
          description: 'Study of process dynamics and control systems in chemical engineering.' 
        },
        { 
          code: 'CHE 513', 
          title: 'Separation Process III', 
          credits: 3, 
          description: 'Advanced separation processes and process optimization.' 
        },
        { 
          code: 'CHE 514', 
          title: 'Chemical Process Technology', 
          credits: 3, 
          description: 'Modern chemical process technologies and industrial applications.' 
        },
        { 
          code: 'CHE 515', 
          title: 'Process Optimization', 
          credits: 3, 
          description: 'Optimization techniques for chemical processes and operations.' 
        },
        { 
          code: 'CHE 516', 
          title: 'Plant Design II', 
          credits: 3, 
          description: 'Advanced chemical plant design and project management.' 
        },
        { 
          code: 'GRE 501', 
          title: 'Engineering Management', 
          credits: 3, 
          description: 'Management principles and practices for engineering projects and organizations.' 
        },
        { 
          code: 'GRE 502', 
          title: 'Engineering Law', 
          credits: 2, 
          description: 'Legal principles and regulations relevant to engineering practice.' 
        }
      ]
    },
    // ================= 2nd Semester =================
    {
      semester: '2nd Semester',
      courses: [
        { 
          code: 'CHE 521', 
          title: 'Process Dynamics and Control II', 
          credits: 3, 
          description: 'Advanced process dynamics and control systems design.' 
        },
        { 
          code: 'CHE 522', 
          title: 'Plant Design III', 
          credits: 3, 
          description: 'Comprehensive plant design project and economic evaluation.' 
        },
        { 
          code: 'CHE 523', 
          title: 'Loss Prevention in Process Industries', 
          credits: 3, 
          description: 'Safety and risk management in chemical process industries.' 
        },
        { 
          code: 'CHE 524', 
          title: 'Petroleum Refining Engineering', 
          credits: 3, 
          description: 'Petroleum refining processes and refinery operations.' 
        },
        { 
          code: 'CHE 525', 
          title: 'Chemical Reaction Engineering II', 
          credits: 3, 
          description: 'Advanced chemical reaction engineering and reactor analysis.' 
        },
        { 
          code: 'CHE 529', 
          title: 'Chemical Process Synthesis & Simulation', 
          credits: 3, 
          description: 'Process synthesis and computer simulation of chemical processes.' 
        }
      ]
    }
  ]
}

];
function DepartmentDetail() {
  const { departmentId: deptId } = useParams();
  const [selectedLevel, setSelectedLevel] = useState('100');
  const [courseMaterials, setCourseMaterials] = useState({});
  const [loadingMaterials, setLoadingMaterials] = useState({});
  const [materialsError, setMaterialsError] = useState({});
  const [expandedCourses, setExpandedCourses] = useState({});
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
    if (url && url !== '#') window.open(url, '_blank');
  };

  // Fetch materials for a specific course
  const fetchCourseMaterials = async (courseCode, semesterName) => {
    const cacheKey = `${courseCode}-${semesterName}`;
    
    // Return cached materials if already fetched
    if (courseMaterials[cacheKey]) {
      return courseMaterials[cacheKey];
    }

    setLoadingMaterials(prev => ({ ...prev, [cacheKey]: true }));
    setMaterialsError(prev => ({ ...prev, [cacheKey]: null }));

    try {
      const departmentName = department.name;
      const response = await materialsAPI.getCourseMaterials(
        departmentName,
        selectedLevel,
        semesterName,
        courseCode
      );

      if (response.success) {
        const materials = response.data || [];
        setCourseMaterials(prev => ({ ...prev, [cacheKey]: materials }));
        return materials;
      } else {
        throw new Error(response.message || 'Failed to fetch materials');
      }
    } catch (error) {
      console.error('Error fetching course materials:', error);
      // Set empty array for API materials but don't show error to user
      // since courseTextbooks will still be available
      setCourseMaterials(prev => ({ ...prev, [cacheKey]: [] }));
      setMaterialsError(prev => ({ ...prev, [cacheKey]: null }));
      return [];
    } finally {
      setLoadingMaterials(prev => ({ ...prev, [cacheKey]: false }));
    }
  };

  // Toggle course expansion and fetch materials
  const toggleCourseExpansion = async (courseCode, semesterName) => {
    const cacheKey = `${courseCode}-${semesterName}`;
    const isExpanded = expandedCourses[cacheKey];

    if (isExpanded) {
      // Collapse course
      setExpandedCourses(prev => ({ ...prev, [cacheKey]: false }));
    } else {
      // Expand course and fetch materials
      setExpandedCourses(prev => ({ ...prev, [cacheKey]: true }));
      await fetchCourseMaterials(courseCode, semesterName);
    }
  };

  // Get textbooks from courseTextbooks constant
  const getCourseTextbooks = (courseCode) => {
    const courseData = courseTextbooks[courseCode];
    if (!courseData || !courseData.textbooks) {
      return [];
    }
    
    return courseData.textbooks
      .filter(textbook => textbook.url && textbook.url !== '#' && textbook.url !== '')
      .map(textbook => ({
        name: textbook.title,
        type: 'Textbook',
        size: null,
        createdTime: new Date().toISOString(),
        viewUrl: textbook.url,
        downloadUrl: textbook.url,
        source: 'courseTextbooks'
      }));
  };

  // Group materials by type
  const groupMaterialsByType = (materials) => {
    return materials.reduce((groups, material) => {
      const type = material.type || 'Material';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(material);
      return groups;
    }, {});
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Format date for materials
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString();
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
                      const cacheKey = `${course.code}-${semester.semester}`;
                      const isExpanded = expandedCourses[cacheKey];
                      const isLoading = loadingMaterials[cacheKey];
                      const apiMaterials = courseMaterials[cacheKey] || [];
                      const textbookMaterials = getCourseTextbooks(course.code);
                      const allMaterials = [...apiMaterials, ...textbookMaterials];
                      const error = materialsError[cacheKey];
                      const groupedMaterials = groupMaterialsByType(allMaterials);
                      
                      return (
                        <div 
                          key={idx} 
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div 
                            className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCourseExpansion(course.code, semester.semester)}
                          >
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
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-nuesa-green font-medium">
                                {isExpanded ? 'Click to collapse' : 'Click to view materials'}
                              </span>
                              {isLoading && (
                                <Loader2 className="w-4 h-4 animate-spin text-nuesa-green" />
                              )}
                            </div>
                          </div>
                          
                          {/* Expanded Materials Section */}
                          {isExpanded && (
                            <div className="border-t border-gray-100 bg-gray-50 p-4">
                              {isLoading ? (
                                <div className="flex items-center justify-center py-4">
                                  <Loader2 className="w-6 h-6 animate-spin text-nuesa-green mr-2" />
                                  <span className="text-sm text-gray-600">Loading materials...</span>
                                </div>
                              ) : error ? (
                                <div className="flex items-center text-red-600 py-2">
                                  <AlertCircle className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{error}</span>
                                </div>
                              ) : allMaterials.length === 0 ? (
                                <div className="text-center py-4">
                                  <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                  <p className="text-sm text-gray-500">No materials available for this course</p>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {Object.entries(groupedMaterials).map(([type, typeMaterials]) => (
                                    <div key={type} className="bg-white rounded-lg p-3">
                                      <h5 className="font-semibold text-sm text-gray-700 mb-2 flex items-center">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {type} ({typeMaterials.length})
                                      </h5>
                                      <div className="space-y-2">
                                        {typeMaterials.map((material, materialIdx) => (
                                          <div 
                                            key={materialIdx} 
                                            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                                          >
                                            <div className="flex-1 min-w-0">
                                              <p className="text-sm font-medium text-gray-800 truncate">
                                                {material.name}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                {formatFileSize(material.size)} • {formatDate(material.createdTime)}
                                              </p>
                                            </div>
                                            <div className="flex items-center space-x-1 ml-2">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  window.open(material.viewUrl, '_blank');
                                                }}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="View"
                                              >
                                                <ExternalLink className="w-4 h-4" />
                                              </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  window.open(material.downloadUrl, '_blank');
                                                }}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                title="Download"
                                              >
                                                <Download className="w-4 h-4" />
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
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
