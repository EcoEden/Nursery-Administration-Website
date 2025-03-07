import React from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-gray-700 py-10 mt-10 border-t select-none cursor-default
 bottom-0">
      <div className="container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center text-2xl font-bold mb-4">
              <p className="uppercase text-primary">Eco</p>
              <p className="uppercase text-secondary">Eden</p>
              <RiPlantFill className="text-secondary text-4xl ml-1" />
            </Link>
            <p className="text-sm">
              Bringing nature closer to you. Explore, nurture, and grow with our premium collection of plants and gardening essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-secondary">Home</Link></li>
              <li><Link to="/Menu" className="hover:text-secondary">Menu</Link></li>
              <li><Link to="/About" className="hover:text-secondary">About</Link></li>
              {/* <li><Link to="/Contact" className="hover:text-secondary">Contact</Link></li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/FAQ" className="hover:text-secondary">FAQ</Link></li>
              <li><Link to="/PrivacyPolicy" className="hover:text-secondary">Privacy Policy</Link></li>
              <li><Link to="/Terms" className="hover:text-secondary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-secondary"><FaFacebookF /></a>
              <a href="#" className="hover:text-secondary"><FaInstagram /></a>
              <a href="#" className="hover:text-secondary"><FaTwitter /></a>
              <a href="#" className="hover:text-secondary"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} EcoEden. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
