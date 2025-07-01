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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--light-gray) 0%, var(--champagne-beige) 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        background: 'var(--pure-white)',
        borderRadius: 'var(--radius-large)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '3rem',
        width: '100%',
        maxWidth: '500px',
        border: '1px solid var(--champagne-beige)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '2.5rem',
            color: 'var(--graphite-black)',
            margin: '0 0 0.5rem',
            background: 'linear-gradient(135deg, var(--digital-lavender), var(--graphite-black))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: 'var(--warm-gray)',
            fontSize: '1.1rem',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Sign in to your GemDia account to continue your jewelry journey.
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div style={{
          background: 'linear-gradient(135deg, var(--digital-lavender), var(--graphite-black))',
          color: 'var(--pure-white)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-medium)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            margin: '0 0 1rem', 
            fontSize: '1.1rem',
            fontFamily: 'var(--font-primary)'
          }}>
            Demo Login Credentials
          </h3>
          <div style={{ 
            fontFamily: 'var(--font-secondary)',
            lineHeight: '1.6'
          }}>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Email:</strong> admin@gemdia.com
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Password:</strong> admin123
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'admin@gemdia.com',
                password: 'admin123'
              });
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'var(--pure-white)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-small)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Auto-fill credentials
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            color: '#E74C3C',
            padding: '1rem',
            borderRadius: 'var(--radius-medium)',
            margin: '0 0 2rem',
            textAlign: 'center',
            border: '1px solid rgba(231, 76, 60, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--graphite-black)',
                fontSize: '0.95rem'
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid var(--champagne-beige)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                fontFamily: 'var(--font-secondary)',
                background: 'var(--pure-white)',
                color: 'var(--graphite-black)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--digital-lavender)';
                e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--champagne-beige)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--graphite-black)',
                fontSize: '0.95rem'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid var(--champagne-beige)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                fontFamily: 'var(--font-secondary)',
                background: 'var(--pure-white)',
                color: 'var(--graphite-black)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--digital-lavender)';
                e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--champagne-beige)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              background: loading 
                ? 'var(--warm-gray)' 
                : 'linear-gradient(135deg, var(--digital-lavender), var(--graphite-black))',
              color: 'var(--pure-white)',
              border: 'none',
              borderRadius: 'var(--radius-medium)',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-secondary)',
              opacity: loading ? 0.7 : 1,
              transform: loading ? 'none' : 'translateY(0)',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(147, 51, 234, 0.3)'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(147, 51, 234, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(147, 51, 234, 0.3)';
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--champagne-beige)'
        }}>
          <p style={{ 
            color: 'var(--warm-gray)',
            margin: 0
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: 'var(--digital-lavender)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
