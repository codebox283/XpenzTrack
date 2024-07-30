// GoalDetailModal.js
import React from 'react';
import Modal from 'react-modal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const GoalDetailModal = ({ isOpen, onRequestClose, goal }) => {

    if (!isOpen) { return null; }

    const percentage = (goal.currentBalance / goal.targetAmount) * 100;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Goal Details"
            ariaHideApp={false} // Needed for accessibility, but set to false for simplicity in this example
            className="Modal"
            overlayClassName="Overlay"

        >
            <h2 id='GoalDetailHeading'>{goal.name}</h2>
            <p className='GoalDetails'>Amount Saved: ${goal.currentBalance}</p>
            <p className='GoalDetails'>Target Amount: ${goal.targetAmount}</p>
            <p className='GoalDetails'>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</p>
            <button id='GoalModalButton' onClick={onRequestClose}>Close</button>
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
