import React from 'react';
import Modal from 'react-modal';
import CrossImg from '../assets/remove.png';
import Plant from '../assets/plant2.png';
import '../styles/RightPanel.css';
import '../styles/ExpenseModal.css';

const ExpenseDetailModal = ({ isOpen, onRequestClose, expense }) => {
    if (!isOpen || !expense) { return null; }

    const category = expense.category || 'Unknown'; // Get category from expense object
    const date = new Date(expense.createdAt).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const time = new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Expense Details"
            ariaHideApp={false} // Needed for accessibility, but set to false for simplicity in this example
            className="Modal"
            overlayClassName="Overlay"
        >
            <img id='ExpenseModalButton' src={CrossImg} alt='Close' onClick={onRequestClose} />
            <p className={`modalcategory ${category.toLowerCase()}`}>{category}</p> {/* Use category directly */}
            <p className='ExpenseDetails'>{expense.description}</p>
            <p className='ExpenseDetails'>${expense.amount}</p>
            <p className='ExpenseDetails' id='time'>{time} {date}</p>
            <img id="modalPlant" src={Plant} alt='' />
        </Modal>
    );
};

export default ExpenseDetailModal;
