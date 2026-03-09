import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import TermsDrawer from './TermsDrawer';

const PartnerLeadForm = ({ category, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    state: '',
    location: '',
    acceptTerms: false,
  });

  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpExpiryTime, setOtpExpiryTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [termsDrawerOpen, setTermsDrawerOpen] = useState(false);

  const timerRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Initialize EmailJS - replace with your public key
    emailjs.init('YOUR_PUBLIC_KEY');
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (otpExpiryTime) {
      timerRef.current = setInterval(() => {
        const remaining = otpExpiryTime - Date.now();
        if (remaining <= 0) {
          clearInterval(timerRef.current);
          setTimeLeft('⏳ OTP expired. Please resend.');
          setGeneratedOtp(null);
        } else {
          const minutes = Math.floor(remaining / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);
          setTimeLeft(`⏱ Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        }
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [otpExpiryTime]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[\d\s\+\-\(\)]{10,15}$/.test(phone.replace(/\s/g, ''));

  const handleSendOtp = async () => {
    if (!formData.email) {
      setMessage({ text: 'Please enter your email.', type: 'error' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage({ text: 'Please enter a valid email.', type: 'error' });
      return;
    }

    setLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(newOtp);

    try {
      await emailjs.send('service_7yf1tan', 'template_lphthdk', {
        email: formData.email,
        otp: newOtp
      });

      setMessage({ text: 'OTP sent to your email.', type: 'success' });
      setShowOtpSection(true);
      setOtpExpiryTime(Date.now() + 2 * 60 * 1000);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setMessage({ text: 'Failed to send OTP.', type: 'error' });
      setGeneratedOtp(null);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!generatedOtp || Date.now() > otpExpiryTime) {
      setMessage({ text: 'OTP expired. Please resend.', type: 'error' });
      return;
    }

    if (otp.trim() === String(generatedOtp)) {
      setMessage({ text: 'OTP verified!', type: 'success' });
      setShowExtraFields(true);
      setShowOtpSection(false);
      setEmailVerified(true);
      clearInterval(timerRef.current);
      setTimeout(() => nameInputRef.current?.focus(), 100);
    } else {
      setMessage({ text: 'Invalid OTP.', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      setMessage({ text: 'Please verify OTP before submitting.', type: 'error' });
      return;
    }

    if (!formData.acceptTerms) {
      setMessage({ text: 'Please accept the terms and conditions.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const payload = {
        ...formData,
        category: category,
      };

      const response = await fetch('/api/partnerships/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess();
      } else {
        setMessage({ text: data.message || 'Please check your details.', type: 'error' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ text: 'Network error.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="leadForm" className="lead-form" onSubmit={handleSubmit}>
        <input type="hidden" name="category" value={category} />

        {message.text && (
          <div className={`lead-msg ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="leadEmail">Email *</label>
          <input
            type="email"
            id="leadEmail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            readOnly={emailVerified}
            onBlur={(e) => {
              if (e.target.value && !validateEmail(e.target.value)) {
                e.target.style.borderColor = 'var(--error)';
              } else {
                e.target.style.borderColor = '';
              }
            }}
          />
        </div>

        {!emailVerified && !showOtpSection && (
          <button
            type="button"
            id="sendOtpBtn"
            className="btn btn-secondary"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner">⏳</span> Sending...
              </>
            ) : (
              'Send OTP'
            )}
          </button>
        )}

        {showOtpSection && (
          <div id="otpSection" className="otp-section">
            <div className="form-group">
              <label htmlFor="otpInput">Enter OTP *</label>
              <input
                type="text"
                id="otpInput"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
              />
            </div>
            <div id="otpTimerDisplay" className="otp-timer">
              {timeLeft}
            </div>
            <button
              type="button"
              id="verifyOtpBtn"
              className="btn btn-secondary"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        {showExtraFields && (
          <div id="extraFields" className="extra-fields">
            <div className="form-group">
              <label htmlFor="leadName">Full Name *</label>
              <input
                type="text"
                id="leadName"
                name="name"
                ref={nameInputRef}
                value={formData.name}
                onChange={handleInputChange}
                maxLength="80"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="leadPhone">Phone Number *</label>
              <input
                type="tel"
                id="leadPhone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength="30"
                required
                onBlur={(e) => {
                  if (e.target.value && !validatePhone(e.target.value)) {
                    e.target.style.borderColor = 'var(--error)';
                  } else {
                    e.target.style.borderColor = '';
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="leadState">State *</label>
              <input
                type="text"
                id="leadState"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                maxLength="50"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="leadLocation">Business Address *</label>
              <input
                type="text"
                id="leadLocation"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                maxLength="150"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                />
                I accept the{' '}
                <span
                  id="showTermsLink"
                  className="terms-link"
                  onClick={() => setTermsDrawerOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTermsDrawerOpen(true);
                    }
                  }}
                  tabIndex="0"
                  role="button"
                >
                  terms and conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              id="submitBtn"
              className="btn btn-primary"
              disabled={loading || !emailVerified}
            >
              {loading ? 'Submitting...' : 'Submit Partnership Request'}
            </button>
          </div>
        )}
      </form>

      <TermsDrawer
        open={termsDrawerOpen}
        onClose={() => setTermsDrawerOpen(false)}
        onAccept={() => {
          setFormData(prev => ({ ...prev, acceptTerms: true }));
          setTermsDrawerOpen(false);
        }}
      />
    </>
  );
};

export default PartnerLeadForm;