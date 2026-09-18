import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, KeyRound, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Sprout } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './ForgotPassword.css';

export const ForgotPassword = () => {
  const { forgotPasswordDemo, loading } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState(null);
  const [demoNotice, setDemoNotice] = useState(null);

  const validateForm = () => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      setError('Please enter your email or phone number.');
      return false;
    }

    if (trimmed.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setError('Please enter a valid email address.');
        return false;
      }
    } else if (/^[0-9+-\s]+$/.test(trimmed)) {
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        setError('Please enter a valid 10-digit phone number.');
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDemoNotice(null);

    if (!validateForm()) {
      return;
    }

    try {
      const result = await forgotPasswordDemo(identifier);
      setDemoNotice(result.message);
    } catch (err) {
      setError('An error occurred during password reset request.');
    }
  };

  return (
    <MainLayout>
      <div className="agri-auth-page">
        <div className="agri-auth-container agri-forgot-container">
          <div className="agri-auth-card agri-forgot-card">
            <div className="agri-auth-header">
              <div className="agri-auth-badge">
                <KeyRound size={20} />
                <span>Password Recovery</span>
              </div>
              <h1 className="agri-auth-title">Reset Your Password</h1>
              <p className="agri-auth-subtitle">
                Enter your email or phone number to request a password reset.
              </p>
            </div>

            {/* Demo Notice Banner */}
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
            {error && (
              <div className="agri-auth-notice agri-auth-notice--error" role="alert">
                <AlertCircle size={20} className="agri-auth-notice__icon" />
                <div className="agri-auth-notice__content">
                  <p className="agri-auth-notice__text">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="agri-auth-form" noValidate>
              <Input
                label="Email or Phone Number"
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter your email or phone number"
                leadingIcon={<User size={18} />}
                error={error}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                icon={<ArrowRight size={18} />}
              >
                Send Reset Link
              </Button>
            </form>

            <div className="agri-auth-footer">
              <Link to="/login" className="agri-auth-back-link">
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </div>
          </div>

          {/* Side Visual Panel */}
          <div className="agri-auth-visual-panel">
            <div className="agri-auth-visual-content">
              <div className="agri-auth-visual-badge">🌱 Secure Farmer Portal</div>
              <h2>Account Protection</h2>
              <p>
                AgriMart keeps your farm produce listings and rental equipment reservations safe with simple verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
