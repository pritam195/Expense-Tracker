import React from 'react';
import { API_URL } from '../Api';
import axios from 'axios';

const Navbar = () => {
    const isloggedin = localStorage.getItem('isloggedin');

    const handleLogout = async () => {
        
        try {
            await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });

            localStorage.removeItem("username");
            localStorage.removeItem("isloggedin");
            window.location.href = "/";
        }
        catch(error) {
            console.error("Error message :", error);
        }
    }
    return (
        <div className="fixed top-4 left-4 right-4 z-50 bg-white shadow-md rounded-full px-6 py-3 flex items-center justify-between">

            {/* Logo */}
            <div className="text-xl font-bold text-blue-600">
                MyExpense
            </div>

            {/* Nav Links */}
            <div className="space-x-6 text-gray-700 font-medium hidden md:flex">
                <a href="/" className="hover:text-blue-500">Home</a>
                <a href="/expenses" className="hover:text-blue-500">Expenses</a>
                <a href="/dashboard" className="hover:text-blue-500">Dashboard</a>
                <a href="/friends" className="hover:text-blue-500">Friends</a>
                <a href="/reports" className="hover:text-blue-500">Reports</a>
            </div>

            {/* Profile + Login/Logout */}
            <div className="flex items-center space-x-4">
                <img
                    src="https://i.pravatar.cc/300"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
                    {!isloggedin ? (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm"> <a href="/login">Login</a> </button>
                    ) : (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm" onClick={handleLogout}> Logout</button>
                    )}
                
            </div>
        </div>
    );
};

export default Navbar;

