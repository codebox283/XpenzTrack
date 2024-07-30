import React, { useState, useEffect } from 'react';
import '../styles/Expenses.css';
import 'simplebar-react/dist/simplebar.min.css'; // Import the CSS for simplebar
import SimpleBar from 'simplebar-react';
import Img from '../assets/man1.jpg';
import RightPanel from '../components/RightPanel';
import { Link } from 'react-router-dom';
import ExpenseDetailModal from '../components/ExpenseDetailModal.js';
import '../styles/ExpenseModal.css';
import axios from 'axios';

const Expenses = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [data, setData] = useState(null); // Initialize state to null

  // useEffect(() => {
  //   fetch('/dummydata.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data[0]);
  //     })
  //     .catch((error) => console.error('Error fetching data: ', error));
  // }, []); // Empty dependency array means this useEffect runs once when the component mounts

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
        acc[date] = []; // For days with no track
      }
      acc[date].push(expense);
      return acc;
    }, {});
  };

  const handleCloseModal = () => {
    setSelectedExpense(null);
    setModalIsOpen(false);
  };

  const handleOpenModal = (expense) => {
    setSelectedExpense(expense);
    setModalIsOpen(true);
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
          <Link className='Link' to="/goals"><li>Goals</li></Link>
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
                    const time = new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <div id='list-items' key={expense._id} onClick={() => handleOpenModal(expense)}>
                        <p className={`category ${category ? category.name.toLowerCase() : 'unknown'}`} category >{category ? category.name : 'Unknown'} </p>
                        <p className='description'>{time}   •   {expense.description}</p>
                        <p className='amount'>- ${expense.amount}</p>
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
        {selectedExpense && (
          <ExpenseDetailModal
            expense={selectedExpense}
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
          />
        )}
      </div>

      <RightPanel />
    </div>
  );
}

export default Expenses;
