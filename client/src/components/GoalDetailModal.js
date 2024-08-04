import React, { useState } from 'react';
import Modal from 'react-modal';
import CrossImg from '../assets/remove.png';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';

const GoalDetailModal = ({ isOpen, onRequestClose, goal, onUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentBalance: goal.currentBalance,
        targetDate: goal.targetDate,
        color: goal.color || '',
    });

    const percentage = (goal.currentBalance / goal.targetAmount) * 100;

    // Calculate days left until the target date
    const targetDate = new Date(goal.targetDate);
    const currentDate = new Date();
    const timeDiff = targetDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/v1/savings/update-goal/${goal._id}`, formData);
            onRequestClose(); // Close modal after submission
            window.location.reload();
            setEditMode(false);
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    if (!isOpen) { return null; }

    const handleDelete = async () => {
        try {
            const response = await axios.post(`/api/v1/savings/delete-goal/${goal._id}`);
            
            if (response.status === 200) {
                onRequestClose(); 
                window.location.reload(); 
            }
        } catch (error) {
            console.error("error deleting expense: ", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Goal Details"
            ariaHideApp={false}
            className="Modal"
            overlayClassName="Overlay"
        >
            <div className="GoalModalContent">
                <img id='GoalModalButton' src={CrossImg} alt='Close' onClick={onRequestClose}></img>
                <h2 id='GoalDetailHeading'>{goal.name}</h2>
                
                {editMode ? (
                    <form onSubmit={handleSubmit} className='GoalEditForm'>
                        <label>
                            Name:
                            <input className='editInputField' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Target Amount:
                            <input className='editInputField' type="number" name="targetAmount" value={formData.targetAmount} onChange={handleInputChange} />
                        </label>
                        <label>
                            Current Balance:
                            <input className='editInputField' type="number" name="currentBalance" value={formData.currentBalance} onChange={handleInputChange} />
                        </label>
                        <label>
                            Target Date:
                            <input className='editInputField' type="date" name="targetDate" value={formData.targetDate.slice(0, 10)} onChange={handleInputChange} />
                        </label>
                        {/* <label> */}
                            {/* Color: */}
                            {/* <input className='editInputField' type="text" name="color" value={formData.color} onChange={handleInputChange} /> */}
                        {/* </label> */}
                        <button id='editSavebtn' type="submit" onClick={handleSubmit}>Save</button>
                    </form>
                ) : (
                    <>
                        <p className='GoalDetails'>Amount Saved: ${goal.currentBalance}</p>
                        <p className='GoalDetails'>Target Amount: ${goal.targetAmount}</p>
                        <p className='GoalDetails'>Target Date: {targetDate.toLocaleDateString()}</p>
                        <p className='GoalDetails'>Days Left: {daysLeft > 0 ? daysLeft : 0} days</p>
                    </>

                    
                )}
                {editMode ? (
                    <button id='editbtn' onClick={() => setEditMode(false)}>Cancel</button>
                ) : (
                    <button id='editbtn' onClick={() => setEditMode(true)}>Edit</button>
                )}
                        <button className='deleteBtn' id='goaldeleteBtn' onClick={handleDelete}>Delete</button>
            </div>
            <div id='GoalModalProgress'>
                <CircularProgressbar
                    value={percentage}
                    text={`${Math.round(percentage)}%`}
                    styles={buildStyles({
                        textColor: '#000',
                        pathColor: percentage >= 100 ? 'rgb(87, 122, 87)' : '#4682b4',
                        textSize: '16px',
                        textStyle: {
                            fontFamily: 'Poppins',
                        },
                        trailColor: '#d6d6d6'
                    })}
                />
            </div>
        </Modal>
    );
};

export default GoalDetailModal;
