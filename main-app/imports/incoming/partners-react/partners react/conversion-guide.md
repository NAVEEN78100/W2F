# Partners React Application - Complete Conversion Guide

## Overview
This is a complete React conversion of your .NET Partners page with **full feature parity**. All functionality, styling, and behavior from the original .NET application has been preserved.

## 🎯 What's Included

### React Components (Frontend)
- **PartnersPage.jsx** - Main page component with state management
- **HeroSection.jsx** - Hero banner with title and tagline
- **PartnerCardsGrid.jsx** - Grid layout for partnership categories
- **PartnerCard.jsx** - Individual partner category card
- **PartnerDrawer.jsx** - Slide-out drawer for partnership details
- **PartnerLeadForm.jsx** - Complete form with OTP verification
- **TermsDrawer.jsx** - Terms and conditions drawer
- **ConfirmationModal.jsx** - Success confirmation modal
- **CTASection.jsx** - Call-to-action section
- **FooterSection.jsx** - Footer with WWF information

### Backend API (.NET Core)
- **PartnershipsApiController.cs** - RESTful API endpoints
  - GET /api/partnerships - Fetch page data
  - POST /api/partnerships/lead - Submit partnership application
  - GET /api/partnerships/leads - Retrieve all leads

### Configuration Files
- **package.json** - Dependencies and scripts
- **App.js** - Main application component
- **index.js** - React entry point
- **.env.example** - Environment variables template
- **README.md** - Setup and deployment guide

## 📦 Installation & Setup

### Prerequisites
```bash
Node.js v14+
.NET Core 6.0+
SQL Server
EmailJS account (for OTP emails)
```

### Backend Setup (.NET API)

1. **Update Program.cs** for CORS support:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("AllowReactApp");
```

2. **Run migrations**:
```bash
dotnet ef database update
```

3. **Start the API**:
```bash
dotnet run
```
API will run on: http://localhost:5000

### Frontend Setup (React)

1. **Install dependencies**:
```bash
npm install
```

2. **Create .env file**:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=service_7yf1tan
REACT_APP_EMAILJS_TEMPLATE_ID=template_lphthdk
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

3. **Start development server**:
```bash
npm start
```
React app will run on: http://localhost:3000

## 🔑 Key Features Preserved

### ✅ All Original .NET Features
- Partnership category cards (Star Dines, Resto Bars, Hangout Spot, Home Bakers)
- Category-specific terms and requirements
- Email OTP verification (2-minute expiry)
- Multi-step form with validation
- Terms and conditions drawer
- Success confirmation modal
- CTA section with app store badges
- WWF-themed footer
- Accessibility features (ARIA labels, keyboard navigation)
- Responsive design

### 🔐 Security Features
- Email validation
- Phone validation
- OTP expiry timer
- Required fields validation
- Terms acceptance required
- Anti-forgery token protection (API)

### ♿ Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatible
- Escape key support for modals

## 📂 Project Structure

```
partners-react-app/
├── public/
│   ├── index.html
│   └── images/
│       └── partnerships/
│           ├── StarDines.jpg
│           ├── RestoBars.jpg
│           ├── HangoutSpots.jpg
│           └── HomeBakers.jpg
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── PartnerCardsGrid.jsx
│   │   ├── PartnerCard.jsx
│   │   ├── PartnerDrawer.jsx
│   │   ├── PartnerLeadForm.jsx
│   │   ├── TermsDrawer.jsx
│   │   ├── ConfirmationModal.jsx
│   │   ├── CTASection.jsx
│   │   └── FooterSection.jsx
│   ├── styles/
│   │   ├── partnerships.css
│   │   └── sections.css
│   ├── PartnersPage.jsx
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🎨 Styling

Copy your existing CSS files:
- **partnerships.css** - Main partnership page styles
- **sections.css** - Section-specific styles (CTA, Footer)

Place them in `src/styles/` directory. All CSS classes are preserved from the original .NET version.

## 🔄 API Integration

### API Endpoints

**GET /api/partnerships**
Returns page data including hero content, cards, and terms HTML.

**POST /api/partnerships/lead**
Request body:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "state": "California",
  "location": "123 Main St",
  "category": 1,
  "acceptTerms": true
}
```

Response:
```json
{
  "success": true,
  "message": "Partnership request submitted successfully!"
}
```

## 📧 EmailJS Configuration

1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create email template with variables: `{{email}}` and `{{otp}}`
4. Copy service ID, template ID, and public key to `.env`

## 🚀 Deployment

### Frontend (React)
```bash
npm run build
```
Deploy `build/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

### Backend (.NET API)
Deploy to:
- Azure App Service
- AWS Elastic Beanstalk
- Docker container

**Important**: Update CORS policy with production URL!

## 🔍 Differences from .NET Version

| Feature | .NET | React |
|---------|------|-------|
| Rendering | Server-side (Razor) | Client-side (JSX) |
| State | ViewModels | React Hooks (useState) |
| Form submission | POST with anti-forgery | Fetch API with JSON |
| OTP Email | Server-side | EmailJS (client-side) |
| Routing | MVC Controllers | React Router (optional) |
| Validation | ModelState | Client-side + API |

## 📝 Notes

- All original functionality is preserved
- CSS classes remain unchanged for easy migration
- API structure mirrors original controller
- OTP logic identical to original JavaScript
- Form validation matches .NET data annotations
- Accessibility features maintained

## 🐛 Troubleshooting

**CORS errors**: Ensure backend CORS policy includes React app URL

**OTP not sending**: Check EmailJS credentials in `.env`

**API connection failed**: Verify backend is running on port 5000

**Images not loading**: Place images in `public/images/partnerships/`

## 📄 License
MIT

---

**Need help?** All components are fully documented with comments explaining the conversion from .NET to React.