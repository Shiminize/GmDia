import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="bg-card rounded-2xl shadow-2xl p-12 w-full max-w-md border border-border">
        {/* Header */}
        <div className="text-left mb-10">
          <h1 className="text-luxury-headline mb-2 bg-gradient-to-r from-accent-foreground to-foreground bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-body-primary">
            Sign in to your Facet & Co. account to continue your jewelry journey.
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-gradient-to-br from-secondary to-primary text-primary-foreground p-6 rounded-lg mb-8 text-left">
          <h3 className="mb-4 text-card-title">
            Demo Login Credentials
          </h3>
          <div className="text-body-primary">
            <p className="mb-2">
              <strong>Email:</strong> admin@facetandco.com
            </p>
            <p className="mb-2">
              <strong>Password:</strong> admin123
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'admin@facetandco.com',
                password: 'admin123'
              });
            }}
            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground px-4 py-2 rounded text-button-secondary cursor-pointer mt-2 transition-all duration-200 hover:bg-primary-foreground/30"
          >
            Auto-fill credentials
          </button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8 text-left border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email"
              className="block mb-2 text-label"
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
              className="w-full p-4 border border-border rounded-lg text-body-primary bg-input transition-all duration-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label 
              htmlFor="password"
              className="block mb-2 text-label"
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
              className="w-full p-4 border border-border rounded-lg text-body-primary bg-input transition-all duration-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 rounded-lg text-button-primary transition-all duration-300 ${
              loading 
                ? 'bg-muted cursor-not-allowed' 
                : 'bg-secondary hover:bg-secondary/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg'
            } text-secondary-foreground`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-left">
          <p className="text-body-secondary">
            Don't have an account? {' '}
            <Link 
              to="/register" 
              className="text-link-primary hover:text-link-primary-hover transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-left">
          <Link 
            to="/" 
            className="text-link-secondary hover:text-link-secondary-hover transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
