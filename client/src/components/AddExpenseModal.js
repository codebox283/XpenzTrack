import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AddExpenseModal = ({ isOpen, onRequestClose }) => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    name: '' // Keep this to match the backend requirement
  });

  const categories = ["Food", "Utilities", "Entertainment", "Transportation", "Miscellaneous"];

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
      const response = await axios.post('/api/v1/category/setCategory', {
        amount: expenseData.amount,
        name: expenseData.name, 
        description: expenseData.description,
      }, {
        withCredentials: true 
      });

      console.log(response.data); // Handle the response as needed
      onRequestClose(); // Close modal after submission
      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="AddModal" overlayClassName="Overlay">
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
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="modalButtons">
          <button type="submit" className="modalButton">Add Expense</button>
          <button type="button" className="modalButton cancel" onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
