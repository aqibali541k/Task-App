import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 border-t border-gray-800 pt-12 pb-6 mt-16 text-gray-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
                            TodoPro <span className="text-xl">🚀</span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-400 max-w-xs leading-relaxed">
                            A modern SaaS platform designed to organize your daily tasks with intelligence, speed, and beautiful aesthetics.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:ml-auto">
                        <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="/" className="hover:text-purple-400 transition-colors duration-200">Home dashboard</a></li>
                            <li><a href="/login" className="hover:text-purple-400 transition-colors duration-200">Login</a></li>
                            <li><a href="/register" className="hover:text-purple-400 transition-colors duration-200">Register Account</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="md:ml-auto">
                        <h4 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Connect With Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-linear-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all transform hover:-translate-y-1 duration-300 shadow-lg cursor-pointer">
                                <FaTwitter size={15} />
                            </a>
                            <a href="https://github.com/aqibali541k" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-linear-to-br hover:from-gray-700 hover:to-black hover:text-white transition-all transform hover:-translate-y-1 duration-300 shadow-lg cursor-pointer">
                                <FaGithub size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-linear-to-br hover:from-blue-600 hover:to-blue-800 hover:text-white transition-all transform hover:-translate-y-1 duration-300 shadow-lg cursor-pointer">
                                <FaLinkedin size={15} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} TodoPro Inc. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;