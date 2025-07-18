import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-luxury-hero mb-4">
            Join Facet & Co.
          </h1>
          <p className="text-body-primary max-w-xl mx-auto">
            Create your account and start designing your perfect piece of jewelry.
          </p>
        </div>

        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-border">
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8 text-center border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input text-body-primary transition-all duration-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-label">
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
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input text-body-primary transition-all duration-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-label">
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
                minLength={6}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input text-body-primary transition-all duration-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                placeholder="Enter your password (minimum 6 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={6}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input text-body-primary transition-all duration-300 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                placeholder="Confirm your password"
              />
            </div>

            <div className="text-center pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className={`px-8 py-3 rounded-full text-button-primary transition-all duration-300 ${
                  loading 
                    ? 'bg-muted cursor-not-allowed text-muted-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg'
                } focus:outline-none focus:ring-2 focus:ring-secondary/50`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-body-secondary">
              Already have an account? {' '}
              <Link 
                to="/login" 
                className="text-link-primary hover:text-link-primary-hover transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="text-center mt-4">
            <Link 
              to="/" 
              className="text-link-secondary hover:text-link-secondary-hover transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
