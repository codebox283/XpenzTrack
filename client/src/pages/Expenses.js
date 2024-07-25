import React, { useState, useEffect } from 'react';
import '../styles/Expenses.css';
import 'simplebar-react/dist/simplebar.min.css'; // Import the CSS for simplebar
import SimpleBar from 'simplebar-react';
import Img from '../assets/man1.jpg';
import RightPanel from '../components/RightPanel';
import axios from 'axios';

const Expenses = () => {
  const [data, setData] = useState(null); // Initialize state to null

  useEffect(() => {
    axios.get('/api/v1/user/user-fulldetails')
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const groupExpensesByDate = (expenses) => {
    if (!expenses) return {};
    return expenses.reduce((acc, expense) => {
      const date = new Date(expense.createdAt).toDateString();
      if (!acc[date]) {
        acc[date] = []; //For days with no track
      }
      acc[date].push(expense);
      return acc;
    }, {});
  };

  // Ensure data and expenses are available before calling groupExpensesByDate
  const expensesByDate = data ? groupExpensesByDate(data.expenses) : {};

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
          <li>Dashboard</li>
          <li id='this'>Expenses</li>
          <li>Goals</li>
          <li>Summary</li>
          <li>Account</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className='Expenses'>
        <h1>Expenses</h1>
        <p id='tag'>Last 7 days data</p>
        <SimpleBar className='DailyExpenses'>
          {Object.keys(expensesByDate).length > 0 ? (
            Object.keys(expensesByDate).map(date => (
              <div key={date}>
                <h4 id='date'>{date}</h4>
                <div id='border-top'>
                  {expensesByDate[date].map(expense => {
                    const category = data.categories.find(cat => cat._id === expense.category);
                    // const time = new Date(expense.createdAt).toLocaleTimeString();  //gives second as well
                    const time = new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <div id='list-items' key={expense._id}>
                        <p className={`category ${category ? category.name.toLowerCase() : 'unknown'}`} category >{category ? category.name : 'Unknown'} </p>
                        <p className='description'>{time}   •   {expense.description}</p>
                        <p className='amount'>- ${expense.amount}</p>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path fill="#5f8c9b" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                      </svg>  */}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p>Loading expenses...</p>
          )}
        </SimpleBar>
      </div>

      <RightPanel/>
    </div>
  );
}

export default Expenses;