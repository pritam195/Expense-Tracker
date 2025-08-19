import React from 'react'
import Dash from '../Components/Dash'
import Navbar from '../Components/Navbar'

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col">
            
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            <div className="mt-16 p-4">
                <Dash />
            </div>
        </div>
    )
}

export default Dashboard
