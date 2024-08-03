import React, { useState } from 'react';
import Modal from 'react-modal'; // Make sure you have react-modal installed
import '../styles/AddExpenseModal.css';
import axios from 'axios';

const AddExpenseModal = ({ isOpen, onRequestClose, categories }) => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    name: '' // Change this to "name" to match the backend requirement
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending the request to /api/v1/setCategory
      const response = await axios.post('/api/v1/category/setCategory', expenseData, {
        withCredentials: true // Include credentials for cookie-based authentication
      });

      console.log(response.data); // Handle the response as needed
      onRequestClose(); // Close modal after submission
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message); // Log error message
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="AddExpenseModal" overlayClassName="Overlay">
      <h2 className="modalTitle">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="modalInput">
          <label>Description:</label>
          <input type="text" name="description" value={expenseData.description} onChange={handleChange} required />
        </div>
        <div className="modalInput">
          <label>Amount:</label>
          <input type="number" name="amount" value={expenseData.amount} onChange={handleChange} required />
        </div>
        <div className="modalInput">
          <label>Category:</label>
          <select name="name" value={expenseData.name} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>{category.name}</option> // Ensure this matches your category names
            ))}
          </select>
        </div>
        <div className="modalButtons">
          <button type="submit" className="modalButton">Add Expense</button>
          <button type="button" className={`modalButton cancel`} onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
