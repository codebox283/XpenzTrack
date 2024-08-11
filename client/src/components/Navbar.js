import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Assuming your CSS is in the same directory
import Logo from '../assets/logo.png'; // Update with the correct path to your logo

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to="/" className="logo">
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="navbar-buttons">
                <Link to="/login">
                    <button className="btn1">Log In</button>
                </Link>
                <Link to="/signup">
                    <button className="btn2">Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
