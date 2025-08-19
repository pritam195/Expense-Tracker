import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../Api';
import axios from 'axios';

const ExpenseForm = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        description: '',
        paymentMode: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Expense:', formData);
        
        try {
            const response = await axios.post(`${API_URL}/expense/create`, {
                amount: formData.amount,
                type: formData.type,
                description: formData.description,
                paymentMode: formData.paymentMode,
                date: formData.date,
                username
            }, {
                withCredentials: true
            })
            window.location.reload();
            console.log("Expense added successfully");

                
        } catch (error) {
            console.error("Error adding expense :", error);
        }
        finally {
            setFormData({
                amount: '',
                type: '',
                description: '',
                paymentMode: '',
                date: '',
              });
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white backdrop-blur-md p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Amount */}
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />

                {/* Spenditure Type */}
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select spenditure type</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>

                {/* Description */}
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                {/* Mode of Payment */}
                <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select payment mode</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                </select>

                {/* Date */}
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Expense
                </button>
                
            </form>
        </div>
    );
};

export default ExpenseForm;

