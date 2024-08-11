import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TrackMoney.css';
import Logo from '../assets/logo_white.png'

const SaveMoney = () => {
    return (
        <div className="save-money">
            <Link to="/" className="logo">
                <img src={Logo} alt="Logo" />
            </Link>
            <h1 className="main-heading" id='saveH'>Save for Your Dreams</h1>
            <p className="description" id='saveD'>
                Save money to make your dreams a reality—whether that means buying your first supercar or finally taking that trip with friends you’ve always talked about. It’s time to stop dreaming and start saving!
                <br></br>
                With our powerful tools, you can effortlessly track your savings and set clear goals that motivate you. Forget about the old ways of budgeting; it’s time to embrace a smarter, more exciting approach. Imagine the thrill of crossing that finish line, whether it’s holding the keys to your dream car or boarding a plane to your next adventure.
                <br></br>
                Join us on this journey to financial freedom, where every penny saved brings you closer to your aspirations. Take the first step today and start your adventure toward a life of freedom and fulfillment!
            </p>
            <Link to="/signup" className="signup-button">Sign Up Now</Link>
        </div>
    );
};

export default SaveMoney;
