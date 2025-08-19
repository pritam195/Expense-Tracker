import React, { useEffect, useState } from "react";
import { API_URL } from '../Api';
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
    BarChart, Bar
} from "recharts";

function Dash() {
    const [paymentData, setPaymentData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [monthlyTrend, setMonthlyTrend] = useState([]);
    const [budgetData, setBudgetData] = useState({ budget: 0, actual: 0 });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/dash/summary/paymentMode`)
            .then(res => res.json()).then(setPaymentData);
        fetch(`${API_URL}/dash/summary/type`)
            .then(res => res.json()).then(setTypeData);
        fetch(`${API_URL}/dash/summary/daily`)
            .then(res => res.json()).then(setDailyData);
        fetch(`${API_URL}/dash/summary/total`)
            .then(res => res.json()).then(data => setTotal(data.total));
    }, []);

    // 📌 Fetch Monthly Trend
    useEffect(() => {
        fetch(`${API_URL}/dash/summary/monthlyTrend`)
            .then(res => res.json())
            .then(data => {
                // Get all years present in the data
                const years = Array.from(new Set(data.map(d => d.year))).sort();
                // Get current year and month
                const now = new Date();
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth(); // 0-indexed

                // Prepare months array
                const months = Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleString("default", { month: "short" })
                );

                // For each month, for each year, fill value or 0
                const trend = months.map((monthName, idx) => {
                    const row = { month: monthName };
                    years.forEach(year => {
                        // Only show up to current month for current year, else 0
                        if (year < currentYear || (year === currentYear && idx <= currentMonth)) {
                            const found = data.find(d => d.year === year && d.month === idx + 1);
                            row[year] = found ? found.total : 0;
                        } else {
                            row[year] = 0;
                        }
                    });
                    return row;
                });
                setMonthlyTrend(trend);
            })
            .catch(err => console.error("Error fetching monthly trend:", err));
    }, []);

    // 📌 Fetch Budget vs Actual (example budget = 5000)
    useEffect(() => {
        fetch(`${API_URL}/dash/summary/budget/5000`)
            .then(res => res.json())
            .then(setBudgetData)
            .catch(err => console.error("Error fetching budget data:", err));
    }, []);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A83279"];
    const budgetPercent = budgetData.budget ? (budgetData.actual / budgetData.budget) * 100 : 0;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-2xl shadow-lg text-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-2 text-lg">Total Expenses</p>
                <p className="text-4xl font-extrabold mt-2">₹{total}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
                <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden">
                    <div
                        className="bg-green-500 h-10 text-xs text-white flex items-center justify-center transition-all duration-500"
                        style={{ width: `${Math.min(budgetData.percentage || 0, 100)}%` }}
                    >
                        {budgetData.percentage ? `${budgetData.percentage}%` : "0%"}
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    Spent: ₹{budgetData.spent} / Budget: ₹{budgetData.budget}
                </p>
            </div>

            {/* Grid for charts & tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amount by Type Table */}
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">Amount by Type</h2>
                    <table className="table-auto w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Type</th>
                                <th className="border px-3 py-2 text-right">Amount Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border px-3 py-2">{item._id}</td>
                                    <td className="border px-3 py-2 text-right">₹{item.total}</td>
                                </tr>
                            ))}
                            <tr className="font-bold bg-gray-50">
                                <td className="border px-3 py-2">Total</td>
                                <td className="border px-3 py-2 text-right">₹{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Spending Over Time */}
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">Spending Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment Mode Pie */}
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">By Payment Mode</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={paymentData} dataKey="total" nameKey="_id" outerRadius={100} label>
                                {paymentData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* By Type Pie */}
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">By Type</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={typeData} dataKey="total" nameKey="_id" outerRadius={100} label>
                                {typeData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
            {/* Monthly Trend Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
                <h2 className="text-lg font-semibold mb-4">Monthly Expense Trend (Year-wise)</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {monthlyTrend.length > 0 &&
                            Object.keys(monthlyTrend[0])
                                .filter(k => k !== "month")
                                .map((year, idx) => (
                                    <Bar key={year} dataKey={year} fill={["#6366F1", "#22C55E", "#F59E0B"][idx % 3]} />
                                ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Dash;
