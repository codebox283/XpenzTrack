import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        for (const key in formData) {
            if (formData[key].trim() === '') {
                setError('All fields are required');
                return;
            }
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/api/user/signup', formData);
            console.log(response.data);
            // Handle the response data here
            if (response.status === 200) {
                console.log('User registered successfully');
            } else {
                setError(response.data.message || 'Failed to register. Please try again.');
                console.error('Signup failed:', response.data.error);
            }
            // Redirect user to dashboard or any other page upon successful signup
        } catch (error) {
            setError('Failed to register. Please try again.');
            console.error('Signup failed:', error);
        }
    };
    
    return (
        <div className='auth'>
            <div className='container'>
                <h2 className='header'>Welcome!</h2>
                <p className='header-text'>Hey, enter your details to start your money saving journey!</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        className='user-field'
                        value={formData.name}
                        onChange={handleChange}
                    /><br />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='user-field'
                        value={formData.email}
                        onChange={handleChange}
                    /><br />
                    <input
                        type='tel'
                        name='phoneNumber'
                        placeholder='Phone Number'
                        className='user-field'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    /><br />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='user-field'
                        value={formData.password}
                        onChange={handleChange}
                    /><br />
                    <input type='submit' value='Sign Up' className='submit-button' />
                </form>
                {error && <p className='error-message'>{error}</p>}
                <p className='text-2'>Already have an account? <Link to='/login'>Login Here</Link></p>
            </div>
        </div>
    );
};

export default Signup;
