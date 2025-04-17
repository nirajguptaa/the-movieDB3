import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './style.scss';
import "./style.css"
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
        return regex.test(email);
    };

    const checkPasswordStrength = (password) => {
        let strength = { text: 'Weak', color: 'red' };
        
        if (password.length > 7 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            strength = { text: 'Strong', color: 'green' };
        } else if (password.length > 5) {
            strength = { text: 'Medium', color: 'orange' };
        }
        
        return strength;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validate email
        if (!validateEmail(formData.email)) {
            setError('Invalid email address!');
            return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Store user data
        localStorage.setItem('username', formData.username);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);

        alert('Sign-up successful! Redirecting to login...');
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password') {
            const strength = checkPasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    return (
        <div className="auth">
            <ContentWrapper>
                <div className="auth-content">
                    <h1>Sign Up</h1>
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
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
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
                            {passwordStrength && (
                                <div 
                                    className="password-strength"
                                    style={{ color: passwordStrength.color }}
                                >
                                    Strength: {passwordStrength.text}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => navigate('/login')}>Login</span>
                    </p>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Signup;