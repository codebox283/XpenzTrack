import React, { useState, useEffect } from "react";
import '../styles/Account.css';
import Img from '../assets/man1.jpg';
import axios from "axios";
axios.defaults.withCredentials = true; // Allows cookies to be sent with requests

const Account = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('/api/v1/user/user-fulldetails');
                setUser(response.data.data[0]);
                setFormData({
                    fullName: response.data.data[0].fullName,
                    username: response.data.data[0].username,
                    email: response.data.data[0].email,
                    phoneNumber: response.data.data[0].phoneNumber,
                });
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        
        fetchUserDetails();
    }, []); 

    // Show loading message while fetching data
    if (!user) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('/api/v1/user/update-details', formData);
            setUser({ ...user, ...formData }); // Update user state with new data
            setIsEditing(false); // Exit edit mode after submission
            window.location.reload(); 
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="Account">
            <div className="ProfilePicture">
                <h1>Account Section</h1>
                <img src={Img} alt="Profile" />
            </div>
            <div className="AccountDetails">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="EditForm">
                        <label>
                            {/* Full Name: */}
                            <input
                                className='editInputField accountinput' 
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                style={{ fontSize: '30px'  }}
                            />
                        </label>
                        <label>
                            Username:
                            <input
                            className='editInputField accountinput'
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                className='editInputField accountinput'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                            className='editInputField accountinput'
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit" onClick={() => setIsEditing(false)}>Save</button>
                        {/* <button type="button" onClick={() => setIsEditing(false)}>Cancel</button> */}
                    </form>
                ) : (
                    <>
                        <h2>{user.fullName}</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.phoneNumber}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Account;
