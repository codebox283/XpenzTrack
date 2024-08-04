import React, { useState, useEffect } from "react";
import '../styles/Account.css';
import Img from '../assets/man1.jpg';
const Account = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/dummydata.json')
            .then(response => response.json())
            .then(data => setUser(data[0]));
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Account">
            
            <div className="ProfilePicture">
            <h1 >Account section</h1>
                <img src={Img} alt="Profile" />
                
            </div>
            <div className="AccountDetails">
                <h2>{user.fullName}</h2>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <button>Edit Profile</button>
            </div>
            
        </div>
    );
};

export default Account;
