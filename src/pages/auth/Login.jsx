import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import './style.scss';
import "./style.css"
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check for auto-login
        if (localStorage.getItem('rememberMe') === 'true') {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (formData.username === storedUsername && formData.password === storedPassword) {
            if (formData.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }
            alert('Login successful! Redirecting...');
            navigate('/');
        } else {
            setError('Invalid username or password!');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="auth">
            <ContentWrapper>
                <div className="auth-content">
                    <h1>Login</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                Remember Me
                            </label>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account?{' '}
                        <span onClick={() => navigate('/signup')}>Sign Up</span>
                    </p>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Login;