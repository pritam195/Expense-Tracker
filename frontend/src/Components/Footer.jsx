import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-8">

                {/* Left: Logo + Tagline */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">💸 ExpenseTracker</h2>
                    <p className="text-sm max-w-sm text-gray-400">
                        Helping you track every rupee, stay debt-free, and master your financial life.
                    </p>
                </div>

                {/* Right: Links + Social */}
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-2 text-sm">
                        <h3 className="text-white font-semibold mb-1">Links</h3>
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#about" className="hover:text-white transition">About</a>
                        <a href="/login" className="hover:text-white transition">Login</a>
                        <a href="/signup" className="hover:text-white transition">Sign Up</a>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col gap-2 text-sm">
                        <h3 className="text-white font-semibold mb-1">Connect</h3>
                        <a
                            href="mailto:contact@expensetracker.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaEnvelope /> Email
                        </a>
                        <a
                            href="https://github.com/yourprofile"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaGithub /> GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaLinkedin /> LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

