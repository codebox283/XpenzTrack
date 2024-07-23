import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plant from '../assets/plant1.png'
import '../styles/RightPanel.css';

const RightPanel = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('/dummyCategories.json')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    axios.get('/dummydata.json')
      .then(response => {
        setExpenses(response.data[0].expenses); 
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  const calculateCategorySpending = () => {
    return categories.map(category => {
      const totalSpent = expenses
        .filter(expense => expense.category === category._id)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        ...category,
        totalSpent
      };
    });
  };

  const categorySpending = calculateCategorySpending();

  const totalSpent = categorySpending.reduce((sum, category) => sum + category.totalSpent, 0);

  return (
    <div className='RightPanel'>
      <div className='Money-Track'>
        <h4>Where your money go?</h4>
        {categorySpending.map(category => (
          <div key={category._id} className='category-list'>
            <div className='category-info'>
              <span>{category.name}</span>
              <span>${category.totalSpent}</span>
            </div>
            <div className='category-bar'>
              <div
                className='category-bar-fill'
                style={{ width: `${(category.totalSpent / totalSpent) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className='Tips-Box'>
        <img id="Plant" src={Plant} alt=''></img>
        <h4>Save more money</h4>
        <p>Regularly monitor your savings progress to see how close you are to your goal. Celebrate milestones along the way.</p>
        <button>VIEW MORE TIPS</button>
      </div>
    </div>
  );
};

export default RightPanel;
