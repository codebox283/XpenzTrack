import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Img from '../assets/man1.jpg';
import RightPanel from '../components/RightPanel';
import { Link } from 'react-router-dom';
import { Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState(null); // Initialize state to null
    const [expenseData, setExpenseData] = useState(null); // State for expense data
    // const [goalData, setGoalData] = useState(null); // State for goal data

    useEffect(() => {
        axios.get('/api/v1/user/user-fulldetails')
            .then((response) => {
                const userData = response.data.data[0];
                setData(userData);

                // Assuming userData contains expenses and goals
                setExpenseData(userData.expenses);
                // setGoalData(userData.savingsGoals);
            })
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    // useEffect(() => {
    //     fetch('/dummydata.json')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setData(data[0]);
    //         })
    //         .catch((error) => console.error('Error fetching data: ', error));
    // }, []);

    const getExpenseChartData = () => {
        if (!expenseData) return null;
    
        const categoryTotals = expenseData.reduce((totals, expense) => {
            const category = expense.category || 'unknown';
            if (!totals[category]) {
                totals[category] = 0;
            }
            totals[category] += expense.amount;
            return totals;
        }, {});
    
        const labels = Object.keys(categoryTotals); // Get the unique categories directly
        const dataValues = Object.values(categoryTotals);
    
        // Define specific colors for categories
        const colors = labels.map(label => {
            switch (label.toLowerCase()) {
                case 'food':
                    return '#ff6347'; // Tomato
                case 'utilities':
                    return '#4682b4'; // Steel Blue
                case 'entertainment':
                    return '#c03c52'; // Crimson
                case 'transportation':
                    return '#ffd700'; // Gold
                case 'miscellaneous':
                    return '#32cd32'; // Lime Green
                case 'unknown':
                default:
                    return '#808080'; // Gray
            }
        });
    
        return {
            labels,
            datasets: [{
                data: dataValues,
                backgroundColor: colors,
            }],
        };
    };
    

    const expenseChartData = getExpenseChartData();

    return (
        <div className='Dashboard'>
            <div className='Navigation'>
                <img src={Img} alt='Profile' />
                {data ? (
                    <>
                        <h3 id='name'>{data.fullName}</h3>
                        <p id='email'>{data.email}</p>
                    </>
                ) : (
                    <p>Loading user info...</p>
                )}
                <ul>
                    <li id='this'>Dashboard</li>
                    <Link className='Link' to="/expenses"><li>Expenses</li></Link>
                    <Link className='Link' to="/goals"><li>Goals</li></Link>
                    <li>Summary</li>
                    <li>Account</li>
                    <li>Settings</li>
                </ul>
            </div>

            <div id='dashboardData'>
                <h1 className='heading'>Dashboard</h1>
                <p id='tag'>Last 7 days data</p>
                <div id='dash'>
                    <Link className='Link' to="/expenses">
                    <div id='expenseDash'>
                        <h2 id='expenseTitle'>Expenses by category</h2>
                        {expenseChartData && (
                            <Doughnut
                                data={expenseChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            display:false,
                                            align: 'start',
                                        },
                                        title: {
                                            display: true,
                                            text: '',
                                        },
                                    },
                                    animations:{
                                        tension: {
                                            duration: 1000,
                                            easing: 'linear',
                                            from: 0,
                                            to: 100,
                                            loop: true
                                          }
                                    },
                                }}
                            />
                        )}
                    </div>
                    </Link>
                    <Link className='Link' to="/goals">
                    <div id='expenseDash'>
                        <h2 id='expenseTitle'>Goals by category</h2>
                        {expenseChartData && (
                            <Pie
                                data={expenseChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            align: 'start',
                                        },
                                        title: {
                                            display: true,
                                            text: '',
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                    </Link>
                    <div id='goalDash'>
                        {/* Add goal data visualization here */}
                    </div>
                </div>
            </div>

            <RightPanel />
        </div>
    );
};

export default Dashboard;
