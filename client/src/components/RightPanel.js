import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plant from '../assets/plant1.png';
import '../styles/RightPanel.css';

const RightPanel = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('https://expenztrack.onrender.com/api/v1/user/user-fulldetails');
        const fetchedExpenses = response.data.data[0]?.expenses || [];

        // Extract unique categories from expenses
        const uniqueCategories = [...new Set(fetchedExpenses.map(expense => expense.category))];
        setCategories(uniqueCategories);
        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const calculateCategorySpending = () => {
    return categories.map(category => {
      const totalSpent = expenses
        .filter(expense => expense.category === category) // Filter by category
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        name: category, // Assuming category names are strings
        totalSpent,
      };
    });
  };

  const categorySpending = calculateCategorySpending();
  const totalSpent = categorySpending.reduce((sum, category) => sum + category.totalSpent, 0);

  return (
    <div className='RightPanel'>
      <div className='Money-Track'>
        <h4>Where your money goes?</h4>
        {categorySpending.length > 0 ? (
          categorySpending.map((category, index) => (
            <div key={index} className='category-list'>
              <div className='category-info'>
                <span>{category.name}</span>
                <span>${category.totalSpent.toFixed(2)}</span>
              </div>
              <div className='category-bar'>
                <div
                  className='category-bar-fill'
                  style={{ width: totalSpent > 0 ? `${(category.totalSpent / totalSpent) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <div className='Tips-Box'>
        <img id="Plant" src={Plant} alt='' />
        <h4>Save more money</h4>
        <p>Regularly monitor your savings progress to see how close you are to your goal. Celebrate milestones along the way.</p>
        <button>VIEW MORE TIPS</button>
      </div>
    </div>
  );
};

export default RightPanel;
