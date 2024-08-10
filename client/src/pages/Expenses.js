import React, { useState, useEffect } from 'react';
import '../styles/Expenses.css';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import Img from '../assets/man1.jpg';
import AddImg from '../assets/plus.png';
import RightPanel from '../components/RightPanel';
import { Link } from 'react-router-dom';
import ExpenseDetailModal from '../components/ExpenseDetailModal';
import AddExpenseModal from '../components/AddExpenseModal';
import '../styles/ExpenseModal.css';
import axios from 'axios';

const Expenses = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [data, setData] = useState(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/user/user-fulldetails');
        setData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupExpensesByDate = (expenses) => {
    if (!expenses) return {};
    return expenses.reduce((acc, expense) => {
      const date = new Date(expense.createdAt).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    }, {});
  };

  const handleCloseDetailModal = () => {
    setSelectedExpense(null);
    setIsDetailModalOpen(false);
  };

  const handleOpenDetailModal = (expense) => {
    setSelectedExpense(expense);
    setIsDetailModalOpen(true);
  };

  const handleCloseAddExpenseModal = () => {
    setIsAddExpenseModalOpen(false);
  };

  const handleOpenAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  const expensesByDate = data ? groupExpensesByDate(data.expenses) : {};
  const sortedDates = Object.keys(expensesByDate).sort((a, b) => new Date(b) - new Date(a));

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
          <p>No goals to show</p>
        )}
        <ul>
          <Link className='Link' to="/dashboard"><li>Dashboard</li></Link>
          <li id='this'>Expenses</li>
          <Link className='Link' to="/goals"><li>Goals</li></Link>
          <li>Summary</li>
          <Link className='Link' to="/account"><li>Account</li></Link>
          <li>Settings</li>
        </ul>
      </div>

      <div className='Expenses'>
        <h1 className='heading'>Expenses</h1>
        <p id='tag'>Last 7 days data</p>
        <div id='AddBtn' onClick={handleOpenAddExpenseModal}>
          <img id="AddImg" src={AddImg} alt='Add expense' />
          <p>Add Expense</p>
        </div>
        <SimpleBar className='DailyExpenses'>
          {loading ? (
            <p>Loading...</p> // Loading state
          ) : error ? (
            <p>{error}</p> // Error message
          ) : sortedDates.length > 0 ? (
            sortedDates.map(date => (
              <div key={date}>
                <h4 id='date'>{date}</h4>
                <div id='border-top'>
                  {expensesByDate[date].map(expense => {
                    const { category, createdAt, description, amount, _id } = expense;
                    const time = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <div id='list-items' key={_id} onClick={() => handleOpenDetailModal(expense)}>
                        <p className={`category ${category.toLowerCase()}`}>{category}</p>
                        <p className='description'>{time} • {description}</p>
                        <p className='amount'>- ${amount}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p>No records to show</p>
          )}
        </SimpleBar>

        {selectedExpense && (
          <ExpenseDetailModal
            expense={selectedExpense}
            isOpen={isDetailModalOpen}
            onRequestClose={handleCloseDetailModal}
          />
        )}

        <AddExpenseModal
          isOpen={isAddExpenseModalOpen}
          onRequestClose={handleCloseAddExpenseModal}
          categories={data ? data.categories : []}
        />
      </div>

      <RightPanel />
    </div>
  );
}

export default Expenses;
