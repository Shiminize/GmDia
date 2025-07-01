import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Page.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
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
        <h1>Welcome Back</h1>
        <p>Sign in to your GemDia account to continue your jewelry journey.</p>

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
          />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>Don't have an account? <Link to="/register" style={{ color: 'var(--digital-lavender)' }}>Create one here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
