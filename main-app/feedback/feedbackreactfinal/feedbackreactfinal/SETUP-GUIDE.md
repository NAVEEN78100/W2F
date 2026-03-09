# Complete Setup Instructions for React Feedback Page

## Step-by-Step Setup Guide

### Step 1: Create React App

Open your terminal and run:

```bash
npx create-react-app feedback-react-app
cd feedback-react-app
```

### Step 2: Install Dependencies

```bash
npm install emailjs-com axios
```

### Step 3: Project Structure

Create the following folder structure:

```
feedback-react-app/
├── public/
│   ├── index.html (replace existing)
│   └── images/
│       └── feedback/
│           ├── feedback.jpg
│           ├── premium.jpg
│           └── bugg.jpg
├── src/
│   ├── components/
│   │   ├── FeedbackPage.js
│   │   ├── HeroSection.js
│   │   ├── FeedbackSection.js
│   │   ├── FeedbackCard.js
│   │   ├── CardDrawer.js
│   │   ├── ContactFormModal.js
│   │   ├── CTASection.js
│   │   └── FooterSection.js
│   ├── data/
│   │   └── feedbackData.js
│   ├── styles/
│   │   ├── feedback.css
│   │   └── sections.css
│   ├── App.js (replace existing)
│   ├── index.js (replace existing)
│   └── index.css (replace existing)
├── package.json (already modified)
└── README.md
```

### Step 4: Create Folders

```bash
# Inside src/ folder
mkdir components
mkdir data
mkdir styles
```

### Step 5: Copy All Files

Copy all the provided files to their respective locations:

**Root Files:**
- package.json → root folder

**Public Files:**
- index.html → public/index.html

**Source Files:**
- index.js → src/index.js
- index.css → src/index.css
- App.js → src/App.js

**Components (in src/components/):**
- FeedbackPage.js
- HeroSection.js
- FeedbackSection.js
- FeedbackCard.js
- CardDrawer.js
- ContactFormModal.js
- CTASection.js
- FooterSection.js

**Data (in src/data/):**
- feedbackData.js

**Styles (in src/styles/):**
- feedback.css (use react_feedback.css)
- sections.css (use react_sections.css)

### Step 6: Add Images

1. Create folder: `public/images/feedback/`
2. Copy your three images:
   - feedback.jpg
   - premium.jpg
   - bugg.jpg

### Step 7: Run the Application

```bash
npm start
```

Your app will open at `http://localhost:3000`

### Step 8: Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

## File Mapping from .NET to React

| .NET File | React File | Purpose |
|-----------|------------|---------|
| FeedbackController.cs | feedbackData.js | Card data and logic |
| Index.cshtml | FeedbackPage.js | Main page layout |
| FeedbackIndexViewModel.cs | feedbackData.js | Data models |
| feedback.js | ContactFormModal.js | Form logic and OTP |
| feedback.css | styles/feedback.css | Main styles |
| sections.css | styles/sections.css | Section styles |
| FooterSection.cshtml | FooterSection.js | Footer component |
| CTASection.cshtml | CTASection.js | CTA component |

## EmailJS Setup (Optional)

If you want to use your own EmailJS account:

1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create two email templates:
   - One for user enquiries
   - One for OTP verification
5. Get your credentials:
   - Service ID
   - Template IDs
   - Public Key (User ID)
6. Update `src/components/ContactFormModal.js`:

```javascript
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_CONFIRMATION_TEMPLATE_ID = "your_confirmation_template_id";
const EMAILJS_USER_ID = "your_public_key";
```

## Troubleshooting

### Images Not Loading?
- Make sure images are in `public/images/feedback/`
- Clear browser cache
- Check image paths in `feedbackData.js`

### EmailJS Not Working?
- Check console for errors
- Verify EmailJS credentials
- Check template IDs match your EmailJS account
- Ensure templates are published

### Styles Not Applied?
- Check import paths in `App.js`
- Verify CSS files are in `src/styles/`
- Clear browser cache

### Form Not Submitting?
- Check browser console for errors
- Verify all required fields are filled
- Check OTP verification is complete

## Features Checklist

✅ Hero section with "Any Questions?" button
✅ 3 feedback cards with hover zoom effect
✅ Category tags (Improvements, New Feature, Security)
✅ Full-screen card drawer on click
✅ Contact form modal (right-side drawer)
✅ Email OTP verification (2-minute timer)
✅ Form validation
✅ File upload for Bug Bounty (JPG/JPEG, max 2MB)
✅ Terms & conditions drawer
✅ CTA section with app download buttons
✅ Footer with links and social icons
✅ WWF conservation section

## Development Tips

1. **Hot Reload**: Save any file and the app auto-refreshes
2. **Component Structure**: Each section is a separate component for easy maintenance
3. **State Management**: Uses React hooks (useState, useEffect)
4. **Styling**: All original CSS preserved from .NET version
5. **Responsive**: Works on mobile, tablet, and desktop

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com/
3. Import your GitHub repository
4. Click "Deploy"

### Deploy to Netlify

1. Run `npm run build`
2. Go to https://www.netlify.com/
3. Drag and drop the `build/` folder

### Deploy to GitHub Pages

1. Install: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/feedback-react-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Run: `npm run deploy`

## Support

For issues or questions:
- Check the console for errors
- Review the README.md
- Check that all files are in correct locations
- Verify EmailJS credentials if using email features

---

**Happy Coding! 🚀**

Made by BINI
