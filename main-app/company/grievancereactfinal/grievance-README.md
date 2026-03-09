# Grievance Page - React Application

This is a complete React conversion of your .NET grievance page with all the same functionality, UI, and styling.

## Project Structure

```
grievance-react-app/
├── public/
│   ├── index.html
│   ├── wwf-logo.jpg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── GrievancePage.js         # Main page component
│   │   ├── HeaderSection.js         # Header with logo and hero
│   │   ├── GrievanceForm.js         # Main grievance form
│   │   ├── PoliciesDrawer.js        # Full-screen policies drawer
│   │   ├── ConfirmationModal.js     # Success confirmation modal
│   │   ├── CTASection.js            # Call-to-action section
│   │   └── FooterSection.js         # Footer and WWF section
│   ├── data/
│   │   └── grievance-data.js        # Form data and policies
│   ├── styles/
│   │   ├── grievance.css            # Main grievance page styles
│   │   └── sections.css             # Section styles (CTA, Footer, WWF)
│   ├── App.js                       # Root component
│   ├── index.js                     # React entry point
│   └── index.css                    # Global styles
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## Features

### ✅ All Features from .NET Version:

1. **Header Section**
   - WWF Logo display
   - "Submit Your Grievance" title
   - Tagline text

2. **Grievance Form**
   - Full Name field (max 80 chars)
   - Email field (max 100 chars, validation)
   - Phone Number field (max 30 chars)
   - State dropdown (28 Indian states)
   - Location field (max 150 chars)
   - Grievance Type dropdown (5 types)
   - Description textarea (max 2000 chars)
   - Policies acceptance checkbox
   - Form validation with error messages
   - Submit button with loading state

3. **Policies Drawer**
   - Full-screen overlay with policies content
   - 8 comprehensive grievance policies
   - Accept button to confirm policies
   - Orange header with close button
   - Scrollable content area

4. **Confirmation Modal**
   - Success message display
   - Next steps information
   - OK button to close

5. **CTA Section**
   - "1 million users, plus you" heading
   - App Store and Google Play buttons

6. **Footer Section**
   - 5-column footer links
   - Social media icons
   - ISO certification badge
   - WWF section with large logo
   - 3 conservation cards (Wildlife, Marine, Climate)
   - Footer text

7. **Email Integration**
   - EmailJS for sending grievances to admin
   - EmailJS for sending confirmation emails to users
   - Pre-configured credentials included

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Images

Create the following folder structure:

```
public/
├── wwf-logo.jpg
└── favicon.ico
```

### 3. EmailJS Configuration

The app uses EmailJS for sending emails. The credentials are already configured:

- Service ID: `service_7yf1tan`
- Template ID: `template_lphthdk`
- Confirmation Template ID: `template_v76jk6d`
- User ID: `NKqMo7yjfTsoYYysu`

**If you want to use your own EmailJS account:**

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email templates
3. Update credentials in `src/components/GrievanceForm.js`

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

## Key Features Implemented

### Form Validation
- ✅ Full Name required (max 80 chars)
- ✅ Valid email format required (max 100 chars)
- ✅ Phone number required (max 30 chars)
- ✅ State selection required (max 50 chars)
- ✅ Location required (max 150 chars)
- ✅ Grievance type required
- ✅ Description required (max 2000 chars)
- ✅ Policies acceptance required

### Form Fields
- ✅ 2-column layout for Name, Email, Phone, State
- ✅ Full-width Location, Type, Description fields
- ✅ Proper input types (text, email, tel, select, textarea)
- ✅ Placeholder texts
- ✅ Character count limits
- ✅ Required field indicators (*)

### Modal & Drawer
- ✅ Policies drawer (full-screen, orange header)
- ✅ Confirmation modal after submission
- ✅ Backdrop overlay
- ✅ Close buttons (X)
- ✅ Smooth animations
- ✅ Keyboard escape support

### Styling
- ✅ Dark theme (black background)
- ✅ Orange accent color (#FF9316)
- ✅ Yellow highlights (#FFD700)
- ✅ Modern gradient buttons
- ✅ Responsive design
- ✅ All original CSS preserved

### Email Integration
- ✅ Grievance submission to admin email
- ✅ Confirmation email to user
- ✅ EmailJS integration
- ✅ Error handling
- ✅ Loading states

## File Mapping from .NET to React

| .NET File | React File | Purpose |
|-----------|------------|---------|
| GrievanceController.cs | GrievanceForm.js + grievance-data.js | Form logic and submission |
| GrievanceLead.cs | grievance-data.js | Data model |
| Index.cshtml | GrievancePage.js + HeaderSection.js | Main page layout |
| grievance.js | GrievanceForm.js + PoliciesDrawer.js | Form interactions |
| grievance.css | styles/grievance.css | Main styles |
| sections.css | styles/sections.css | Section styles |
| FooterSection.cshtml | FooterSection.js | Footer component |
| CTASection.cshtml | CTASection.js | CTA component |

## Troubleshooting

### Form Not Submitting?
- Check all required fields are filled
- Verify Policies checkbox is checked
- Check browser console for EmailJS errors
- Ensure EmailJS credentials are correct

### Emails Not Sending?
- Verify EmailJS credentials
- Check template IDs in GrievanceForm.js
- Ensure email templates exist in EmailJS account
- Check browser console for errors

### Styles Not Applying?
- Clear browser cache
- Check CSS import paths in App.js
- Verify CSS files are in src/styles/ folder
- Check that CSS filenames match imports

### Form Fields Not Displaying?
- Check component props are being passed correctly
- Verify state is being managed properly
- Check React DevTools for component state

## State Management

The app uses React hooks (useState, useEffect) for state management:

- **formData**: Tracks all form input values
- **errors**: Array of validation errors
- **isSubmitting**: Loading state during submission
- **formMessage**: Success/error message display
- **showPoliciesDrawer**: Policies drawer visibility
- **showConfirmationModal**: Confirmation modal visibility

## Responsive Design

The form is fully responsive:

- **Desktop**: 2-column grid for Name/Email, Phone/State
- **Tablet**: 1-column layout starting at 768px
- **Mobile**: Full-width inputs, adjusted spacing

## Components Breakdown

### GrievancePage.js
- Main container component
- Manages modal and drawer state
- Coordinates between child components

### HeaderSection.js
- Displays WWF logo
- Shows hero title and tagline
- Orange background header

### GrievanceForm.js
- Complete form with all fields
- Form validation logic
- EmailJS integration
- Error/success message handling

### PoliciesDrawer.js
- Full-screen policies display
- Accept button functionality
- Backdrop overlay
- Keyboard support

### ConfirmationModal.js
- Success message display
- Next steps information
- Modal interaction

### CTASection.js
- App download section
- App Store and Google Play buttons
- Responsive button layout

### FooterSection.js
- Footer links (5 columns)
- Social media icons
- WWF section with logo
- 3 conservation cards

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Customization

### Change Form Fields
Edit `src/data/grievance-data.js` to modify:
- Grievance types
- States list
- Policies content
- Hero text

### Change Styles
Edit `src/styles/grievance.css` to customize appearance

### Change EmailJS Settings
Edit `src/components/GrievanceForm.js` to update credentials

## Deployment

### Deploy to Vercel
1. Push to GitHub
2. Connect to Vercel
3. Deploy with one click

### Deploy to Netlify
1. Build: `npm run build`
2. Drag and drop `build/` folder to Netlify

## Support

For issues or questions, please contact the development team.

---

**All Features Implemented Successfully! 🎉**

Your React grievance page is now complete with all the same functionality as your .NET version.
