import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.scss';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import logo from "../../static/images/logo_black.png";
const API_URL = 'http://127.0.0.1:8000/api/login/';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Use login function from AuthContext

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Attempting to logging in");
        try {
            await login(username, password); // This should set the user in your context
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError('Failed to login: ' + error.response.data.detail);
            } else {
                setError('Failed to login: Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
                <NavLink to="/"><img src={logo} alt="Home"/></NavLink>
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="login-button">Login</button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
