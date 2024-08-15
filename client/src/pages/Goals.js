import React, { useState, useEffect } from 'react';
import '../styles/Expenses.css';
import '../styles/Goals.css';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import Img from '../assets/man1.jpg';
import AddImg from '../assets/plus.png';
import RightPanel from '../components/RightPanel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GoalDetailModal from '../components/GoalDetailModal.js';
import AddGoalModal from '../components/AddGoalModal'; // Import the AddGoalModal
import '../styles/GoalModal.css'; // Import the styles for react-modal
axios.defaults.withCredentials = true; // Allows cookies to be sent with requests

const Goals = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [data, setData] = useState(null); // Initialize state to null
  const [addGoalModalIsOpen, setAddGoalModalIsOpen] = useState(false); // State for Add Goal Modal

  useEffect(() => {
    axios.get('https://expenztrack.onrender.com/api/v1/user/user-fulldetails')
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const handleCloseModal = () => {
    setSelectedGoal(null);
    setModalIsOpen(false);
  };

  const handleOpenModal = (goal) => {
    setSelectedGoal(goal);
    setModalIsOpen(true);
  };

  const handleCloseAddGoalModal = () => {
    setAddGoalModalIsOpen(false);
  };

  const handleOpenAddGoalModal = () => {
    setAddGoalModalIsOpen(true);
  };

  return (
    <div className='Dashboard'>
      <div className='Navigation'>
        <img src={Img} alt='Profile' />
        {data ? (
          <>
            <h3 id='name'>{data.fullName}</h3>
            <p id='email'>{data.email}</p>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
        <ul>
          <Link className='Link' to="/dashboard"><li>Dashboard</li></Link>
          <Link className='Link' to="/expenses"><li>Expenses</li></Link>
          <li id='this'>Goals</li>
          <li>Summary</li>
          <Link className='Link' to="/account"><li>Account</li></Link>
        </ul>
      </div>

      <div className='Goals'>
        <h1 className='heading'>Goals</h1>
        <p id='tag'>All your goals in one place</p>

        <div id='AddBtn' onClick={handleOpenAddGoalModal}>
          <img id="AddImg" src={AddImg} alt=''></img>
          <p>Add Goal</p>
        </div>
        <SimpleBar className='DailyExpenses'>
          {data && data.savingsGoals ? (
            // Sort goals by createdAt in descending order
            data.savingsGoals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(goal => {
              const percentage = (goal.currentBalance / goal.targetAmount) * 100;
              return (
                <div key={goal._id} className="goal-item" onClick={() => handleOpenModal(goal)}>
                  <h3>{goal.name}</h3>
                  <p>{goal.currentBalance} / {goal.targetAmount}</p>
                  <div id='GoalProgress'>
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
                </div>
              );
            })
          ) : (
            <p>Loading goals...</p>
          )}
        </SimpleBar>

        {selectedGoal && (
          <GoalDetailModal
            goal={selectedGoal}
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
          />
        )}

        <AddGoalModal
          isOpen={addGoalModalIsOpen}
          onRequestClose={handleCloseAddGoalModal}
          categories={data ? data.categories : []} // Pass categories to AddGoalModal
        />
      </div>

      <RightPanel />
    </div>
  );
}

export default Goals;
