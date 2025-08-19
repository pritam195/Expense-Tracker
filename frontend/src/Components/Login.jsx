import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { API_URL } from '../Api';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/login`,
                {
                    email: formData.email,
                    password: formData.password
                }, {
                withCredentials: true
            }
            )
            alert("Login Successful!!");
            const username = response.data.username;
            localStorage.setItem("username", username);
            localStorage.setItem('isloggedin', true);
            navigate('/')
        } catch (error) {
            console.error("Error during login: ", error);
            alert("Login Failed, Please try again");
        }
    }

    return (
        <div >
            <div>
                {/* Logo and Tagline */}
                <div className='justify-center flex flex-col items-center mb-5'>
                    <h2 className="text-2xl font-bold text-blue-600 m-3"> ExpenseTracker 💸</h2>
                    <p className="text-sm max-w-sm text-gray-600">
                        Helping you track every rupee, stay debt-free, and master your financial life.
                    </p>
                </div>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        New user?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline font-medium">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;