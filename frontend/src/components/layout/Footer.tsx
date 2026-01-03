import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ShoppingCart, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-2xl mr-3">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ShopHub
                </span>
                <div className="text-xs text-gray-400">Premium Shopping</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for premium products. We're committed to providing exceptional 
              quality, fast delivery, and outstanding customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                'About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 
                'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'FAQ'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Categories</h3>
            <ul className="space-y-3">
              {[
                'Electronics', 'Apparel', 'Home & Garden', 'Books', 
                'Sports & Outdoors', 'Beauty & Health', 'Toys & Games', 'Automotive'
              ].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Visit Us</div>
                  <span className="text-gray-300 text-sm">123 Commerce Street<br />New York, NY 10001</span>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Call Us</div>
                  <span className="text-gray-300 text-sm">(555) 123-4567</span>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Email Us</div>
                  <span className="text-gray-300 text-sm">support@shophub.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-2xl">
              <Award className="w-8 h-8 text-yellow-400 mr-3" />
              <div>
                <div className="font-semibold text-white">Trusted by 50K+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-2xl">
              <Heart className="w-8 h-8 text-red-400 mr-3" />
              <div>
                <div className="font-semibold text-white">4.9/5 Rating</div>
                <div className="text-sm text-gray-400">Customer Satisfaction</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-2xl">
              <ShoppingCart className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <div className="font-semibold text-white">1M+ Orders</div>
                <div className="text-sm text-gray-400">Successfully Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ShopHub. All rights reserved. Made with ❤️ for amazing customers.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Support Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};