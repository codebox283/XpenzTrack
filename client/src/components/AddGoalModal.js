import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/AddExpenseModal.css';
import '../styles/AddGoalModal.css';

const AddGoalModal = ({ isOpen, onRequestClose }) => {
  const [goalData, setGoalData] = useState({
    name: '',            // Changed to "name" to match the backend
    targetAmount: '',    // Changed to "targetAmount" to match the backend
    currentBalance: '',  // Added "currentBalance" field
    targetDate: '',      // Added "targetDate" field
    color: ''           // Added "color" field
  });

  const validColors = ['Red', 'Green', 'Yellow', 'Blue']; // Define valid colors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending the request to /api/v1/savings/set-goal
      const response = await axios.post('/api/v1/savings/set-goal', {
        name: goalData.name,                  // Send name
        targetAmount: goalData.targetAmount,  // Send target amount
        currentBalance: goalData.currentBalance, // Send current balance
        targetDate: goalData.targetDate,      // Send target date
        color: 'Red',                // Send color
      }, {
        withCredentials: true // Include credentials for cookie-based authentication
      });

      console.log(response.data); // Handle the response as needed
      onRequestClose(); // Close modal after submission
      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      console.error('Error adding goal:', error.response?.data || error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="AddModal"  id="AddGoalModal" overlayClassName="Overlay">
      <h2 className="modalTitle">Add Savings Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="modalInput">
          <label>Name:</label>
          <input type="text" name="name" value={goalData.name} onChange={handleChange} required />
        </div>
        <div className="modalInput">
          <label>Target Amount:</label>
          <input type="number" name="targetAmount" value={goalData.targetAmount} onChange={handleChange} required />
        </div>
        <div className="modalInput">
          <label>Current Balance:</label>
          <input type="number" name="currentBalance" value={goalData.currentBalance} onChange={handleChange} required />
        </div>
        <div className="modalInput">
          <label>Target Date:</label>
          <input type="date" name="targetDate" value={goalData.targetDate} onChange={handleChange} required />
        </div>
        {/* <div className="modalInput">
          <label>Color:</label>
          <select name="color" value={goalData.color} onChange={handleChange} required>
            <option value="">Select a color</option>
            {validColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div> */}
        <div className="modalButtons">
          <button type="submit" className="modalButton">Add Goal</button>
          <button type="button" className="modalButton cancel" onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddGoalModal;
