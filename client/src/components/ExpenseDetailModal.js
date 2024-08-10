import React from 'react';
import Modal from 'react-modal';
import axios from 'axios'; 
import CrossImg from '../assets/remove.png';
import Plant from '../assets/plant2.png';
import '../styles/RightPanel.css';
import '../styles/ExpenseModal.css';

const ExpenseDetailModal = ({ isOpen, onRequestClose, expense }) => {
    if (!isOpen || !expense) { return null; }

    const category = expense.category || 'Unknown';
    const date = new Date(expense.createdAt).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const time = new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleDelete = async () => {
        try {
            const response = await axios.get(`/api/v1/category/delete-expense/${expense._id}`);
            
            if (response.status === 200) {
                onRequestClose(); 
                window.location.reload(); 
            }
        } catch (error) {
            console.error("Error deleting expense: ", error);
            // You might want to show an error message to the user
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Expense Details"
            aria-labelledby="contained-modal-title-vcenter"
            className='Modal'
            overlayClassName='Overlay'
            centered
        >
            <div className="ModalContent">
                <img 
                    id='ExpenseModalCloseButton' 
                    src={CrossImg} 
                    alt='Close modal'
                    onClick={onRequestClose} 
                />
                <p className={`modalcategory ${category.toLowerCase()}`}>{category}</p>
                <p className='ExpenseDetails' id='expesnsedesc'>{expense.description}</p>
                <p className='ExpenseDetails' id='expenseamt'>${expense.amount}</p>
                <p className='ExpenseDetails' id='time'>{time} {date}</p>
                <img id="modalPlant" src={Plant} alt='Decorative plant' /> {/* Added descriptive alt text */}
                <button className='deleteBtn' onClick={handleDelete}>Delete Expense</button>
            </div>
        </Modal>
    );
};

export default ExpenseDetailModal;
