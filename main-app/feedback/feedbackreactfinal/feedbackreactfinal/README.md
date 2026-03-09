# Feedback Page - React Application

This is a complete React conversion of your .NET feedback page with all the same functionality, UI, and styling.

## Project Structure

```
feedback-react-app/
├── public/
│   ├── index.html
│   └── images/
│       └── feedback/
│           ├── feedback.jpg
│           ├── premium.jpg
│           └── bugg.jpg
├── src/
│   ├── components/
│   │   ├── FeedbackPage.js         # Main page component
│   │   ├── HeroSection.js          # Hero section with title and CTA
│   │   ├── FeedbackSection.js      # Card grid section
│   │   ├── FeedbackCard.js         # Individual feedback card
│   │   ├── CardDrawer.js           # Full-screen drawer for card details
│   │   ├── ContactFormModal.js     # Contact form modal with OTP
│   │   ├── CTASection.js           # Call-to-action section
│   │   └── FooterSection.js        # Footer and WWF section
│   ├── data/
│   │   └── feedbackData.js         # Card data and helper functions
│   ├── styles/
│   │   ├── feedback.css            # Main feedback page styles
│   │   └── sections.css            # Section styles (CTA, Footer, WWF)
│   ├── App.js                      # Root component
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Features

### ✅ All Features from .NET Version:

1. **Hero Section**
   - Product Updates title and tagline
   - "Any Questions?" button to open contact form

2. **Feedback Cards Grid**
   - 3 cards with zoom-on-hover effect
   - Category tags (Improvements, New Feature, Security & Compliance)
   - Click to open full-screen drawer with details

3. **Card Drawer**
   - Full-screen bottom-up animation
   - Card details with HTML content rendering
   - Back button to close

4. **Contact Form Modal**
   - Right-side sliding drawer
   - Email OTP verification with 2-minute timer
   - Form validation
   - Fields: Name, Email, Phone (with country code), Category, Message
   - File upload for Bug Bounty category (JPG/JPEG only, max 2MB)
   - Terms and conditions checkbox with drawer
   - EmailJS integration for sending emails
   - Success/error messages

5. **CTA Section**
   - "1 million users, plus you" heading
   - App Store and Google Play download buttons

6. **Footer Section**
   - 5-column footer links
   - Social media icons
   - ISO certification badge

7. **WWF Section**
   - Large WWF logo
   - 3 conservation cards (Wildlife, Marine, Climate)
   - Footer text

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Images

Create the following folder structure and add your images:

```
public/
└── images/
    └── feedback/
        ├── feedback.jpg
        ├── premium.jpg
        └── bugg.jpg
```

### 3. EmailJS Configuration

The app uses EmailJS for sending emails. The credentials are already configured in `ContactFormModal.js`:

- Service ID: `service_7yf1tan`
- Template ID: `template_lphthdk`
- Confirmation Template ID: `template_v76jk6d`
- User ID: `NKqMo7yjfTsoYYysu`

**If you want to use your own EmailJS account:**

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email templates
3. Update the credentials in `src/components/ContactFormModal.js`

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Key Differences from .NET Version

1. **State Management**: Uses React hooks (useState, useEffect) instead of server-side state
2. **Email Sending**: Uses EmailJS instead of server-side email sending
3. **File Upload**: Client-side validation (server-side upload can be added later)
4. **Routing**: Single-page application (no server-side routing)

## Styling

All original CSS has been preserved:

- `feedback.css` - Main page styles, cards, drawer, modal, form
- `sections.css` - CTA, Footer, and WWF section styles

## Form Validation

Same validation rules as .NET version:

- ✅ Name required
- ✅ Valid email format required
- ✅ OTP verification required
- ✅ Phone number required (max 10 digits)
- ✅ Message required
- ✅ Terms acceptance required
- ✅ Bug Bounty: JPG/JPEG file required (max 2MB)

## OTP Verification

- 6-digit OTP sent to user's email
- 2-minute expiry timer
- Real-time countdown display
- Email verification before showing additional form fields

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Customization

### Change Card Data

Edit `src/data/feedbackData.js` to modify card content.

### Change Styles

Edit CSS files in `src/styles/` to customize appearance.

### Change EmailJS Settings

Edit `src/components/ContactFormModal.js` to update email credentials.

## Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **emailjs-com**: ^3.2.0
- **axios**: ^1.6.0

## Support

For issues or questions, please contact the development team.

---

**Made by BINI** 🚀
