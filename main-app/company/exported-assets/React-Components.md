## Complete React Component Files

### File: src/api/grievanceApi.js

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const grievanceApi = {
  submitGrievance: async (grievanceData) => {
    try {
      const response = await axios.post(`${API_URL}/grievance/submit`, grievanceData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit grievance' };
    }
  },

  getGrievances: async () => {
    try {
      const response = await axios.get(`${API_URL}/grievance/list`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch grievances' };
    }
  },

  getGrievanceById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/grievance/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch grievance' };
    }
  }
};

export default grievanceApi;
```

---

### File: src/api/emailService.js

```javascript
import emailjs from 'emailjs-com';

const initEmailJs = () => {
  emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
};

export const sendConfirmationEmail = async (grievanceData) => {
  try {
    initEmailJs();
    
    const templateParams = {
      to_name: grievanceData.FullName,
      email: grievanceData.Email,
      grievance_type: grievanceData.GrievanceType,
      phone: grievanceData.Phone,
      location: grievanceData.Location,
      description: grievanceData.Description
    };

    const response = await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
```

---

### File: src/hooks/useGrievanceForm.js

```javascript
import { useState } from 'react';
import { useGrievanceStore } from '../stores/grievanceStore';
import { validateForm } from '../utils/validators';
import grievanceApi from '../api/grievanceApi';
import { sendConfirmationEmail } from '../api/emailService';

export const useGrievanceForm = () => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, setFormData, resetForm, addGrievance } = useGrievanceStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!formData.AcceptPolicies) {
      setErrors({ AcceptPolicies: 'Please accept the policies' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Submit to backend
      const response = await grievanceApi.submitGrievance(formData);
      
      if (response.success) {
        // Send confirmation email
        try {
          await sendConfirmationEmail(formData);
        } catch (emailError) {
          console.error('Email sending failed but form was submitted:', emailError);
        }

        // Add to store
        addGrievance(response.data);
        resetForm();
        
        return { success: true, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to submit grievance';
      setErrors({ submit: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  };
};
```

---

### File: src/hooks/useApi.js

```javascript
import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await apiFunction();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
```

---

### File: src/stores/grievanceStore.js

```javascript
import { create } from 'zustand';

export const useGrievanceStore = create((set) => ({
  grievances: [],
  loading: false,
  error: null,
  formData: {
    FullName: '',
    Email: '',
    Phone: '',
    State: '',
    Location: '',
    GrievanceType: '',
    Description: '',
    AcceptPolicies: false
  },

  setFormData: (data) => set({ formData: data }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  addGrievance: (grievance) =>
    set((state) => ({
      grievances: [...state.grievances, grievance]
    })),

  resetForm: () =>
    set({
      formData: {
        FullName: '',
        Email: '',
        Phone: '',
        State: '',
        Location: '',
        GrievanceType: '',
        Description: '',
        AcceptPolicies: false
      },
      error: null
    })
}));
```

---

### File: src/utils/constants.js

```javascript
export const GRIEVANCE_TYPES = [
  'Wildlife Protection',
  'Marine Conservation',
  'Climate Action',
  'Habitat Destruction',
  'Illegal Poaching',
  'Pollution',
  'Other'
];

export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const COLORS = {
  jetonOrange: '#FF9316',
  brandYellow: '#FFD700',
  brandDarkYellow: '#FFC700',
  brandWhite: '#fff',
  brandGrayDark: '#383838',
  brandText: '#fff',
  fieldBg: '#1c1c1c',
  fieldBorder: '#232323',
  red: '#f63636'
};

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10}$/,
  minDescriptionLength: 10
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Phone number must be 10 digits',
  POLICIES_REQUIRED: 'Please accept the policies',
  DESCRIPTION_TOO_SHORT: 'Description must be at least 10 characters',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.'
};

export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Grievance submitted successfully!',
  EMAIL_SENT: 'Confirmation email sent successfully!'
};
```

---

### File: src/utils/validators.js

```javascript
import { VALIDATION_RULES, ERROR_MESSAGES } from './constants';

export const validateEmail = (email) => {
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_RULES.email.test(email)) return ERROR_MESSAGES.INVALID_EMAIL;
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_RULES.phone.test(phone.replace(/\D/g, ''))) {
    return ERROR_MESSAGES.INVALID_PHONE;
  }
  return '';
};

export const validateDescription = (description) => {
  if (!description) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (description.length < VALIDATION_RULES.minDescriptionLength) {
    return ERROR_MESSAGES.DESCRIPTION_TOO_SHORT;
  }
  return '';
};

export const validateRequiredField = (value, fieldName = 'This field') => {
  return !value ? `${fieldName} is required` : '';
};

export const validateForm = (formData) => {
  const errors = {};
  
  errors.FullName = validateRequiredField(formData.FullName, 'Full Name');
  errors.Email = validateEmail(formData.Email);
  errors.Phone = validatePhone(formData.Phone);
  errors.State = validateRequiredField(formData.State, 'State');
  errors.Location = validateRequiredField(formData.Location, 'Location');
  errors.GrievanceType = validateRequiredField(formData.GrievanceType, 'Grievance Type');
  errors.Description = validateDescription(formData.Description);

  return Object.fromEntries(
    Object.entries(errors).filter(([, value]) => value !== '')
  );
};
```

---

### File: src/components/Common/Spinner.jsx

```javascript
import React from 'react';

const Spinner = ({ size = 'md', color = '#FF9316' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} animate-spin`}>
      <div
        className="w-full h-full border-4 border-gray-300 border-t-current rounded-full"
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default Spinner;
```

---

### File: src/components/GrievanceForm/ConfirmationModal.jsx

```javascript
import React from 'react';
import styles from './GrievanceForm.module.css';

const ConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={onClose}
        style={{ display: isOpen ? 'block' : 'none' }}
      />
      <div
        className={styles.confirmationModal}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3>Success!</h3>
            <button
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className={styles.modalBody}>
            <h4>Thank you for submitting your grievance!</h4>
            <p>We've received your concern and a confirmation email has been sent to your email address.</p>
            <h5>Next Steps:</h5>
            <ul>
              <li>We will review your grievance within 5-7 business days</li>
              <li>You will receive updates via email</li>
              <li>Our team will contact you if additional information is needed</li>
              <li>For urgent matters, please contact us at grievance@wwf.com</li>
            </ul>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={styles.btnPrimary}
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
```

---

### File: src/components/GrievanceForm/PoliciesDrawer.jsx

```javascript
import React from 'react';
import styles from './GrievanceForm.module.css';

const PoliciesDrawer = ({ isOpen, onClose, onAccept, policiesHtml }) => {
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={onClose}
        style={{ display: isOpen ? 'block' : 'none' }}
      />
      <div
        className={styles.policiesDrawer}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div className={styles.policiesDrawerHeader}>
          <h3>Our Policies</h3>
          <button
            className={styles.policiesDrawerClose}
            onClick={onClose}
            aria-label="Close policies"
          >
            ✕
          </button>
        </div>
        <div className={styles.policiesDrawerBody}>
          <div dangerouslySetInnerHTML={{ __html: policiesHtml }} />
        </div>
        <div className={styles.policiesDrawerFooter}>
          <button
            className={styles.btnPrimary}
            onClick={onAccept}
          >
            I Accept
          </button>
        </div>
      </div>
    </>
  );
};

export default PoliciesDrawer;
```

---

### File: src/components/Layout/Header.jsx

```javascript
import React from 'react';

const Header = () => {
  return (
    <header style={{ padding: '1rem 2rem', background: '#f63636' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/images/wwf-logo.png" alt="WWF Logo" style={{ height: '50px' }} />
          <h1 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>
            WWF Grievance System
          </h1>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="mailto:grievance@wwf.com" style={{ color: '#fff', textDecoration: 'none' }}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
```

---

### File: src/components/Layout/Footer.jsx

```javascript
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#000', 
      color: '#fff', 
      padding: '2rem', 
      textAlign: 'center', 
      borderTop: '1px solid #333' 
    }}>
      <p>© 2025 World Wildlife Fund. All rights reserved.</p>
      <p>Dedicated to protecting wildlife and their habitats worldwide.</p>
      <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#FF9316' }}>
        Made by BINI
      </p>
    </footer>
  );
};

export default Footer;
```

---

### File: src/components/Layout/Layout.jsx

```javascript
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
```

---

### File: src/components/Sections/HeroSection.jsx

```javascript
import React from 'react';

const HeroSection = ({ title, tagline }) => {
  return (
    <section className="jeton-orange-header">
      <div className="logo-container">
        <img src="/images/wwf-logo.png" alt="WWF Logo" className="wwf-logo" />
      </div>
      <div className="hero">
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
    </section>
  );
};

export default HeroSection;
```

---

### File: src/components/Sections/TestimonialsSection.jsx

```javascript
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'John Smith',
      role: 'Environmental Advocate',
      text: 'WWF grievance system is incredibly responsive and effective. My concerns were addressed promptly.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=john'
    },
    {
      name: 'Sarah Johnson',
      role: 'Conservation Officer',
      text: 'The streamlined process makes it easy to report issues. Highly recommend for anyone concerned about wildlife.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      name: 'Michael Chen',
      role: 'Wildlife Researcher',
      text: 'Professional handling and comprehensive follow-up. This is how grievance systems should work.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=michael'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-bg-overlay" />
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Users Say</h2>
          <p>Join thousands of satisfied users who trust WWF with their concerns</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className="testimonial-body">
                  <div className="quote-icon">💬</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-footer">
                    <div className="testimonial-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Grievances Resolved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
```

---

### File: src/components/Sections/CTASection.jsx

```javascript
import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            <span className="cta-line-1">1 million users,</span>
            <span className="cta-line-2">plus you.</span>
          </h2>
          <p className="cta-subtitle">
            It only takes a few seconds to get started. Join our community of concerned citizens.
          </p>
          <div className="cta-buttons">
            <a href="#" className="app-download-btn">
              <span className="app-btn-text">
                <span className="app-btn-small">Download on the</span>
                <span className="app-btn-large">App Store</span>
              </span>
            </a>
            <a href="#" className="app-download-btn">
              <span className="app-btn-text">
                <span className="app-btn-small">Get it on</span>
                <span className="app-btn-large">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
```

---

### File: src/components/Sections/FooterSection.jsx

```javascript
import React, { useState } from 'react';

const FooterSection = () => {
  const [expandedDevice, setExpandedDevice] = useState(null);

  const footerLinks = {
    'Wildlife Protection': [
      'Endangered Species',
      'Habitat Conservation',
      'Global Initiative'
    ],
    'Marine Conservation': [
      'Ocean Protection',
      'Marine Biodiversity',
      'Ocean Initiative'
    ],
    'Climate Action': [
      'Sustainability',
      'Climate Solutions',
      'Environmental Advocacy'
    ],
    'About Us': ['Our Mission', 'Team', 'History'],
    'Contact': ['Support', 'Careers', 'Press']
  };

  const devices = ['iOS', 'Android', 'Web'];

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-devices">
          <div className="device-accordion">
            {devices.map((device) => (
              <div key={device} className="device-item">
                <div
                  className="device-header"
                  onClick={() =>
                    setExpandedDevice(
                      expandedDevice === device ? null : device
                    )
                  }
                >
                  <span className="device-name">{device}</span>
                  <span className="device-icon">
                    {expandedDevice === device ? '−' : '+'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-links-grid">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-column">
              <h3 className="footer-heading">{category}</h3>
              <div className="footer-links">
                {links.map((link) => (
                  <a key={link} href="#" className="footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-certifications">
            <p>© 2025 | World Wildlife Fund</p>
          </div>
          <p style={{ color: '#f97316' }}>Made by BINI</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
```

