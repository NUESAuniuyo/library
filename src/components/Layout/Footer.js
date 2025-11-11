import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { FaMusic } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding px-6 md:px-12 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3">
              <div className="w-10 h-10 bg-nuesa-green rounded-full flex items-center justify-center mx-auto sm:mx-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mt-2 sm:mt-0"> NUESA Uniuyo E-Library</h3>
                <p className="text-sm text-gray-400">Making Learning Easy</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              Your comprehensive digital library for the Faculty of Engineering, University of Uyo. 
              Access course materials, resources, and connect with the NUESA community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-lg font-semibold text-nuesa-orange">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { path: '/departments', label: 'Departments' },
                { path: '/map', label: 'Faculty Map' },
                { path: '/about', label: 'Leadership' },
                { path: '/admin', label: 'Admin Portal' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-nuesa-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-lg font-semibold text-nuesa-orange">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3">
                <MapPin className="w-4 h-4 text-nuesa-green mb-1 sm:mb-0" />
                <span className="text-gray-300 text-sm">
                  Faculty of Engineering, University of Uyo, Akwa Ibom State
                </span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3">
                <Mail className="w-4 h-4 text-nuesa-green mb-1 sm:mb-0" />
                <span className="text-gray-300 text-sm">nuesa.uniyuo.engr@gmail.com</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3">
                <Phone className="w-4 h-4 text-nuesa-green mb-1 sm:mb-0" />
                <span className="text-gray-300 text-sm">+234 916 872 1123</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold text-nuesa-orange">Connect With Us</h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/nuesauniuyo"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-nuesa-green transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://vm.tiktok.com/ZSH7aMJ89VFYv-pR86C/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-nuesa-green transition-colors"
              >
                <FaMusic className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/nuesa_uniuyo?igsh=MTNiOWtlc3VrZnBtag=="
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-nuesa-green transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 NUESA Uniuyo E-Library. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Developed by <span className="font-medium text-nuesa-orange">Favour Tony</span> — 
            Director of Academics, NUESA Uniuyo
          </p>
        </div>
      </div>
</footer>
  );
};

export default Footer;
