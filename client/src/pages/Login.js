import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/Login.css';
import Navbar from '../components/Navbar';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/v1/user/login', formData);
            console.log(response.data);
            navigate('/dashboard');
            // Redirect user to dashboard or any other page upon successful login
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='auth'>
            <div className='container'>
                <h2 className='header'>Welcome Back</h2>
                <p className='header-text'>Hey, Enter your details to log in to your account</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='email'
                        placeholder='Email'
                        className='user-field'
                        value={formData.email}
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
                    <input type='submit' value='Login' className='submit-button' />
                </form>
                {error && <p className='error-message'>{error}</p>}
                <p className='text-1'><Link to='/forgot-password'>Forgot password?</Link></p>
                <p className='text-2'>Don't have an account? <Link to='/signup'>Register Now</Link></p>
            </div>
        </div>
    );
};

export default Login;