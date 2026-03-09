# React Grievance System - Complete Setup & Implementation Guide

## Quick Start (5 Minutes)

### Step 1: Create React App
```bash
npx create-react-app grievance-system
cd grievance-system
```

### Step 2: Install Dependencies
```bash
npm install axios react-router-dom emailjs-com zustand
```

### Step 3: Create .env File
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=service_7yf1tan
REACT_APP_EMAILJS_TEMPLATE_ID=template_v76jk6d
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 4: Start Development Server
```bash
npm start
```

---

## Complete File Directory Structure

```
grievance-system/
├── public/
│   ├── index.html
│   └── images/
│       └── wwf-logo.png
│
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.module.css
│   │   │
│   │   ├── GrievanceForm/
│   │   │   ├── GrievanceForm.jsx
│   │   │   ├── PoliciesDrawer.jsx
│   │   │   ├── ConfirmationModal.jsx
│   │   │   └── GrievanceForm.module.css
│   │   │
│   │   ├── Sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── CTASection.jsx
│   │   │   └── FooterSection.jsx
│   │   │
│   │   └── Common/
│   │       └── Spinner.jsx
│   │
│   ├── api/
│   │   ├── grievanceApi.js
│   │   └── emailService.js
│   │
│   ├── hooks/
│   │   ├── useGrievanceForm.js
│   │   └── useApi.js
│   │
│   ├── stores/
│   │   └── grievanceStore.js
│   │
│   ├── utils/
│   │   ├── validators.js
│   │   └── constants.js
│   │
│   ├── styles/
│   │   ├── grievance.css (copy from .NET project)
│   │   ├── sections.css (copy from .NET project)
│   │   └── index.css
│   │
│   ├── pages/
│   │   └── GrievancePage.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.jsx
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Features Preserved from .NET Application

✅ **Form Validation**
- Email validation with regex
- Phone number 10-digit validation
- Required field checking
- Description length validation
- Real-time error messages

✅ **Policies & Consent**
- Policies drawer modal
- Read full policies before acceptance
- Checkbox-based agreement
- Submit button disabled until acceptance

✅ **Confirmation Modal**
- Success message after submission
- Next steps information
- Email confirmation details
- Close button functionality

✅ **Email Integration**
- EmailJS integration
- Confirmation email to user
- Template-based emails
- Error handling

✅ **Dark Theme UI**
- Black background (#000)
- Orange accent color (#FF9316)
- Yellow highlights (#FFD700)
- Dark input fields (#1c1c1c)
- All original CSS styling

✅ **Responsive Design**
- Mobile-first approach
- Grid-based layouts
- Responsive forms
- Mobile menu support

✅ **Additional Sections**
- Hero section with WWF logo
- Testimonials carousel
- Call-to-action section
- Footer with links

✅ **State Management**
- Zustand for form state
- Centralized data store
- Easy state access across components

✅ **Accessibility**
- ARIA labels
- Keyboard navigation
- Focus management
- Error announcements

---

## Data Flow Architecture

```
User Input
    ↓
GrievanceForm Component
    ↓
useGrievanceForm Hook
    ↓
Form Validation (validators.js)
    ↓
Zustand Store (grievanceStore.js)
    ↓
Backend API (grievanceApi.js)
    ↓
Email Service (emailService.js)
    ↓
Confirmation Modal
    ↓
Success/Error Message
```

---

## API Integration Details

### Expected Backend Response

```json
{
  "success": true,
  "message": "Grievance submitted successfully",
  "data": {
    "id": 1,
    "createdAt": "2025-01-01T10:00:00Z"
  }
}
```

### Matching Field Names

The React form uses exact field names from .NET model:
- FullName
- Email
- Phone
- State
- Location
- GrievanceType
- Description
- AcceptPolicies

These match the C# GrievanceLead model properties exactly.

---

## Component Props & Usage

### GrievanceForm
```javascript
<GrievanceForm 
  policiesHtml={htmlContent}
/>
```

### HeroSection
```javascript
<HeroSection 
  title="Submit Your Grievance"
  tagline="We value your feedback..."
/>
```

### PoliciesDrawer
```javascript
<PoliciesDrawer
  isOpen={boolean}
  onClose={function}
  onAccept={function}
  policiesHtml={htmlContent}
/>
```

### ConfirmationModal
```javascript
<ConfirmationModal
  isOpen={boolean}
  onClose={function}
/>
```

---

## Styling Approach

### CSS Strategy
- CSS Modules for component-specific styles (GrievanceForm.module.css)
- Global CSS for shared styles (grievance.css, sections.css)
- Inline styles for dynamic theming
- CSS Grid for layouts
- Flexbox for alignment

### Color Palette
```javascript
const colors = {
  jetonOrange: '#FF9316',
  brandYellow: '#FFD700',
  brandDarkYellow: '#FFC700',
  brandWhite: '#fff',
  brandGrayDark: '#383838',
  fieldBg: '#1c1c1c',
  red: '#f63636'
};
```

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Form Validation Rules

```javascript
// Email validation
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation
10 digits only

// Description
Minimum 10 characters

// Required fields
All form fields are required
```

---

## State Management with Zustand

### Global Form State
```javascript
const formData = {
  FullName: '',
  Email: '',
  Phone: '',
  State: '',
  Location: '',
  GrievanceType: '',
  Description: '',
  AcceptPolicies: false
};
```

### Store Methods
- `setFormData(data)` - Update form data
- `setLoading(boolean)` - Toggle loading state
- `setError(error)` - Set error message
- `addGrievance(grievance)` - Add to grievances list
- `resetForm()` - Clear form data

---

## Environment Variables Configuration

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=key_xxxxx
```

### Getting EmailJS Credentials
1. Visit emailjs.com
2. Create account
3. Add email service
4. Create template
5. Copy IDs and public key

---

## Backend API Endpoints

### Submit Grievance
```
POST /api/grievance/submit
Content-Type: application/json

Request Body:
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
  "success": true,
  "message": "Grievance submitted successfully",
  "data": { /* grievance object */ }
}
```

### Get All Grievances (Optional)
```
GET /api/grievance/list

Response:
{
  "success": true,
  "data": [ /* array of grievances */ ]
}
```

### Get Single Grievance (Optional)
```
GET /api/grievance/{id}

Response:
{
  "success": true,
  "data": { /* grievance object */ }
}
```

---

## Error Handling Strategy

### Form Validation Errors
- Display inline under each field
- Clear on user input
- Specific error messages

### API Errors
- Display in banner above form
- Network error handling
- Server error handling
- Retry option

### Email Errors
- Log to console (non-blocking)
- Form still submits successfully
- User notified via email attempt indication

---

## Performance Optimizations

### Code Splitting
```javascript
const GrievancePage = lazy(() => import('./pages/GrievancePage'));
```

### Memoization
```javascript
const MemoizedComponent = React.memo(Component);
```

### Lazy Loading
- Load images on demand
- Load components when needed
- Async API calls

---

## Testing Strategy

### Unit Tests
```javascript
// Test validators
describe('validators', () => {
  test('validateEmail validates correct email', () => {
    expect(validateEmail('test@example.com')).toBe('');
  });
});
```

### Component Tests
```javascript
// Test form submission
test('form submits with valid data', () => {
  // Test implementation
});
```

---

## Deployment Checklist

- [ ] Set environment variables
- [ ] Run `npm run build`
- [ ] Test production build locally
- [ ] Update API URL for production
- [ ] Update EmailJS configuration
- [ ] Set up CORS on backend
- [ ] Deploy to hosting service
- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Set up monitoring/analytics

---

## Common Issues & Solutions

### Issue: EmailJS not working
**Solution:** 
- Verify environment variables
- Check EmailJS initialization
- Ensure service ID is correct
- Check template parameters match

### Issue: Form not submitting
**Solution:**
- Check API URL in .env
- Verify CORS headers on backend
- Check network tab in DevTools
- Verify request format

### Issue: Styles not loading
**Solution:**
- Ensure CSS files in src/styles/
- Check CSS imports in App.jsx
- Verify CSS Modules configuration
- Clear browser cache

### Issue: Validation not working
**Solution:**
- Check validator function logic
- Verify regex patterns
- Check field name mapping
- Test with console logs

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Production Build Commands

```bash
# Create optimized production build
npm run build

# Serve production build locally
npx serve -s build

# Analyze bundle size
npm install -g cra-bundle-analyzer
npm run build
cra-bundle-analyzer 'build/static/js/*.js'
```

---

## File Size Reference

- React app: ~50KB (minified)
- Dependencies: ~200KB
- Total bundle: ~250KB (gzipped: ~80KB)

---

## Next Steps

1. Copy all provided files to respective directories
2. Update .env with your credentials
3. Connect to backend API
4. Update EmailJS configuration
5. Test all features
6. Deploy to production

---

## Support & Documentation

- React Docs: https://react.dev
- Zustand: https://github.com/pmndrs/zustand
- Axios: https://axios-http.com
- EmailJS: https://www.emailjs.com

---

## Migration Notes from .NET

All properties from the original .NET application have been preserved:

| .NET Property | React State | Validation |
|---|---|---|
| Email | formData.Email | Email regex + required |
| FullName | formData.FullName | MaxLength 80 + required |
| Phone | formData.Phone | MaxLength 30 + required |
| State | formData.State | MaxLength 50 + required |
| Location | formData.Location | MaxLength 150 + required |
| GrievanceType | formData.GrievanceType | Required |
| Description | formData.Description | MaxLength 2000 + required |
| AcceptPolicies | formData.AcceptPolicies | Required |
| CreatedAt | Added on backend | Automatic |

All business logic and validations have been replicated in the React application.

