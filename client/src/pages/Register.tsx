import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Page.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="content-page">
      <div className="container">
        <h1>Join GemDia</h1>
        <p>Create your account and start designing your perfect piece of jewelry.</p>

        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            color: '#E74C3C',
            padding: '1rem',
            borderRadius: 'var(--radius-medium)',
            margin: '1rem auto',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

        <div className="form-group">
            <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            required
              disabled={loading}
          />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            required
              disabled={loading}
              minLength={6}
          />
        </div>

        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--digital-lavender)' }}>Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
