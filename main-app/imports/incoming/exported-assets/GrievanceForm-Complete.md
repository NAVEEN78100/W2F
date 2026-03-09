# Complete GrievanceForm Component (Main Form Implementation)

## File: src/components/GrievanceForm/GrievanceForm.jsx

```javascript
import React, { useState } from 'react';
import { useGrievanceForm } from '../../hooks/useGrievanceForm';
import { GRIEVANCE_TYPES, STATES } from '../../utils/constants';
import PoliciesDrawer from './PoliciesDrawer';
import ConfirmationModal from './ConfirmationModal';
import Spinner from '../Common/Spinner';
import styles from './GrievanceForm.module.css';

const GrievanceForm = ({ policiesHtml }) => {
  const { 
    formData, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleSubmit, 
    resetForm 
  } = useGrievanceForm();
  
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
    // Update form data
    const newFormData = { ...formData, AcceptPolicies: true };
    
    // Clear errors
    const newErrors = { ...errors };
    delete newErrors.AcceptPolicies;
    
    // Update checkbox in DOM
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
            <div 
              className={styles.statusMsg} 
              style={{ color: '#f54', marginBottom: '1rem' }}
            >
              {submitError}
            </div>
          )}

          <form onSubmit={onSubmit} id="grievanceForm">
            
            {/* ========== FULL NAME & PHONE ROW ========== */}
            <div className={styles.formRow}>
              
              {/* Full Name Field */}
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
                  required
                />
                {errors.FullName && (
                  <span className={styles.errorMessage}>
                    {errors.FullName}
                  </span>
                )}
              </div>

              {/* Phone Number Field */}
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
                  required
                />
                {errors.Phone && (
                  <span className={styles.errorMessage}>
                    {errors.Phone}
                  </span>
                )}
              </div>
            </div>

            {/* ========== EMAIL FIELD ========== */}
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
                required
              />
              {errors.Email && (
                <span className={styles.errorMessage}>
                  {errors.Email}
                </span>
              )}
            </div>

            {/* ========== STATE & LOCATION ROW ========== */}
            <div className={styles.formRow}>
              
              {/* State Field */}
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
                  required
                >
                  <option value="">Select a state</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.State && (
                  <span className={styles.errorMessage}>
                    {errors.State}
                  </span>
                )}
              </div>

              {/* Location Field */}
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
                  required
                />
                {errors.Location && (
                  <span className={styles.errorMessage}>
                    {errors.Location}
                  </span>
                )}
              </div>
            </div>

            {/* ========== GRIEVANCE TYPE FIELD ========== */}
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
                required
              >
                <option value="">Select grievance type</option>
                {GRIEVANCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.GrievanceType && (
                <span className={styles.errorMessage}>
                  {errors.GrievanceType}
                </span>
              )}
            </div>

            {/* ========== DESCRIPTION FIELD ========== */}
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
                required
              />
              {errors.Description && (
                <span className={styles.errorMessage}>
                  {errors.Description}
                </span>
              )}
              <small style={{ color: '#999' }}>
                {formData.Description.length}/2000
              </small>
            </div>

            {/* ========== POLICIES CHECKBOX ========== */}
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="acceptPolicies"
                name="AcceptPolicies"
                checked={formData.AcceptPolicies}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              <label htmlFor="acceptPolicies">
                I agree to the{' '}
                <button
                  type="button"
                  className={styles.policiesLink}
                  onClick={() => setShowPoliciesDrawer(true)}
                  disabled={isSubmitting}
                >
                  policies and terms
                </button>
              </label>
            </div>
            {errors.AcceptPolicies && (
              <span className={styles.errorMessage}>
                {errors.AcceptPolicies}
              </span>
            )}

            {/* ========== SUBMIT BUTTON ========== */}
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

      {/* ========== POLICIES DRAWER MODAL ========== */}
      <PoliciesDrawer
        isOpen={showPoliciesDrawer}
        onClose={() => setShowPoliciesDrawer(false)}
        onAccept={handleAcceptPolicies}
        policiesHtml={policiesHtml}
      />

      {/* ========== CONFIRMATION MODAL ========== */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </section>
  );
};

export default GrievanceForm;
```

---

## File: src/components/GrievanceForm/GrievanceForm.module.css

```css
/* ==========================================
   GRIEVANCE FORM SECTION STYLES
   ========================================== */

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

/* ==========================================
   FORM GROUP STYLES
   ========================================== */

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

/* ==========================================
   INPUT FIELD STYLES
   ========================================== */

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

input:disabled,
textarea:disabled,
select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

textarea {
  resize: vertical;
  min-height: 120px;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,147,22,0.8)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* ==========================================
   FORM ROW STYLES (2-COLUMN GRID)
   ========================================== */

.formRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

.formRow .formGroup {
  width: 100%;
}

/* ==========================================
   CHECKBOX STYLES
   ========================================== */

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
  flex-shrink: 0;
}

.checkboxGroup input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkboxGroup label {
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  color: #f4f4f4;
  font-weight: 500;
  margin: 0;
}

.policiesLink {
  background: none;
  border: none;
  color: #FF9316;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 700;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  transition: color 0.2s ease;
}

.policiesLink:hover {
  color: #FFD700;
}

.policiesLink:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* ==========================================
   BUTTON STYLES
   ========================================== */

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

.btnPrimary:hover:not(:disabled) {
  background: linear-gradient(90deg, #FF9316 40%, #FFC700 100%);
  box-shadow: 0 6px 32px rgba(255, 147, 22, 0.24);
  transform: translateY(-2px);
}

.btnPrimary:disabled {
  background: #444;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
  opacity: 0.7;
}

/* ==========================================
   ERROR MESSAGE STYLES
   ========================================== */

.errorMessage {
  display: block;
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.statusMsg {
  margin-top: 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #f54;
  padding: 1rem;
  background: rgba(255, 84, 84, 0.1);
  border-radius: 0.75rem;
  border-left: 4px solid #f54;
}

/* ==========================================
   DRAWER / MODAL BACKDROP
   ========================================== */

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 19999;
}

/* ==========================================
   POLICIES DRAWER STYLES
   ========================================== */

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
  flex-shrink: 0;
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
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.policiesDrawerClose:hover {
  color: #fff;
}

.policiesDrawerBody {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
}

.policiesDrawerBody h3,
.policiesDrawerBody h4 {
  color: #FF9316;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.policiesDrawerBody h3:first-child,
.policiesDrawerBody h4:first-child {
  margin-top: 0;
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
  flex-shrink: 0;
}

/* ==========================================
   CONFIRMATION MODAL STYLES
   ========================================== */

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
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.modalClose:hover {
  color: #333;
}

.modalBody {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.modalBody h4 {
  color: #FF9316;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.modalBody h4:first-child {
  margin-top: 0;
}

.modalBody ul {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

.modalBody li {
  margin-bottom: 0.5rem;
}

.modalFooter {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* ==========================================
   RESPONSIVE STYLES
   ========================================== */

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

  .formWrapper h2 {
    font-size: 1.5rem;
  }

  .btnPrimary {
    max-width: 100%;
  }

  .policiesDrawerBody,
  .policiesDrawerFooter {
    padding: 1.5rem;
  }

  .modalContent {
    width: 95%;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .grievanceForm {
    padding: 1.5rem 1rem;
  }

  .formWrapper {
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .formWrapper h2 {
    font-size: 1.3rem;
  }

  .checkboxGroup {
    gap: 0.75rem;
  }

  .checkboxGroup input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }

  .btnPrimary {
    font-size: 1rem;
    padding: 0.875rem 2rem;
  }
}
```

---

## File: src/pages/GrievancePage.jsx

```javascript
import React from 'react';
import HeroSection from '../components/Sections/HeroSection';
import GrievanceForm from '../components/GrievanceForm/GrievanceForm';
import TestimonialsSection from '../components/Sections/TestimonialsSection';
import CTASection from '../components/Sections/CTASection';
import FooterSection from '../components/Sections/FooterSection';

const GrievancePage = () => {
  const pageData = {
    heroTitle: 'Submit Your Grievance',
    heroTagline: 'We value your feedback and are committed to resolving any issues you may have. Please fill out the form below with detailed information about your concern.',
    policiesHtml: `
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
        <li>You allow us to share your case with relevant departments for investigation</li>
        <li>Grievances must be legitimate concerns; false claims will not be processed</li>
      </ul>
      <h4>Resolution Process:</h4>
      <ul>
        <li>Initial receipt acknowledgment within 24 hours</li>
        <li>Investigation period of 5-7 business days</li>
        <li>Resolution communication via email</li>
        <li>Appeal process available if dissatisfied</li>
      </ul>
    `
  };

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
```

---

## File: src/App.jsx

```javascript
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
```

---

## File: src/index.jsx

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## File: public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="WWF Grievance Management System - Submit and track your grievances"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Submit Your Grievance - WWF Grievance System</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

