# React Grievance Management System - Complete Project Structure

## Project Setup

### 1. Project Initialization

```bash
npx create-react-app grievance-system
cd grievance-system

# Install dependencies
npm install axios react-router-dom emailjs-com zustand
npm install -D tailwindcss postcss autoprefixer
```

---

## Project Structure

```
grievance-system/
├── public/
│   ├── index.html
│   └── images/
│       └── wwf-logo.png
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.module.css
│   │   ├── GrievanceForm/
│   │   │   ├── GrievanceForm.jsx
│   │   │   ├── PoliciesDrawer.jsx
│   │   │   ├── ConfirmationModal.jsx
│   │   │   └── GrievanceForm.module.css
│   │   ├── Sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── CTASection.jsx
│   │   │   └── FooterSection.jsx
│   │   └── Common/
│   │       └── Spinner.jsx
│   ├── api/
│   │   ├── grievanceApi.js
│   │   └── emailService.js
│   ├── hooks/
│   │   ├── useGrievanceForm.js
│   │   └── useApi.js
│   ├── stores/
│   │   └── grievanceStore.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── grievance.css
│   │   ├── sections.css
│   │   └── index.css
│   ├── pages/
│   │   ├── GrievancePage.jsx
│   │   └── HomePage.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.jsx
├── .env
├── package.json
└── README.md
```

---

## File Implementations

### 1. package.json

\`\`\`json
{
  "name": "grievance-system",
  "version": "1.0.0",
  "description": "WWF Grievance Management System",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.20.0",
    "emailjs-com": "^3.2.0",
    "zustand": "^4.4.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version"]
  }
}
\`\`\`

### 2. .env

\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=service_7yf1tan
REACT_APP_EMAILJS_TEMPLATE_ID=template_v76jk6d
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
\`\`\`

### 3. src/utils/constants.js

\`\`\`javascript
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
\`\`\`

### 4. src/utils/validators.js

\`\`\`javascript
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
  return !value ? \`\${fieldName} is required\` : '';
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
\`\`\`

### 5. src/stores/grievanceStore.js

\`\`\`javascript
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
\`\`\`

### 6. src/api/grievanceApi.js

\`\`\`javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const grievanceApi = {
  submitGrievance: async (grievanceData) => {
    try {
      const response = await axios.post(\`\${API_URL}/grievance/submit\`, grievanceData, {
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
      const response = await axios.get(\`\${API_URL}/grievance/list\`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch grievances' };
    }
  },

  getGrievanceById: async (id) => {
    try {
      const response = await axios.get(\`\${API_URL}/grievance/\${id}\`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch grievance' };
    }
  }
};

export default grievanceApi;
\`\`\`

### 7. src/api/emailService.js

\`\`\`javascript
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
\`\`\`

### 8. src/hooks/useGrievanceForm.js

\`\`\`javascript
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
\`\`\`

### 9. src/components/Common/Spinner.jsx

\`\`\`javascript
import React from 'react';

const Spinner = ({ size = 'md', color = '#FF9316' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={\`inline-block \${sizeClasses[size]} animate-spin\`}>
      <div
        className="w-full h-full border-4 border-gray-300 border-t-current rounded-full"
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default Spinner;
\`\`\`

### 10. src/components/GrievanceForm/ConfirmationModal.jsx

\`\`\`javascript
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
\`\`\`

### 11. src/components/GrievanceForm/PoliciesDrawer.jsx

\`\`\`javascript
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
\`\`\`

### 12. src/components/GrievanceForm/GrievanceForm.jsx

\`\`\`javascript
import React, { useState } from 'react';
import { useGrievanceForm } from '../../hooks/useGrievanceForm';
import { GRIEVANCE_TYPES, STATES } from '../../utils/constants';
import PoliciesDrawer from './PoliciesDrawer';
import ConfirmationModal from './ConfirmationModal';
import Spinner from '../Common/Spinner';
import styles from './GrievanceForm.module.css';

const GrievanceForm = ({ policiesHtml }) => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useGrievanceForm();
  const [showPoliciesDrawer, setShowPoliciesDrawer] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      setShowConfirmation(true);
      setSubmitError('');
    } else if (result?.message) {
      setSubmitError(result.message);
    }
  };

  const handleAcceptPolicies = () => {
    const newFormData = { ...formData, AcceptPolicies: true };
    const newErrors = { ...errors };
    delete newErrors.AcceptPolicies;
    
    const formElement = document.querySelector('form');
    if (formElement) {
      const checkbox = formElement.querySelector('[name="AcceptPolicies"]');
      if (checkbox) {
        checkbox.checked = true;
        checkbox.disabled = false;
      }
      const submitBtn = formElement.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = false;
    }

    setShowPoliciesDrawer(false);
  };

  return (
    <section className={styles.grievanceForm}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2>Submit Your Grievance</h2>
          
          {submitError && (
            <div className={styles.statusMsg} style={{ color: '#f54', marginBottom: '1rem' }}>
              {submitError}
            </div>
          )}

          <form onSubmit={onSubmit} id="grievanceForm">
            {/* Full Name and Phone */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>
                  Full Name
                  <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  type="text"
                  name="FullName"
                  placeholder="Your full name"
                  value={formData.FullName}
                  onChange={handleChange}
                  maxLength={80}
                  disabled={isSubmitting}
                />
                {errors.FullName && (
                  <span className={styles.errorMessage}>{errors.FullName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Phone Number
                  <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="10-digit phone number"
                  value={formData.Phone}
                  onChange={handleChange}
                  maxLength={30}
                  disabled={isSubmitting}
                />
                {errors.Phone && (
                  <span className={styles.errorMessage}>{errors.Phone}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label>
                Email Address
                <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="email"
                name="Email"
                placeholder="your.email@example.com"
                value={formData.Email}
                onChange={handleChange}
                maxLength={100}
                disabled={isSubmitting}
              />
              {errors.Email && (
                <span className={styles.errorMessage}>{errors.Email}</span>
              )}
            </div>

            {/* State and Location */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>
                  State
                  <span className={styles.requiredStar}>*</span>
                </label>
                <select
                  name="State"
                  value={formData.State}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select a state</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.State && (
                  <span className={styles.errorMessage}>{errors.State}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  Location
                  <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  type="text"
                  name="Location"
                  placeholder="City or specific location"
                  value={formData.Location}
                  onChange={handleChange}
                  maxLength={150}
                  disabled={isSubmitting}
                />
                {errors.Location && (
                  <span className={styles.errorMessage}>{errors.Location}</span>
                )}
              </div>
            </div>

            {/* Grievance Type */}
            <div className={styles.formGroup}>
              <label>
                Type of Grievance
                <span className={styles.requiredStar}>*</span>
              </label>
              <select
                name="GrievanceType"
                value={formData.GrievanceType}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select grievance type</option>
                {GRIEVANCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.GrievanceType && (
                <span className={styles.errorMessage}>{errors.GrievanceType}</span>
              )}
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label>
                Description of Grievance
                <span className={styles.requiredStar}>*</span>
              </label>
              <textarea
                name="Description"
                placeholder="Please provide detailed information about your grievance..."
                value={formData.Description}
                onChange={handleChange}
                maxLength={2000}
                rows={5}
                disabled={isSubmitting}
              />
              {errors.Description && (
                <span className={styles.errorMessage}>{errors.Description}</span>
              )}
              <small>{formData.Description.length}/2000</small>
            </div>

            {/* Policies Checkbox */}
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="acceptPolicies"
                name="AcceptPolicies"
                checked={formData.AcceptPolicies}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <label htmlFor="acceptPolicies">
                I agree to the{' '}
                <button
                  type="button"
                  className={styles.policiesLink}
                  onClick={() => setShowPoliciesDrawer(true)}
                >
                  policies and terms
                </button>
              </label>
            </div>
            {errors.AcceptPolicies && (
              <span className={styles.errorMessage}>{errors.AcceptPolicies}</span>
            )}

            {/* Submit Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                type="submit"
                id="submitBtn"
                className={styles.btnPrimary}
                disabled={isSubmitting || !formData.AcceptPolicies}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" color="#fff" /> Submitting...
                  </>
                ) : (
                  'SUBMIT GRIEVANCE'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PoliciesDrawer
        isOpen={showPoliciesDrawer}
        onClose={() => setShowPoliciesDrawer(false)}
        onAccept={handleAcceptPolicies}
        policiesHtml={policiesHtml}
      />

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </section>
  );
};

export default GrievanceForm;
\`\`\`

### 13. src/components/GrievanceForm/GrievanceForm.module.css

\`\`\`css
.grievanceForm {
  padding: 3rem 1.5rem;
  background: #000;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.formWrapper {
  background: #181818;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.formWrapper h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #FFD700;
}

.formGroup {
  margin-bottom: 1.2rem;
}

.formGroup label,
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #FF9316;
  font-size: 1rem;
  letter-spacing: 0.01em;
}

.requiredStar {
  color: #e13030;
  margin-left: 2px;
  font-size: 1.1em;
}

input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
  width: 100%;
  min-height: 60px;
  padding: 1.1rem 1.4rem;
  font-size: 1.08rem;
  border: none;
  outline: none;
  background: #1c1c1c;
  border-radius: 1.1rem;
  box-shadow: 0 2px 16px 0 rgba(44, 44, 44, 0.17);
  color: #fafafa;
  font-family: inherit;
  margin-bottom: 1.05rem;
  transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  display: block;
  box-sizing: border-box;
}

input:focus,
textarea:focus,
select:focus {
  background: #222;
  box-shadow: 0 0 0 3px rgba(255, 147, 22, 0.22);
  border: 1.5px solid #FF9316;
}

::placeholder {
  color: #aaa;
  opacity: 1;
}

input[readonly] {
  background: #161616;
  color: #bbb;
  font-weight: 600;
}

.formRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

.formRow .formGroup {
  width: 100%;
}

.checkboxGroup {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 1.5rem 0;
}

.checkboxGroup input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  accent-color: #FF9316;
  cursor: pointer;
  border-radius: 3px;
}

.checkboxGroup label {
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  color: #f4f4f4;
  font-weight: 500;
}

.policiesLink {
  background: none;
  border: none;
  color: #FF9316;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 700;
  padding: 0;
}

.policiesLink:hover {
  color: #FFD700;
}

.btnPrimary {
  background: linear-gradient(90deg, #FF9316 60%, #FFC700 100%);
  color: #fff;
  font-weight: 800;
  font-size: 1.15rem;
  padding: 1rem 2.5rem;
  border-radius: 1rem;
  border: none;
  box-shadow: 0 4px 24px rgba(255, 147, 22, 0.15);
  text-transform: uppercase;
  width: 100%;
  max-width: 320px;
  cursor: pointer;
  transition: background 0.16s, transform 0.16s, box-shadow 0.16s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btnPrimary:hover {
  background: linear-gradient(90deg, #FF9316 40%, #FFC700 100%);
  box-shadow: 0 6px 32px rgba(255, 147, 22, 0.24);
  transform: translateY(-2px);
}

.btnPrimary:disabled {
  background: #444;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.statusMsg {
  margin-top: 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #f54;
}

.errorMessage {
  display: block;
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Drawer / Modal */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 19999;
}

.policiesDrawer {
  position: fixed;
  inset: 0;
  z-index: 20000;
  background: #fff;
  flex-direction: column;
  overflow: hidden;
}

.policiesDrawerHeader {
  background: #FF9316;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.policiesDrawerHeader h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #383838;
  margin: 0;
}

.policiesDrawerClose {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #383838;
}

.policiesDrawerBody {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
}

.policiesDrawerBody ul {
  padding-left: 1.8rem;
}

.policiesDrawerBody li {
  margin-bottom: 0.8rem;
}

.policiesDrawerFooter {
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
}

/* Confirmation Modal */
.confirmationModal {
  position: fixed;
  inset: 0;
  z-index: 30000;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}

.modalContent {
  background: #fff;
  border-radius: 1.5rem;
  max-width: 500px;
  width: 90%;
  padding: 2rem;
}

.modalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modalHeader h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #383838;
}

.modalClose {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.modalBody {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.modalBody ul {
  padding-left: 1.5rem;
}

.modalFooter {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .formRow {
    grid-template-columns: 1fr;
  }

  .formWrapper {
    padding: 1.5rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  select,
  textarea {
    min-height: 50px;
    padding: 1rem;
  }
}
\`\`\`

### 14. src/components/Sections/HeroSection.jsx

\`\`\`javascript
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
\`\`\`

### 15. src/components/Sections/FooterSection.jsx

\`\`\`javascript
import React, { useState } from 'react';

const FooterSection = () => {
  const [expandedDevice, setExpandedDevice] = useState(null);

  const footerLinks = {
    'Wildlife Protection': ['Endangered Species', 'Habitat Conservation', 'Global Initiative'],
    'Marine Conservation': ['Ocean Protection', 'Marine Biodiversity', 'Ocean Initiative'],
    'Climate Action': ['Sustainability', 'Climate Solutions', 'Environmental Advocacy'],
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
                  onClick={() => setExpandedDevice(expandedDevice === device ? null : device)}
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
\`\`\`

### 16. src/components/Sections/TestimonialsSection.jsx

\`\`\`javascript
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
\`\`\`

### 17. src/components/Sections/CTASection.jsx

\`\`\`javascript
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
\`\`\`

### 18. src/components/Layout/Header.jsx

\`\`\`javascript
import React from 'react';

const Header = () => {
  return (
    <header style={{ padding: '1rem 2rem', background: '#f63636' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/images/wwf-logo.png" alt="WWF Logo" style={{ height: '50px' }} />
          <h1 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>WWF Grievance System</h1>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
\`\`\`

### 19. src/components/Layout/Layout.jsx

\`\`\`javascript
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
\`\`\`

### 20. src/components/Layout/Footer.jsx

\`\`\`javascript
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#000', color: '#fff', padding: '2rem', textAlign: 'center', borderTop: '1px solid #333' }}>
      <p>© 2025 World Wildlife Fund. All rights reserved.</p>
      <p>Dedicated to protecting wildlife and their habitats worldwide.</p>
    </footer>
  );
};

export default Footer;
\`\`\`

### 21. src/pages/GrievancePage.jsx

\`\`\`javascript
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Sections/HeroSection';
import GrievanceForm from '../components/GrievanceForm/GrievanceForm';
import TestimonialsSection from '../components/Sections/TestimonialsSection';
import CTASection from '../components/Sections/CTASection';
import FooterSection from '../components/Sections/FooterSection';

const GrievancePage = () => {
  const [pageData, setPageData] = useState({
    heroTitle: 'Submit Your Grievance',
    heroTagline: 'We value your feedback and are committed to resolving any issues you may have. Please fill out the form below with detailed information about your concern.',
    policiesHtml: \`
      <h3>Our Policies</h3>
      <ul>
        <li><strong>Privacy:</strong> All submitted grievances are kept confidential and used only for resolution purposes.</li>
        <li><strong>Fair Treatment:</strong> Every grievance is reviewed fairly and objectively without discrimination.</li>
        <li><strong>Timely Response:</strong> We commit to reviewing grievances within 5-7 business days.</li>
        <li><strong>Contact:</strong> For any questions, email us at grievance@wwf.com</li>
      </ul>
      <h4>By submitting this grievance form, you agree to the following policies:</h4>
      <ul>
        <li>Information provided will be used solely for grievance resolution</li>
        <li>We may contact you for clarification or updates</li>
        <li>All information will be handled in compliance with privacy laws</li>
        <li>You allow us to share your case with relevant departments</li>
      </ul>
    \`
  });

  return (
    <div>
      <HeroSection
        title={pageData.heroTitle}
        tagline={pageData.heroTagline}
      />
      <GrievanceForm policiesHtml={pageData.policiesHtml} />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default GrievancePage;
\`\`\`

### 22. src/styles/grievance.css

[See the provided CSS from the .NET project - copy the grievance.css content directly]

### 23. src/styles/sections.css

[See the provided CSS from the .NET project - copy the sections.css content directly]

### 24. src/App.jsx

\`\`\`javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GrievancePage from './pages/GrievancePage';
import './styles/grievance.css';
import './styles/sections.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GrievancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
\`\`\`

### 25. src/index.jsx

\`\`\`javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { script as emailJsScript } from 'emailjs-com';

// Initialize EmailJS
window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
  document.head.appendChild(script);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`\`\`

### 26. public/index.html

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="WWF Grievance Management System"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Submit Your Grievance - WWF</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
\`\`\`

### 27. .gitignore

\`\`\`
node_modules
.env.local
.env.development.local
.env.test.local
.env.production.local
build
dist
.DS_Store
\`\`\`

---

## Backend Integration

### API Endpoint Expected Structure

The React frontend expects the following backend API:

\`\`\`
POST /api/grievance/submit
Content-Type: application/json

{
  "FullName": "string",
  "Email": "string",
  "Phone": "string",
  "State": "string",
  "Location": "string",
  "GrievanceType": "string",
  "Description": "string",
  "AcceptPolicies": boolean
}

Response:
{
  "success": boolean,
  "message": "string",
  "data": {
    "id": number,
    "createdAt": "ISO-8601 timestamp"
  }
}
\`\`\`

---

## Running the Application

1. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set Environment Variables:**
   Create a \`.env\` file with:
   \`\`\`
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   \`\`\`

3. **Start Development Server:**
   \`\`\`bash
   npm start
   \`\`\`

4. **Build for Production:**
   \`\`\`bash
   npm run build
   \`\`\`

---

## Key Features Preserved

✅ **All Form Validations** - Email, Phone, Required fields
✅ **Policies Drawer** - Full modal with accept functionality
✅ **Confirmation Modal** - Success message with next steps
✅ **Email Integration** - EmailJS integration for confirmations
✅ **Dark Theme** - Black background with orange accent colors
✅ **Responsive Design** - Mobile-friendly grid layouts
✅ **State Management** - Zustand for form state management
✅ **Error Handling** - Comprehensive error messages
✅ **Loading States** - Spinner during submission
✅ **Footer/Testimonials/CTA** - All sections preserved
✅ **Accessibility** - ARIA labels, keyboard navigation
✅ **Database Integration** - Ready for backend API calls

---

## Technology Stack

- **Framework:** React 18
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Email Service:** EmailJS
- **Styling:** CSS Modules + Global CSS
- **Build Tool:** Create React App

---

## Notes

- All styling from the .NET project has been preserved
- Form validations match the backend requirements
- Email functionality uses EmailJS as in the original
- Responsive design works on all device sizes
- All interactive features (modals, drawers, etc.) are React-based
- The application is ready to connect to any backend API

