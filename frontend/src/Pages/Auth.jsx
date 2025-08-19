import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../Components/Login'
import Signup from '../Components/Signup';
import bgMoney from '../assets/money.png';

const Auth = () => {
    const location = useLocation();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage: `url(${bgMoney})`,
            }}
        >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
                {location.pathname === '/login' && <Login />}
                {location.pathname === '/signup' && <Signup />}
            </div>
        </div>
    );
};

export default Auth;

