// expenseDetailModal.js
import React from 'react';
import Modal from 'react-modal';

const ExpenseDetailModal = ({ isOpen, onRequestClose, expense }) => {

    if (!isOpen) { return null; }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="expense Details"
            ariaHideApp={false} // Needed for accessibility, but set to false for simplicity in this example
            className="Modal"
            overlayClassName="Overlay"

        >
            <h2 id='ExpenseDetailHeading'>{expense.description}</h2>
            <p className='ExpenseDetails'>Category: ${}</p>
            <p className='ExpenseDetails'>Target Amount: ${expense.amount}</p>
            <p className='ExpenseDetails'>Target Date: {new Date(expense.targetDate).toLocaleDateString()}</p>
            <button id='ExpenseModalButton' onClick={onRequestClose}>Close</button>
            
        </Modal>
    );
};

export default ExpenseDetailModal;
