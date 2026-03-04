# WWF - Wander With Food

A comprehensive restaurant discovery platform featuring dynamic animations, admin dashboards, help hub, partner management, and feedback systems.

## 🏗️ Project Overview

This project consists of **4 independent applications** that work together:

1. **Main Next.js App** - Restaurant discovery platform (Port: 3000)
2. **Backend API** - Express.js + MongoDB (Port: 4000)
3. **Help Hub** - Support & forms system (Port: 5173)
4. **Content Hub Dashboard** - Admin panel for content management (Port: 8080)

## 🚀 Quick Start

### 1. One-Time Setup (all apps)

```bash
# Install dependencies for root + help hub + dashboard, then seed MongoDB
npm run setup:all
```

### 2. Start Everything (single command)

```bash
# Starts API (4000), Next.js app (3000), Help Hub (5173), Dashboard (8080)
npm run dev:all
```

**Main App URL**: http://localhost:3000  
**Help Hub URL**: http://localhost:5173  
**Dashboard URL**: http://localhost:8080

### 3. Optional: Start Individual Services

```bash
npm run dev:api
npm run dev:web
npm run dev:help
npm run dev:dashboard
```

### 4. Stop Everything

```bash
# Stops processes using ports 3000, 4000, 5173, 8080
npm run stop:all
```

### 5. Restart Everything

```bash
# Stops all services and starts all services again
npm run restart:all
```

### 6. Manual Start (Legacy / Per-Service Control)

Use this mode when you want to run only specific services.

#### Main Application & Backend

```bash
# Install dependencies
npm install

# Seed MongoDB with sample data
npm run seed

# Start backend API (port 4000)
npm run api

# Start Next.js frontend (port 3000)
npm run dev
```

#### Help Hub (Support System)

```bash
# Navigate to help hub directory
cd "public/wwf-support page/wander-with-food-help-hub-main (1)/wander-with-food-help-hub-main"

# Install dependencies
npm install

# Start help hub (port 5173)
npm run dev
```

#### Content Hub Dashboard (Admin Panel)

```bash
# Navigate to content hub directory
cd "public/wwf-support page/content-hub-dashboard-main (1)/content-hub-dashboard-main"

# Install dependencies
npm install

# Start dashboard (port 8080)
npm run dev
```

## 🎨 Tech Stack

### Main Application
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: GSAP + Framer Motion
- **Architecture**: Hybrid server/client components

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB (local)
- **Authentication**: Bearer token-based
- **Port**: 4000

### Help Hub
- **Framework**: Vite 5.4.19 + React
- **Language**: TypeScript
- **UI**: shadcn-ui + Tailwind CSS
- **Port**: 5173

### Content Hub Dashboard
- **Framework**: Vite + React
- **Language**: TypeScript
- **Port**: 8080

## 🌐 Application URLs & Features

### Main Application (Port 3000)

#### Public Pages
- **Home** - `/` - Landing page with animations
- **Explore** - `/explore` - Restaurant discovery with filters
- **About** - `/about` - Company information
- **Blogs** - `/blogs` - Content management system
- **Contact** - `/contact` - Contact form
- **Feedback** - `/feedback` - User feedback system
- **Support** - `/support` - Help center access
- **Media Assets** - `/media-assets` - Media library

#### Company Pages
- **Partners React** - `/company/partners-react` - Partner management with custom footer
- **Grievance System** - `/company/grievancereactfinal` - Grievance submissions
- **WWF About** - `/company/wwf-about` - Additional about page
- **WWF Blogs** - `/company/wwf-blogs` - Blog management

#### Admin Dashboard
- **URL**: http://localhost:3000/dashboard (or `/admin`)
- **Username**: `naveen`
- **Password**: `name_sake`
- **Features**:
  - Full CRUD operations for restaurants
  - Image upload and management
  - Featured restaurant selection
  - Category and cuisine management
  - Real-time data updates

### Help Hub (Port 5173)

#### Forms & Pages
- **Bug Bounty** - http://localhost:5173/bug-bounty
  - Submit security vulnerabilities
  - Formal black/yellow UI with WWF logo
  
- **General Feedback** - http://localhost:5173/general-feedback
  - User feedback submission
  - Professional styling with yellow accents
  
- **Grievance Form** - http://localhost:5173/grievance
  - W2F grievance submissions
  - Yellow-highlighted W2F branding

**Admin Credentials**:
- Email: admin@gmail.com
- Password: admin123

### Content Hub Dashboard (Port 8080)
- **URL**: http://localhost:8080
- **Purpose**: Content management and administration
- **Admin Login**: Same as help hub credentials

## 🔐 Authentication & Credentials

### Main App Admin Dashboard
- **Username**: `naveen`
- **Password**: `name_sake`
- **Access**: http://localhost:3000/dashboard

### Help Hub & Content Hub
- **Email**: admin@gmail.com
- **Password**: admin123

### API Authentication
- Bearer token required for POST, PUT, DELETE operations
- Token generated on admin login

## 🎨 Design System

### Color Scheme
- **Primary**: Yellow (#FFD402, yellow-500/600) - Branding & CTAs
- **Secondary**: Black/Dark Gray (gray-800/900) - Headers & backgrounds
- **Accent**: White - Content areas
- **Borders**: Yellow with 30% opacity (yellow-500/30)

### Form Styling
All help hub forms feature:
- Lightened backgrounds: `bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800`
- Yellow border accents: `border-2 border-yellow-500/30`
- Large submit buttons: `bg-gradient-to-r from-yellow-500 to-yellow-600 py-6`
- WWF logo positioned at top right corner
- Professional, formal appearance

### Footer Implementation
The Partners React page (`/company/partners-react`) features a custom footer matching the home page:
- **White Footer Section**: Expandable cards (Partner, Problem, Help), 4-column navigation
- **Black W2F Section**: Language selector, mission cards, animated W/2/F images
- **Bottom Section**: Shield certification + social icons (Instagram, Twitter, Facebook, YouTube, LinkedIn)
- **Component Architecture**: Hybrid - server component (page.tsx) + client component (footer.tsx)

## 📁 Project Structure

```
finalwwf/
├── app/                          # Next.js 14 app router
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── about/                    # About page
│   ├── admin/                    # Admin dashboard
│   ├── blogs/                    # Blog system
│   ├── company/                  # Company pages
│   │   ├── partners-react/       # Partners page with custom footer
│   │   │   ├── page.tsx          # Server component
│   │   │   └── footer.tsx        # Client component
│   │   ├── grievancereactfinal/  # Grievance system
│   │   ├── wwf-about/            # WWF about page
│   │   └── wwf-blogs/            # WWF blogs
│   ├── dashboard/                # Main admin dashboard
│   ├── explore/                  # Restaurant discovery
│   ├── feedback/                 # Feedback system
│   └── api/                      # API routes
├── backend/                      # Express.js backend
│   ├── server.js                 # Main server file
│   ├── db.js                     # MongoDB connection
│   ├── seed.js                   # Database seeding
│   ├── routes/                   # API routes
│   └── middleware/               # Authentication middleware
├── components/                   # React components
│   ├── animations/               # Animation components
│   ├── sections/                 # Page sections
│   ├── ui/                       # shadcn-ui components
│   └── AnimationSelector.tsx     # Animation demos
├── public/                       # Static assets
│   ├── 4 (1).png                # WWF logo
│   ├── images/                   # Image assets
│   └── wwf-support page/         # Embedded apps
│       ├── wander-with-food-help-hub-main (1)/  # Help Hub
│       └── content-hub-dashboard-main (1)/      # Content Hub
├── lib/                          # Utility functions
├── types/                        # TypeScript definitions
├── hooks/                        # Custom React hooks
└── scripts/                      # Deployment scripts
```

## 🗄️ Database Schema

### Restaurant Model
- **id**: Incremental numeric identifier (e.g., 1, 2, 3)
- **name**: Restaurant display name
- **cuisine**: Primary cuisine type (Indian, Italian, Chinese, etc.)
- **rating**: Number 0–5 (supports decimals like 4.3)
- **image**: Absolute URL of cover image
- **district**: City area/region (Koramangala, Indiranagar, etc.)
- **deliveryTime**: Estimated time string (e.g., "30–40 mins")
- **distance**: Distance string (e.g., "2.1 km")
- **category**: Grouping tag (veg, family, casual, fine-dining)
- **priceRange**: Price indicator (₹, ₹₹, ₹₹₹)
- **emoji**: Visual accent emoji (🍛, 🍕, 🍜)
- **signatureDish**: Highlighted dish for promotions
- **featured**: Boolean - appears in featured sections
- **featuredCategory**: `ambience` or `dishes`

## 🔌 Backend API Endpoints

### Restaurant Operations
- **GET** `/restaurants/all` - Fetch all restaurants
- **POST** `/restaurants` - Create new restaurant (auth required)
- **PUT** `/restaurants/:id` - Update restaurant (auth required)
- **DELETE** `/restaurants/:id` - Delete restaurant (auth required)

### Explore & Discovery
- **GET** `/explore/*` - Explore page data with filters

### Form Submissions
- **POST** `/api/feedback` - Submit feedback
- **POST** `/api/bug-bounty` - Submit bug report
- **POST** `/api/grievance` - Submit grievance

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=wwf

# Backend Configuration
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000

# Admin Credentials (optional)
ADMIN_USERNAME=naveen
ADMIN_PASSWORD=name_sake

# Partner OTP Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_mail@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Wander With Food <your_mail@gmail.com>"

# Backward-compatible email keys
EMAIL_USER=your_mail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_SERVICE=gmail

# Admin notifications for partner requests
ADMIN_NOTIFY_EMAIL=admin_mail@gmail.com
```

## 🚀 Deployment

### Main Application
```bash
npm run build        # Build Next.js app
npm run start        # Start production server
```

### Help Hub
```bash
cd "public/wwf-support page/wander-with-food-help-hub-main (1)/wander-with-food-help-hub-main"
npm run build        # Build for production
```

### Content Hub Dashboard
```bash
cd "public/wwf-support page/content-hub-dashboard-main (1)/content-hub-dashboard-main"
npm run build        # Build for production
```

## 📝 Key Features

### 🎭 Animations
- GSAP scroll animations
- Framer Motion interactive components
- Phone carousel animations
- Scroll velocity effects
- Variable proximity animations
- Split text animations

### 🔍 Restaurant Discovery
- Advanced filtering by cuisine, district, price
- Featured restaurants (ambience & dishes)
- Real-time search
- Rating and distance sorting

### 👨‍💼 Admin Features
- Full CRUD operations
- Image upload and management
- Restaurant featured status
- Category management
- Real-time updates

### 🛡️ Help & Support
- Bug bounty program
- General feedback system
- Grievance submissions
- Professional form UI with WWF branding
- Admin panel for managing submissions

### 🤝 Partner Management
- Custom partners page
- Dedicated footer matching home page
- Expandable information cards
- Mission statement and values
- Social media integration

## 📚 Additional Documentation

- **Admin Dashboard Guide**: See `ADMIN_DASHBOARD_GUIDE.md`
- **Partners Guide**: See `PARTNERS_RUN.md`
- **Pre-Share Checklist**: See `PRE_SHARE_CHECKLIST.md`

## 🐛 Known Issues & Solutions

### Port Conflicts
If ports are already in use:
```bash
# Find and kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Change port in package.json
"dev": "next dev -p 3001"
```

### MongoDB Connection
Ensure MongoDB is running:
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or use MongoDB Compass GUI
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Contact

For support or inquiries, use the help hub forms at http://localhost:5173