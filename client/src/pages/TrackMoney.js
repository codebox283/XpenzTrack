import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TrackMoney.css';
import Logo from '../assets/logo.png'

const TrackMoney = () => {
    return (
        <div className="track-money">
                <Link to="/" className="logo">
                    <img src={Logo} alt="Logo" />
                </Link>
                <h1 className="main-heading">Track Money Like a Pro</h1>
                <p className="description">
                    Are you tired of tracking your expenses the old-fashioned way? 
                    It's time to modernize your approach to managing your finances! 
                    With our innovative tools, you can gain insights into your spending habits and make informed decisions to improve your financial health. 
                    No more tedious manual entries or lost receipts. 
                    Start tracking your money seamlessly and effortlessly, ensuring you stay on top of your budget and financial goals.
                </p>
                <Link to="/signup" className="signup-button">Sign Up Now</Link>
        </div>
    );
};

export default TrackMoney;
