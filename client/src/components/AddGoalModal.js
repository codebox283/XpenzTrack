import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/AddExpenseModal.css';
import '../styles/AddGoalModal.css';

const AddGoalModal = ({ isOpen, onRequestClose }) => {
  const [goalData, setGoalData] = useState({
    name: '',
    targetAmount: '',
    currentBalance: '',
    targetDate: '',
    color: ''          
  });

  // const validColors = ['Red', 'Green', 'Yellow', 'Blue']; // Define valid colors

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
      const response = await axios.post('/api/v1/savings/set-goal', {
        name: goalData.name,        
        targetAmount: goalData.targetAmount,
        currentBalance: goalData.currentBalance,
        targetDate: goalData.targetDate,
        color: 'Red',       
      }, {
        withCredentials: true 
      });

      console.log(response.data);
      onRequestClose();
      window.location.reload(); 
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
