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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory to-champagne p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md border border-champagne">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-graphite mb-2 font-primary bg-gradient-to-r from-lavender to-graphite bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-graphite/70 text-lg leading-relaxed font-secondary">
                            Sign in to your Facet & Co. account to continue your jewelry journey.
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-gradient-to-br from-secondary to-primary text-primary-foreground p-6 rounded-lg mb-8 text-center">
          <h3 className="mb-4 text-lg font-primary">
            Demo Login Credentials
          </h3>
          <div className="font-secondary leading-relaxed">
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
                            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground px-4 py-2 rounded text-sm cursor-pointer mt-2 transition-all duration-200 hover:bg-primary-foreground/30"
          >
            Auto-fill credentials
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email"
              className="block mb-2 font-medium text-graphite text-sm font-secondary"
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
              className="w-full p-4 border border-champagne rounded-lg text-base font-secondary bg-white text-graphite transition-all duration-300 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label 
              htmlFor="password"
              className="block mb-2 font-medium text-graphite text-sm font-secondary"
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
              className="w-full p-4 border border-champagne rounded-lg text-base font-secondary bg-white text-graphite transition-all duration-300 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 disabled:opacity-50"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 rounded-lg font-semibold text-base transition-all duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-secondary hover:bg-secondary/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg'
            } text-secondary-foreground font-secondary`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-graphite/70 font-secondary">
            Don't have an account? {' '}
            <Link 
              to="/register" 
              className="text-lavender hover:text-lavender/80 font-medium transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-graphite/60 hover:text-graphite text-sm font-secondary transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
