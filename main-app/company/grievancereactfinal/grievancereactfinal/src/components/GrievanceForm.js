import React, { useState } from 'react';
import { grievanceTypes, statesList } from '../data/grievanceData';

const GrievanceForm = ({ onOpenPolicies, onShowConfirmation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    location: '',
    grievanceType: 'Environmental',
    description: '',
    acceptPolicies: false
  });

  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.fullName.trim()) {
      newErrors.push('Full Name is required.');
    } else if (formData.fullName.length > 80) {
      newErrors.push('Full Name should not exceed 80 characters.');
    }

    if (!formData.email.trim()) {
      newErrors.push('Email is required.');
    } else if (!isValidEmail(formData.email)) {
      newErrors.push('Please enter a valid email address.');
    } else if (formData.email.length > 100) {
      newErrors.push('Email should not exceed 100 characters.');
    }

    if (!formData.phone.trim()) {
      newErrors.push('Phone Number is required.');
    } else if (formData.phone.length > 30) {
      newErrors.push('Phone Number should not exceed 30 characters.');
    }

    if (!formData.state.trim()) {
      newErrors.push('State is required.');
    } else if (formData.state.length > 50) {
      newErrors.push('State should not exceed 50 characters.');
    }

    if (!formData.location.trim()) {
      newErrors.push('Location is required.');
    } else if (formData.location.length > 150) {
      newErrors.push('Location should not exceed 150 characters.');
    }

    if (!formData.grievanceType) {
      newErrors.push('Grievance Type is required.');
    }

    if (!formData.description.trim()) {
      newErrors.push('Description is required.');
    } else if (formData.description.length > 2000) {
      newErrors.push('Description should not exceed 2000 characters.');
    }

    if (!formData.acceptPolicies) {
      newErrors.push('You must accept the policies to proceed.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormMessage('');

    try {
      // Submit grievance data to backend API
      const response = await fetch('/api/grievance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok || !data.ok) {
        setErrors(['Failed to submit grievance. Please try again.']);
        return;
      }

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        state: '',
        location: '',
        grievanceType: 'Environmental',
        description: '',
        acceptPolicies: false
      });

      setErrors([]);
      setFormMessage('Grievance submitted successfully!');
      
      // Show confirmation modal
      onShowConfirmation();

    } catch (error) {
      console.error('Error submitting grievance:', error);
      setErrors(['An error occurred while submitting your grievance. Please try again.']);
      setFormMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grievance-form">
      <div className="form-wrapper">
        <h2>Grievance Form</h2>

        {errors.length > 0 && (
          <div className="error-messages" style={{
            background: '#fee',
            color: '#c00',
            padding: '1rem',
            borderRadius: '0.8rem',
            marginBottom: '1.5rem',
            fontSize: '0.95rem'
          }}>
            {errors.map((error, index) => (
              <div key={index}>• {error}</div>
            ))}
          </div>
        )}

        {formMessage && (
          <div style={{
            background: '#efe',
            color: '#0a0',
            padding: '1rem',
            borderRadius: '0.8rem',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            fontWeight: '600'
          }}>
            ✓ {formMessage}
          </div>
        )}

        <form id="grievanceForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                maxLength="80"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                maxLength="100"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
                maxLength="30"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">
                State <span className="required-star">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a state</option>
                {statesList.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Location <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City or area"
              maxLength="150"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="grievanceType">
              Grievance Type <span className="required-star">*</span>
            </label>
            <select
              id="grievanceType"
              name="grievanceType"
              value={formData.grievanceType}
              onChange={handleInputChange}
              required
            >
              {grievanceTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description <span className="required-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide detailed information about your grievance..."
              maxLength="2000"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="acceptPolicies"
              name="acceptPolicies"
              checked={formData.acceptPolicies}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="acceptPolicies">
              I accept the{' '}
              <span 
                className="policies-link" 
                onClick={onOpenPolicies}
              >
                grievance policies
              </span>
              <span className="required-star">*</span>
            </label>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              type="submit"
              id="submitBtn"
              className="btn-primary jeton-send-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
            </button>
          </div>

          <div id="formMsg" className="status-msg"></div>
        </form>
      </div>
    </section>
  );
};

export default GrievanceForm;
