import React from 'react';
import {
    FaCalendarAlt,
    FaLock,
    FaMoneyBillWave,
    FaChartPie,
    FaUserFriends,
    FaBell,
    FaListUl,
    FaChartLine,
    FaMoneyCheckAlt
} from 'react-icons/fa';

const features = [
    {
        icon: <FaListUl className="text-blue-600 text-3xl" />,
        title: "Daily Expense Tracking",
        description: "Easily log and manage your day-to-day expenses with just a few clicks.",
    },
    {
        icon: <FaMoneyBillWave className="text-blue-600 text-3xl" />,
        title: "Lend/Borrow Tracker",
        description: "Keep track of money you've lent or borrowed from friends or contacts.",
    },
    {
        icon: <FaUserFriends className="text-blue-600 text-3xl" />,
        title: "Add Daily Spent Amount",
        description: "Stay consistent by adding daily transactions and keeping records clean.",
    },
    {
        icon: <FaBell className="text-blue-600 text-3xl" />,
        title: "EMI Alerts",
        description: "Never miss an installment. Get timely EMI reminders and manage repayments.",
    },
    {
        icon: <FaChartPie className="text-blue-600 text-3xl" />,
        title: "Visual Dashboard",
        description: "Understand your spending with easy-to-read charts and graphs.",
    },
    {
        icon: <FaCalendarAlt className="text-blue-600 text-3xl" />,
        title: "Calendar View",
        description: "View and manage all your transactions directly from a calendar layout.",
    },
    {
        icon: <FaLock className="text-blue-600 text-3xl" />,
        title: "Secure Login",
        description: "Your data is safe with encrypted login and secure user authentication.",
    },
    {
        icon: <FaMoneyCheckAlt className="text-blue-600 text-3xl" />,
        title: "Currency Switcher",
        description: "Track expenses in your preferred currency — ₹, $, € and more.",
    },
];

const FeatureSection = () => {
    return (
        <div className="bg-white py-20 px-6 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                Powerful Features for Smarter Money Management
            </h2>

            <div className="grid gap-15 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSection;
