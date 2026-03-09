# React Grievance Page - Complete Setup Guide

## Step-by-Step Setup Instructions

### Step 1: Create React App

```bash
npx create-react-app grievance-react-app
cd grievance-react-app
```

### Step 2: Install Dependencies

```bash
npm install emailjs-com axios
```

### Step 3: Create Folder Structure

```bash
# Inside src/
mkdir components
mkdir data
mkdir styles
```

### Step 4: Project Structure

```
grievance-react-app/
├── public/
│   ├── index.html                   (replace existing)
│   ├── wwf-logo.jpg                 (copy your logo)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── GrievancePage.js
│   │   ├── HeaderSection.js
│   │   ├── GrievanceForm.js
│   │   ├── PoliciesDrawer.js
│   │   ├── ConfirmationModal.js
│   │   ├── CTASection.js
│   │   └── FooterSection.js
│   ├── data/
│   │   └── grievance-data.js
│   ├── styles/
│   │   ├── grievance.css
│   │   └── sections.css
│   ├── App.js                       (replace existing)
│   ├── index.js                     (replace existing)
│   └── index.css                    (replace existing)
├── package.json                     (update with dependencies)
└── README.md
```

### Step 5: Copy All Files

**Root Files:**
- package.json → root folder

**Public Files:**
- index.html → public/index.html

**Source Files:**
- index.js → src/index.js
- index.css → src/index.css
- App.js → src/App.js

**Components (in src/components/):**
- GrievancePage.js
- HeaderSection.js
- GrievanceForm.js
- PoliciesDrawer.js
- ConfirmationModal.js
- CTASection.js
- FooterSection.js

**Data (in src/data/):**
- grievance-data.js

**Styles (in src/styles/):**
- grievance.css
- sections.css

### Step 6: Add Images

Place your images in `public/`:
- wwf-logo.jpg (62px height recommended)

### Step 7: Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 8: Build for Production

```bash
npm run build
```

## Form Fields Explanation

### Required Fields:
1. **Full Name** - Maximum 80 characters
2. **Email** - Valid email format required, max 100 characters
3. **Phone Number** - Maximum 30 characters
4. **State** - Select from 28 Indian states
5. **Location** - City or area, maximum 150 characters
6. **Grievance Type** - Select from 5 predefined types
7. **Description** - Detailed description, maximum 2000 characters
8. **Accept Policies** - Checkbox must be checked

### Grievance Types:
- Environmental Concern
- Wildlife Protection
- Conservation Program
- Administrative Issue
- Other

### States Available:
- All 28 Indian states including Union territories

## EmailJS Configuration

### Pre-configured Credentials:
- Service ID: `service_7yf1tan`
- Template ID: `template_lphthdk`
- Confirmation Template: `template_v76jk6d`
- User ID: `NKqMo7yjfTsoYYysu`

### Using Your Own Credentials:

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email templates
3. Update in `src/components/GrievanceForm.js`:

```javascript
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_CONFIRMATION_TEMPLATE_ID = "your_confirmation_template_id";
const EMAILJS_USER_ID = "your_user_id";
```

## Form Validation Rules

✅ Full Name: Required, alphanumeric + spaces, max 80 chars
✅ Email: Valid format, max 100 chars
✅ Phone: Any format, max 30 chars
✅ State: Required, max 50 chars
✅ Location: Required, max 150 chars
✅ Grievance Type: Required, must select one
✅ Description: Required, max 2000 chars
✅ Policies: Must be checked before submission

## Styling Customization

### Theme Colors (in src/styles/grievance.css):
- **Primary Orange**: #FF9316
- **Yellow Accent**: #FFD700
- **Background**: #000 (Black)
- **Field Background**: #1c1c1c (Dark gray)

### Edit Variables in :root
```css
--jeton-orange: #FF9316;
--brand-yellow: #FFD700;
--brand-white: #fff;
--brand-gray-dark: #383838;
--field-bg: #1c1c1c;
```

## Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (2-column grid)

## Features Checklist

✅ WWF Logo in header
✅ Hero section with title and tagline
✅ Complete grievance form with all fields
✅ 2-column layout for fields
✅ Form validation with error messages
✅ Policies drawer (full-screen)
✅ 8 comprehensive policies
✅ Accept policies functionality
✅ Confirmation modal after submission
✅ Success message display
✅ Next steps information
✅ CTA section with app downloads
✅ Footer with 5 columns
✅ Social media icons
✅ ISO certification badge
✅ WWF section with logo
✅ 3 conservation cards
✅ Responsive design
✅ EmailJS integration
✅ Error handling
✅ Loading states
✅ Dark theme styling

## Troubleshooting

### Problem: Form not submitting
**Solution**: 
- Check all required fields are filled
- Ensure policies checkbox is checked
- Check browser console for errors

### Problem: Emails not sending
**Solution**:
- Verify EmailJS credentials
- Check template IDs match your account
- Ensure templates are published
- Check internet connection

### Problem: Styles not loading
**Solution**:
- Clear browser cache
- Verify CSS files in src/styles/
- Check import paths in App.js
- Restart dev server

### Problem: Images not loading
**Solution**:
- Ensure wwf-logo.jpg is in public/
- Check filename casing
- Verify path in HeaderSection.js

## Development Tips

1. **Hot Reload**: Save any file to auto-refresh
2. **Component Structure**: Each component handles its own logic
3. **State Management**: Uses React hooks (useState, useEffect)
4. **Form Handling**: Separate data and UI concerns
5. **Email Integration**: All email logic in GrievanceForm.js

## Production Deployment

### Environment Variables (if needed):
Create `.env` file in root:
```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_USER_ID=your_user_id
```

### Build Optimization:
```bash
npm run build
```

Creates optimized `build/` folder ready for deployment.

## File Sizes Reference

| File | Lines | Purpose |
|------|-------|---------|
| GrievanceForm.js | ~350 | Main form component |
| grievance.css | ~340 | Form and page styles |
| sections.css | ~550 | Footer and CTA styles |
| FooterSection.js | ~150 | Footer + WWF section |
| grievance-data.js | ~80 | Data and policies |

## Testing Checklist

- [ ] Form displays all fields correctly
- [ ] Validation errors show properly
- [ ] Policies drawer opens/closes
- [ ] Accept policies works
- [ ] Form submits with valid data
- [ ] Confirmation modal displays
- [ ] Styles look correct
- [ ] Responsive on mobile
- [ ] Emails send successfully
- [ ] No console errors

## Support Resources

- React Docs: https://react.dev
- EmailJS Docs: https://www.emailjs.com/docs
- MDN Web Docs: https://developer.mozilla.org

---

**Ready to Launch! 🚀**

Follow this guide step-by-step and you'll have a fully functional React grievance page!
