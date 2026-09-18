import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, Lock, Eye, EyeOff, MapPin, Building, LandPlot,
  CheckCircle2, AlertCircle, Sprout, ShoppingBag, Store, Wrench, ArrowRight, ShieldCheck
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import { useAuth } from '../context/AuthContext';
import './Register.css';

// Indian States list for dropdown
const INDIAN_STATES = [
  { label: 'Select State', value: '' },
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
  { label: 'Bihar', value: 'Bihar' },
  { label: 'Gujarat', value: 'Gujarat' },
  { label: 'Haryana', value: 'Haryana' },
  { label: 'Karnataka', value: 'Karnataka' },
  { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Punjab', value: 'Punjab' },
  { label: 'Rajasthan', value: 'Rajasthan' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { label: 'Telangana', value: 'Telangana' },
  { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
  { label: 'West Bengal', value: 'West Bengal' },
  { label: 'Other', value: 'Other' },
];

// Role Options (No Admin option)
const ROLE_OPTIONS = [
  {
    id: 'Farmer',
    label: 'Farmer',
    description: 'Rent equipment, sell crops & buy farm products',
    icon: Sprout,
  },
  {
    id: 'Buyer',
    label: 'Buyer',
    description: 'Purchase fresh crops & agricultural produce',
    icon: ShoppingBag,
  },
  {
    id: 'Seller',
    label: 'Seller',
    description: 'Sell fertilizers, seeds, tools & farm supplies',
    icon: Store,
  },
  {
    id: 'Equipment Owner',
    label: 'Equipment Owner',
    description: 'List tractors & machinery for rental or sale',
    icon: Wrench,
  },
];

export const Register = () => {
  const { registerDemo, loading } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer',
    village: '',
    mandal: '',
    district: '',
    state: '',
    pincode: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Errors & Status
  const [errors, setErrors] = useState({});
  const [demoNotice, setDemoNotice] = useState(null);

  // Password Requirement Helpers
  const passwordCriteria = {
    hasLength: formData.password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  };
  const isPasswordValid = passwordCriteria.hasLength && passwordCriteria.hasLetter && passwordCriteria.hasNumber;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Phone Number is required.';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordValid) {
      newErrors.password = 'Password does not meet the requirements below.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role.';
    }

    if (!formData.village.trim()) {
      newErrors.village = 'Village is required.';
    }

    if (!formData.mandal.trim()) {
      newErrors.mandal = 'Mandal/Tehsil is required.';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'District is required.';
    }

    if (!formData.state) {
      newErrors.state = 'State is required.';
    }

    const pincodeDigits = formData.pincode.replace(/\D/g, '');
    if (!pincodeDigits) {
      newErrors.pincode = 'Pincode is required.';
    } else if (pincodeDigits.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit Pincode.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms and Privacy Policy to continue.';
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
      const result = await registerDemo(formData);
      setDemoNotice(result.message);
    } catch (err) {
      setErrors({ form: 'An error occurred during demo registration.' });
    }
  };

  return (
    <MainLayout>
      <div className="agri-auth-page agri-register-page">
        <div className="agri-auth-container agri-register-container">
          {/* Card */}
          <div className="agri-auth-card agri-register-card">
            <div className="agri-auth-header">
              <div className="agri-auth-badge">
                <Sprout size={20} />
                <span>Join AgriMart</span>
              </div>
              <h1 className="agri-auth-title">Create Your AgriMart Account</h1>
              <p className="agri-auth-subtitle">
                Join AgriMart and connect with farmers, buyers and sellers.
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

            {/* General Form Error Notice */}
            {errors.form && (
              <div className="agri-auth-notice agri-auth-notice--error" role="alert">
                <AlertCircle size={20} className="agri-auth-notice__icon" />
                <div className="agri-auth-notice__content">
                  <p className="agri-auth-notice__text">{errors.form}</p>
                </div>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="agri-auth-form agri-register-form" noValidate>
              {/* 1. ROLE SELECTION */}
              <div className="agri-role-section">
                <label className="agri-role-heading">
                  I want to use AgriMart as <span className="agri-input__required">*</span>
                </label>
                <div className="agri-role-grid" role="radiogroup" aria-label="Account Role Selection">
                  {ROLE_OPTIONS.map((roleOpt) => {
                    const IconComp = roleOpt.icon;
                    const isSelected = formData.role === roleOpt.id;
                    return (
                      <div
                        key={roleOpt.id}
                        className={`agri-role-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChange('role', roleOpt.id)}
                        tabIndex={0}
                        role="radio"
                        aria-checked={isSelected}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            handleChange('role', roleOpt.id);
                          }
                        }}
                      >
                        <div className="agri-role-radio-row">
                          <input
                            type="radio"
                            name="accountRole"
                            value={roleOpt.id}
                            checked={isSelected}
                            onChange={() => handleChange('role', roleOpt.id)}
                            className="agri-role-radio"
                          />
                          <IconComp size={20} className="agri-role-icon" />
                        </div>
                        <div className="agri-role-details">
                          <strong className="agri-role-label">{roleOpt.label}</strong>
                          <span className="agri-role-desc">{roleOpt.description}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.role && <p className="agri-input__error" role="alert">{errors.role}</p>}
              </div>

              <div className="agri-form-section-title">Personal Details</div>

              {/* 2. BASIC INFORMATION GRID */}
              <div className="agri-form-grid-2">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  leadingIcon={<User size={18} />}
                  error={errors.fullName}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="e.g. ramesh@example.com"
                  leadingIcon={<Mail size={18} />}
                  error={errors.email}
                  required
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="10-digit mobile number"
                leadingIcon={<Phone size={18} />}
                error={errors.phone}
                required
              />

              <div className="agri-form-section-title">Security</div>

              {/* 3. PASSWORDS GRID */}
              <div className="agri-form-grid-2">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create password"
                  leadingIcon={<Lock size={18} />}
                  trailingIcon={
                    <button
                      type="button"
                      className="agri-password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  error={errors.password}
                  required
                />

                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Re-enter password"
                  leadingIcon={<Lock size={18} />}
                  trailingIcon={
                    <button
                      type="button"
                      className="agri-password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  error={errors.confirmPassword}
                  required
                />
              </div>

              {/* PASSWORD REQUIREMENTS LIVE CHECKLIST */}
              <div className="agri-password-rules-box">
                <span className="agri-password-rules-title">Password must contain:</span>
                <ul className="agri-password-rules-list">
                  <li className={passwordCriteria.hasLength ? 'valid' : ''}>
                    {passwordCriteria.hasLength ? '✓' : '•'} At least 8 characters
                  </li>
                  <li className={passwordCriteria.hasLetter ? 'valid' : ''}>
                    {passwordCriteria.hasLetter ? '✓' : '•'} At least one letter
                  </li>
                  <li className={passwordCriteria.hasNumber ? 'valid' : ''}>
                    {passwordCriteria.hasNumber ? '✓' : '•'} At least one number
                  </li>
                </ul>
              </div>

              <div className="agri-form-section-title">Location & Address</div>

              {/* 4. LOCATION FIELDS GRID */}
              <div className="agri-form-grid-2">
                <Input
                  label="Village / Town"
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleChange('village', e.target.value)}
                  placeholder="e.g. Rampur"
                  leadingIcon={<MapPin size={18} />}
                  error={errors.village}
                  required
                />

                <Input
                  label="Mandal / Tehsil"
                  type="text"
                  value={formData.mandal}
                  onChange={(e) => handleChange('mandal', e.target.value)}
                  placeholder="e.g. Karimnagar"
                  leadingIcon={<LandPlot size={18} />}
                  error={errors.mandal}
                  required
                />
              </div>

              <div className="agri-form-grid-3">
                <Input
                  label="District"
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  placeholder="e.g. Karimnagar"
                  leadingIcon={<Building size={18} />}
                  error={errors.district}
                  required
                />

                <Select
                  label="State"
                  options={INDIAN_STATES}
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  error={errors.state}
                  required
                />

                <Input
                  label="Pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  placeholder="6-digit pincode"
                  error={errors.pincode}
                  required
                />
              </div>

              {/* 5. TERMS & PRIVACY CHECKBOX */}
              <div className="agri-terms-group">
                <label className="agri-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                    className="agri-checkbox"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#terms" onClick={(e) => e.preventDefault()} className="agri-link">
                      AgriMart Terms
                    </a>{' '}
                    and{' '}
                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="agri-link">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="agri-input__error" role="alert">
                    {errors.agreeTerms}
                  </p>
                )}
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
                Create Account
              </Button>
            </form>

            {/* Switch to Login Footer */}
            <div className="agri-auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="agri-auth-switch-link">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
