import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/heroimage.png'; 

const HeroSection = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login'); // or '/signup'
    };

    return (
        <div className="min-h-screen flex items-center justify-between px-8 md:px-16 bg-gray-50">

            {/* Left Side: Text */}
            <div className="max-w-xl space-y-6 pl-30">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Track Every Rupee. <br /> Take Control of Your Finances.
                </h1>
                <p className="text-gray-600 text-lg">
                    Your smart personal finance manager — split bills, settle up with friends, and stay on top of your spending.
                </p>
                <button
                    onClick={handleClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
                >
                    Get Started
                </button>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:block pr-20">
                <img
                    src={HeroImage}
                    alt="Wallet illustration"
                    className="w-[600px] h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default HeroSection;


