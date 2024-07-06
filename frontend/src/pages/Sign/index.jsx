import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./sign.css";
import Navbar from "../../components/Navbar/index";

function Sign() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitées form data:", formData);
            let response = await axios.post('https://marti.alwaysdata.net/api/auth/signup', formData);
            console.log(response.data);
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/log');
        } catch (error) {
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className= "signup-page">
            <Navbar />
            <div className ="container">
            <h3 className="title-sign">SignUp</h3>
                <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Sign;
