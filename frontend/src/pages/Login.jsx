import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Sprout, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { loginDemo, loading } = useAuth();

  // Form State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Error & Status State
  const [errors, setErrors] = useState({});
  const [demoNotice, setDemoNotice] = useState(null);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Identifier validation
    const trimmedId = identifier.trim();
    if (!trimmedId) {
      newErrors.identifier = 'Please enter your email or phone number.';
    } else if (trimmedId.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedId)) {
        newErrors.identifier = 'Please enter a valid email address.';
      }
    } else if (/^[0-9+-\s]+$/.test(trimmedId)) {
      const digitsOnly = trimmedId.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        newErrors.identifier = 'Please enter a valid 10-digit phone number.';
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDemoNotice(null);

    if (!validateForm()) {
      return;
    }

    try {
      const result = await loginDemo({ identifier, password, rememberMe });
      setDemoNotice(result.message);
    } catch (err) {
      setErrors({ form: 'An error occurred during demo login.' });
    }
  };

  return (
    <MainLayout>
      <div className="agri-auth-page">
        <div className="agri-auth-container">
          {/* Form Card */}
          <div className="agri-auth-card">
            <div className="agri-auth-header">
              <div className="agri-auth-badge">
                <Sprout size={20} />
                <span>AgriMart Sign In</span>
              </div>
              <h1 className="agri-auth-title">Welcome Back</h1>
              <p className="agri-auth-subtitle">
                Sign in to continue to AgriMart.
              </p>
            </div>

            {/* Demo Success Notice */}
            {demoNotice && (
              <div className="agri-auth-notice agri-auth-notice--success" role="status">
                <CheckCircle2 size={20} className="agri-auth-notice__icon" />
                <div className="agri-auth-notice__content">
                  <strong className="agri-auth-notice__title">Demo Action Successful</strong>
                  <p className="agri-auth-notice__text">{demoNotice}</p>
                </div>
              </div>
            )}

            {/* General Error Notice */}
            {errors.form && (
              <div className="agri-auth-notice agri-auth-notice--error" role="alert">
                <AlertCircle size={20} className="agri-auth-notice__icon" />
                <div className="agri-auth-notice__content">
                  <p className="agri-auth-notice__text">{errors.form}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="agri-auth-form" noValidate>
              {/* Identifier Input */}
              <Input
                label="Email or Phone Number"
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: null }));
                }}
                placeholder="Enter your email or phone number"
                leadingIcon={<User size={18} />}
                error={errors.identifier}
                required
                autoComplete="username"
              />

              {/* Password Input with Show/Hide Toggle */}
              <div className="agri-password-field">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  placeholder="Enter your password"
                  leadingIcon={<Lock size={18} />}
                  trailingIcon={
                    <button
                      type="button"
                      className="agri-password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={0}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  error={errors.password}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="agri-auth-options-row">
                <label className="agri-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="agri-checkbox"
                  />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password" className="agri-auth-forgot-link">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                icon={<ArrowRight size={18} />}
              >
                Sign In
              </Button>
            </form>

            {/* Switch to Register Footer */}
            <div className="agri-auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="agri-auth-switch-link">
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Desktop Visual Illustration Side Panel */}
          <div className="agri-auth-visual-panel">
            <div className="agri-auth-visual-content">
              <div className="agri-auth-visual-badge">🌾 Kisan Marketplace</div>
              <h2>Everything Farmers Need, In One Place</h2>
              <p>
                Connect directly with local buyers, sell crops at fair market prices, and rent high-performance farm machinery effortlessly.
              </p>
              <div className="agri-auth-visual-features">
                <div className="agri-auth-visual-feature-item">
                  <span className="agri-feature-dot">✓</span> Direct Farmer-to-Buyer Trading
                </div>
                <div className="agri-auth-visual-feature-item">
                  <span className="agri-feature-dot">✓</span> Verified Equipment Owners & Rates
                </div>
                <div className="agri-auth-visual-feature-item">
                  <span className="agri-feature-dot">✓</span> Local Crops & Supplies Near You
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
