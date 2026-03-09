import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import OTPVerification from './OTPVerification';
import FileUploadSection from './FileUploadSection';
import CountryCodeSelector from './CountryCodeSelector';
import TermsDrawer from './TermsDrawer';

const ContactForm = ({ category, onSubmitSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    category: category || 'Improvements',
    message: '',
    attachment: null,
    acceptTerms: false,
  });

  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpExpiryTime, setOtpExpiryTime] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [termsDrawerOpen, setTermsDrawerOpen] = useState(false);

  const timerRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'NKqMo7yjfTsoYYysu');
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // OTP Timer
  useEffect(() => {
    if (otpExpiryTime) {
      timerRef.current = setInterval(() => {
        const remaining = otpExpiryTime - Date.now();
        if (remaining <= 0) {
          clearInterval(timerRef.current);
          setGeneratedOtp(null);
          setMessage({ text: '⏳ OTP expired. Please resend.', type: 'error' });
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
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_7yf1tan',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_lphthdk',
        {
          email: formData.email,
          otp: newOtp
        }
      );

      setMessage({ text: 'OTP sent to your email. Valid for 2 minutes.', type: 'success' });
      setShowOtpSection(true);
      setOtpExpiryTime(Date.now() + 2 * 60 * 1000);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setMessage({ text: 'Failed to send OTP. Please try again.', type: 'error' });
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
      setMessage({ text: '✓ Email verified successfully!', type: 'success' });
      setShowExtraFields(true);
      setShowOtpSection(false);
      setEmailVerified(true);
      clearInterval(timerRef.current);
      setTimeout(() => nameInputRef.current?.focus(), 100);
    } else {
      setMessage({ text: 'Invalid OTP. Please try again.', type: 'error' });
    }
  };

  const handleFileSelect = (file) => {
    if (category === 'Security & Compliance') {
      if (!file) {
        setMessage({ text: 'Please attach a file for bug bounty.', type: 'error' });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ text: 'File size must be less than 2MB.', type: 'error' });
        return;
      }
      if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        setMessage({ text: 'Only JPG/JPEG files are allowed.', type: 'error' });
        return;
      }
    }
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      setMessage({ text: 'Please verify your email first.', type: 'error' });
      return;
    }

    if (!formData.fullName || formData.fullName.trim().length === 0) {
      setMessage({ text: 'Please enter your full name.', type: 'error' });
      return;
    }

    if (!validatePhone(formData.phone)) {
      setMessage({ text: 'Please enter a valid phone number.', type: 'error' });
      return;
    }

    if (!formData.message || formData.message.trim().length < 10) {
      setMessage({ text: 'Please provide a message (at least 10 characters).', type: 'error' });
      return;
    }

    if (category === 'Security & Compliance' && !formData.attachment) {
      setMessage({ text: 'Please attach a file for bug bounty.', type: 'error' });
      return;
    }

    if (!formData.acceptTerms) {
      setMessage({ text: 'Please accept the terms and conditions.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.countryCode + formData.phone,
        category: category,
        message: formData.message,
        acceptTerms: formData.acceptTerms
      };

      // Submit to backend API
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Send confirmation email
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_7yf1tan',
          process.env.REACT_APP_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_v76jk6d',
          {
            fullName: formData.fullName,
            email: formData.email,
            category: category,
            message: formData.message
          }
        );

        setMessage({ text: '✓ Feedback submitted successfully!', type: 'success' });
        onSubmitSuccess();
      } else {
        setMessage({ text: data.message || 'Error submitting feedback.', type: 'error' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Email Verification Section */}
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            readOnly={emailVerified}
            required
          />
        </div>

        {!emailVerified && !showOtpSection && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? '⏳ Sending...' : 'Send OTP'}
          </button>
        )}

        {/* OTP Verification */}
        {showOtpSection && (
          <OTPVerification
            otp={otp}
            setOtp={setOtp}
            onVerify={handleVerifyOtp}
            otpTimeLeft={otpExpiryTime ? Math.ceil((otpExpiryTime - Date.now()) / 1000) : 0}
            loading={loading}
          />
        )}

        {/* Additional Fields (shown after OTP verification) */}
        {showExtraFields && (
          <>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                ref={nameInputRef}
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                maxLength="80"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <div className="phone-input-group">
                <CountryCodeSelector
                  value={formData.countryCode}
                  onChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                  maxLength="15"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your feedback, feature request, or bug..."
                maxLength="1000"
                rows="5"
                required
              />
              <small>{formData.message.length}/1000 characters</small>
            </div>

            {/* File Upload for Bug Bounty */}
            {category === 'Security & Compliance' && (
              <FileUploadSection
                onFileSelect={handleFileSelect}
                selectedFile={formData.attachment}
              />
            )}

            {/* Terms Checkbox */}
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
                  className="terms-link"
                  onClick={() => setTermsDrawerOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setTermsDrawerOpen(true);
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
              className="btn btn-primary"
              disabled={loading || !emailVerified}
            >
              {loading ? '⏳ Submitting...' : 'Submit Feedback'}
            </button>
          </>
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

export default ContactForm;