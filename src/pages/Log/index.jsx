import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./log.css";
import Navbar from "../../components/Navbar/index";

function Log() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        console.log('Submitting login form:', formData);
        try {
            const response = await axios.post('https://marti.alwaysdata.net/api/auth/login', formData);
            console.log('User logged in:', response.data);
            setFormData({
                email: '',
                password: ''
            });
            // Stocke le token d'authentification dans le localStorage ou state //
            localStorage.setItem('token', response.data.token);
            navigate('/dashboardprojects'); // Redirige vers le dash admin //
        } catch (error) {
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                alert(error.response.data.message);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="login-page">
            <Navbar />
            <div className="container">
                <h3 className="title-login">Login</h3>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Log;
