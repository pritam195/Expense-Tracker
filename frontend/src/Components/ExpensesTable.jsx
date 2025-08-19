import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../Api';

const ExpensesTable = () => {
    const [expenses, setExpenses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const username = localStorage.getItem('username');
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${API_URL}/expense/${username}/fetch`,
                    {
                        withCredentials: true
                    }
                )
                setExpenses(response.data)
            } catch (error) {
                console.log("Error fetching expenses : ", error);
            }
        };
        fetchExpenses();
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
            await axios.delete(`${API_URL}/expense/${id}`, {
                withCredentials: true
            });
            setExpenses((prev) => prev.filter((expense) => expense._id != id));
        } catch (error) {
            console.error("Error deleting expense : ", error);
        }
    }
    
    const totalPages = Math.ceil(expenses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedExpense = expenses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="mt-10 max-w-5xl mx-auto overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 px-1 py-1 text-blue-600 text-center rounded-lg bg-white">Recent Payments</h2>
            <table className="min-w-full bg-white/80 backdrop-blur-md shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Amount (₹)</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Payment Mode</th>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedExpense.map((expense) => (
                        <tr key={expense._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4">{expense.amount}</td>
                            <td className="py-3 px-4">{expense.type}</td>
                            <td className="py-3 px-4">{expense.description}</td>
                            <td className="py-3 px-4">{expense.paymentMode}</td>
                            <td className="py-3 px-4 ">
                                {new Date(expense.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>

                            <td className="py-3 px-4 space-x-2">
                                <button onClick={() => handleDelete(expense._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='flex justify-center items-center gap-4 mt-4'>
                <button
                    className='px-4 py-1 rounded bg-gray-200 disabled:opacity-50'
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className='text-black-800 font-semibold text-sm'>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className='px-4 py-1 rounded bg-gray-200 disabled:opacity-50'
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ExpensesTable;
