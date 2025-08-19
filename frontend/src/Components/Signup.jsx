import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../Api';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        mobno: '',
        password: '',
        confirmpassword: '',
        agree: false 
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type ==='checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!formData.agree) {
            alert("You must agree to the terms and conditions");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/create`,
                {
                    name: formData.name,
                    email: formData.email,
                    username: formData.username,
                    mobno: formData.mobno,
                    password: formData.password,
                    agree: formData.agree
                }, {
                withCredentials: true
            })
            alert("Signup Successfull !!");
            const username = response.data.username;
            localStorage.setItem("username", username);
            localStorage.setItem('isloggedin', true);
            navigate('/');

        } catch (error) {
            console.error("Error during signup : ", error);
            alert("Signup failed , Please try again later");
        }
    }
    
    return (
        <div >
            <div >
                {/* Logo and Tagline */}
                <div className='justify-center flex flex-col items-center mb-5'>
                    <h2 className="text-2xl font-bold text-blue-600 m-3"> ExpenseTracker 💸</h2>
                    <p className="text-sm max-w-sm text-gray-600">
                        Helping you track every rupee, stay debt-free, and master your financial life.
                    </p>
                </div>

                {/* Signup Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Row 1: Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Row 2: Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email Address</label>
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Row 3: Username & Mobile Number */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a username"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                            <input
                                type="tel"
                                name='mobno'
                                value={formData.mobno}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="1234567890"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 4: Password & Confirm Password */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                name='confirmpassword'
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 5: Terms & Signup */}
                    <div className="flex items-start space-x-2">
                        <input type="checkbox" name='agree' value={formData.agree} onChange={handleChange} required />
                        <label className="text-sm text-gray-600">
                            I agree to the{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                terms and conditions
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline font-medium">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
