# React Feedback Page - Project Structure

## 📁 Complete Folder Structure

```
feedback-react-app/
│
├── 📄 package.json                      ← Dependencies & scripts [12]
├── 📄 README.md                         ← Project documentation [28]
├── 📄 SETUP-GUIDE.md                    ← Setup instructions [29]
├── 📄 FILE-LIST.md                      ← This file [30]
│
├── 📁 public/
│   ├── 📄 index.html                    ← HTML template [27]
│   ├── 📄 favicon.ico
│   ├── 📄 manifest.json
│   └── 📁 images/
│       └── 📁 feedback/
│           ├── 🖼️ feedback.jpg         ← Card 1 image
│           ├── 🖼️ premium.jpg          ← Card 2 image
│           └── 🖼️ bugg.jpg             ← Card 3 image
│
└── 📁 src/
    ├── 📄 index.js                      ← React entry point [13]
    ├── 📄 index.css                     ← Global styles [14]
    ├── 📄 App.js                        ← Root component [15]
    │
    ├── 📁 components/                   ← React components
    │   ├── 📄 FeedbackPage.js          ← Main page [17]
    │   ├── 📄 HeroSection.js           ← Hero section [18]
    │   ├── 📄 FeedbackSection.js       ← Card grid [19]
    │   ├── 📄 FeedbackCard.js          ← Single card [20]
    │   ├── 📄 CardDrawer.js            ← Card details drawer [21]
    │   ├── 📄 ContactFormModal.js      ← Contact form + OTP [22]
    │   ├── 📄 CTASection.js            ← CTA section [23]
    │   └── 📄 FooterSection.js         ← Footer + WWF [24]
    │
    ├── 📁 data/                         ← Data & helpers
    │   └── 📄 feedbackData.js          ← Card data [16]
    │
    └── 📁 styles/                       ← CSS files
        ├── 📄 feedback.css             ← Main styles [25]
        └── 📄 sections.css             ← Section styles [26]
```

## 🎯 Component Hierarchy

```
App
 └── FeedbackPage
      ├── HeroSection
      │    └── Button (Any Questions?)
      │
      ├── FeedbackSection
      │    └── FeedbackCard (×3)
      │         ├── Image
      │         ├── Category Tag
      │         └── Content (Title + Subtitle)
      │
      ├── CTASection
      │    └── Download Buttons (×2)
      │
      ├── FooterSection
      │    ├── Footer Links (5 columns)
      │    ├── Social Icons
      │    └── WWF Section (3 cards)
      │
      ├── CardDrawer
      │    ├── Back Button
      │    └── Card Details (image + content)
      │
      └── ContactFormModal
           ├── Form Fields
           ├── OTP Verification
           ├── File Upload
           └── Terms Drawer
```

## 🔄 Data Flow

```
feedbackData.js
     │
     ├─→ FeedbackPage (state)
     │        │
     │        ├─→ FeedbackSection
     │        │        └─→ FeedbackCard (×3)
     │        │                 │
     │        │                 └─→ onClick() → setSelectedCard()
     │        │
     │        └─→ CardDrawer (receives selectedCard)
     │
     └─→ Category helpers
              ├─→ getCategoryDisplay()
              └─→ getCategoryClass()
```

## 📦 File Sizes

| File | Lines | Purpose |
|------|-------|---------|
| ContactFormModal.js | ~450 | Contact form with OTP |
| feedbackData.js | ~120 | Card data |
| FooterSection.js | ~150 | Footer + WWF |
| feedback.css | ~800 | Main styles |
| sections.css | ~500 | Section styles |
| FeedbackPage.js | ~50 | Main component |
| CardDrawer.js | ~45 | Drawer component |
| Others | ~100 | Small components |

## 🎨 Styling Architecture

```
CSS Organization:
│
├── feedback.css (Main styles)
│   ├── Root variables
│   ├── Hero section
│   ├── Card grid layout
│   ├── Feedback cards
│   ├── Drawer styles
│   ├── Modal styles
│   ├── Form styles
│   ├── OTP verification
│   ├── File upload
│   └── Responsive design
│
└── sections.css (Sections)
    ├── CTA section
    ├── Footer section
    ├── WWF section
    ├── Animations
    └── Media queries
```

## 🔧 State Management

```javascript
FeedbackPage Component:
│
├── selectedCard (null | CardObject)
│    └── Controls which card is shown in drawer
│
├── isDrawerOpen (boolean)
│    └── Controls drawer visibility
│
└── isModalOpen (boolean)
     └── Controls modal visibility

ContactFormModal Component:
│
├── formData (object)
│    ├── fullName
│    ├── email
│    ├── countryCode
│    ├── phone
│    ├── category
│    ├── message
│    ├── acceptTerms
│    └── attachment
│
├── otpState (object)
│    ├── generatedOtp
│    ├── otpVerified
│    ├── otpSent
│    ├── otpInput
│    └── remainingTime
│
├── errors (array)
├── showAdditionalFields (boolean)
├── showTermsDrawer (boolean)
└── isSubmitting (boolean)
```

## 📱 Responsive Breakpoints

```css
Desktop:   > 1024px  (Default)
Tablet:    768px - 1024px
Mobile:    < 768px

Key breakpoints in sections.css:
- @media (min-width: 640px)  → CTA buttons row
- @media (min-width: 768px)  → Footer 3 columns, WWF 3 cards
- @media (min-width: 1024px) → Footer 5 columns
- @media (max-width: 768px)  → Mobile adjustments
```

## 🚀 Build Output

```
npm run build creates:
│
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css    ← All CSS bundled
│   ├── js/
│   │   └── main.[hash].js     ← All JS bundled
│   └── media/
│       └── [images].[hash]
├── index.html                  ← Optimized HTML
└── asset-manifest.json
```

## 📊 Dependencies Tree

```
react (18.2.0)
└── react-dom (18.2.0)

emailjs-com (3.2.0)
└── Used for OTP and form submissions

axios (1.6.0)
└── HTTP client (optional, for future use)

react-scripts (5.0.1)
├── webpack
├── babel
├── eslint
└── Other build tools
```

## 🎭 Features by Component

### FeedbackPage.js
- Main container
- State management for drawer and modal
- Passes callbacks to child components

### HeroSection.js
- Red gradient background
- Title and tagline
- "Any Questions?" button
- Triggers modal open

### FeedbackSection.js
- Card grid wrapper
- Maps over card data
- Passes click handler to cards

### FeedbackCard.js
- Individual card display
- Hover zoom effect
- Category tag with color
- Image, title, subtitle
- Clickable to open drawer

### CardDrawer.js
- Full-screen overlay
- Bottom-up animation
- Displays card details
- HTML content rendering
- Back button to close

### ContactFormModal.js
- Right-side sliding drawer
- OTP generation and sending
- Email validation
- 2-minute timer
- Progressive form reveal
- File upload validation
- Terms & conditions drawer
- EmailJS integration
- Error handling

### CTASection.js
- Large heading
- App Store button
- Google Play button
- Responsive layout

### FooterSection.js
- 5-column footer links
- Social media icons
- Certification badge
- WWF conservation section
- 3 gradient cards
- Footer text

## 🔐 Security Features

- ✅ Email validation
- ✅ OTP verification
- ✅ File type validation (JPG/JPEG only)
- ✅ File size limit (2MB)
- ✅ Phone number length validation
- ✅ Required field validation
- ✅ Terms acceptance required
- ✅ XSS protection (React default)

## 📧 EmailJS Configuration

```javascript
Service ID: service_7yf1tan
Template ID: template_lphthdk
Confirmation Template: template_v76jk6d
User ID: NKqMo7yjfTsoYYysu

Templates needed:
1. Main form submission → Admin
2. OTP verification → User
3. Confirmation email → User
```

## 🎨 Color Scheme

```css
Primary Red:    #f63636
Dark Red:       #e13030
White:          #fff
Gray Dark:      #383838
Field BG:       #fff6f5
Field Border:   #fff0ee

Category Colors:
- Improvements: #019b67 (Green)
- New Feature:  #f78816 (Orange)
- Security:     #ed4b50 (Red)

Gradients:
- Hero:     linear-gradient(165deg, #ff6b47 0%, #f4d6d2 35%, #f0c7c1 100%)
- Wildlife: linear-gradient(135deg, #991b1b 0%, #7f1d1d 50%, #7c2d12 100%)
- Marine:   linear-gradient(135deg, #047857 0%, #0f766e 50%, #1e40af 100%)
- Climate:  linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #db2777 100%)
```

## ✨ Animations

```css
- fadeInUp: Card drawer appearance
- cardSlideUp: Card entrance animation
- statFadeIn: Stats fade in
- cardFadeIn: WWF cards fade in
- logoAppear: WWF logo scale in
- Hover effects on all cards
- Button transitions
- Drawer slide animations
```

## 📝 TODO (Optional Enhancements)

- [ ] Add loading skeleton for cards
- [ ] Implement image lazy loading
- [ ] Add form data persistence (localStorage)
- [ ] Implement backend API for form submission
- [ ] Add analytics tracking
- [ ] Implement dark mode
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Optimize images (WebP format)
- [ ] Add PWA support
- [ ] Implement i18n (multi-language)
- [ ] Add accessibility improvements

---

**Project Structure Complete! 🎉**

All files are organized and ready to use. Follow SETUP-GUIDE.md for installation instructions.
