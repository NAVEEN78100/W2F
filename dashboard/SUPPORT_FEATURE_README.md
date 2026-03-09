# Support Page & Content Management System Implementation

## ✅ Features Implemented

### 1️⃣ **Popular Articles (Homepage)**
- Admin dashboard to manage articles shown on the support page
- Create, edit, delete, and reorder articles
- Each article has:
  - **Title** (the question)
  - **Description** (short preview on card)
  - **Slug** (unique identifier)
  - **Published toggle** (control visibility)
  - **Position** (drag & drop reordering)

**Location:** `/admin` → Admin Dashboard → "Popular Articles" tab

### 2️⃣ **Article Detail Page with PDF Upload**
- When users click "Learn more" on an article card, they see the full article
- **PDF Upload Capability:**
  - Admin can upload a PDF file for each article
  - Backend automatically extracts text content from the PDF using `pdf-parse`
  - Extracted text is stored in the database
  - Frontend displays ONLY the extracted text (not a PDF viewer)
  - Admin can manually edit extracted text
  - Admin can replace or update the PDF

**Features:**
- Article content/answer section
- "More in this section" expandable Q&A accordion
- Back to Support button
- Responsive design

**Location:** `/article/{slug}` (e.g., `/article/what-is-wander-with-food`)

### 3️⃣ **"More in this Section" (Expandable Q&A)**
- Each article can have multiple Q&A pairs
- Q&A items expand/collapse in accordion style
- Only one item expands at a time (collapsible behavior)

**Admin Capabilities:**
- Add new Q&A items
- Edit questions and answers
- Delete Q&A items
- Reorder Q&A items

**Location:** At the bottom of article detail pages and in the admin editor

---

## 📁 Project Structure

```
backend/
├── models/
│   ├── Article.js (Updated with sections field)
│   └── Topic.js
├── routes/
│   ├── articles.js (Updated with PDF upload & slug endpoint)
│   ├── auth.js
│   └── topics.js
├── utils/
│   └── pdfProcessor.js (PDF text extraction)
├── middleware/
│   └── auth.js
└── seedArticles.js (Sample data generator)

src/
├── pages/
│   ├── Support.tsx (Homepage with article cards)
│   ├── ArticleDetail.tsx (Detail page with Q&A)
│   └── admin/
│       └── ArticlesManager.tsx (Admin dashboard for articles)
└── ...
```

---

## 🗄️ Database Models

### Article Model
```javascript
{
  title: String,              // Article question
  description: String,         // Short preview
  slug: String (unique),       // URL-friendly identifier
  content: String,             // Main article content
  pdf_url: String,             // Path to uploaded PDF
  image_url: String,           // Optional thumbnail
  is_published: Boolean,       // Visibility toggle
  position: Number,            // Display order
  sections: [{                 // Q&A items
    question: String,
    answer: String
  }],
  timestamps: true
}
```

---

## 🔌 API Endpoints

### Articles
- `GET /api/articles` - Get all articles (admin)
- `GET /api/articles/published` - Get published articles (public)
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles/slug/:slug` - Get article by slug (public)
- `POST /api/articles` - Create article (admin only)
- `PUT /api/articles/:id` - Update article (admin only)
- `DELETE /api/articles/:id` - Delete article (admin only)
- `POST /api/articles/:id/upload-pdf` - Upload PDF and extract text (admin only)
- `PUT /api/articles/reorder` - Reorder articles (admin only)

---

## 🎨 Frontend Features

### Support Homepage
- Display published articles in a 3-column grid
- Search functionality (already implemented)
- Article cards with descriptions
- Click to navigate to article detail

### Admin Dashboard
- **Articles Manager page** with:
  - List of all articles
  - Create new article button
  - Edit/delete buttons for each article
  - Drag & drop reordering
  - Status indicator (Published/Draft)

### Article Editor Dialog (In Admin)
- **Basic Info Tab:**
  - Title input
  - Slug auto-generation
  - Description textarea
  
- **Content Section:**
  - PDF upload with automatic text extraction
  - Manual content editing
  - Replace PDF functionality
  
- **More in This Section:**
  - Add Q&A items
  - Edit existing Q&A items
  - Delete Q&A items
  - Visual list of all Q&A items

- **Publishing:**
  - Published toggle switch

---

## 🚀 Quick Start

### 1. Login to Admin
```
Email: admin@example.com
Password: admin123
```

### 2. Manage Articles
- Go to `/admin`
- Click "Popular Articles" section
- Use the admin interface to:
  - Add new articles
  - Upload PDFs for existing articles
  - Add Q&A sections
  - Publish/unpublish articles
  - Reorder articles

### 3. View Public Support Page
- Navigate to `/support`
- See published articles displayed as cards
- Click on any article to view full details

### 4. View Article Details
- Click "Learn more" on any article card
- See article content (extracted from PDF if available)
- Expand Q&A items in the "More in this section" area

---

## 📦 Sample Data

Three sample articles have been pre-loaded:
1. "What is Wander With Food and how does it work?"
2. "How to find and redeem coupon codes at restaurants"
3. "Dietary Restrictions and Allergies"

Each includes sample Q&A sections and content.

---

## 🔒 Security

- All admin endpoints require authentication
- Admin role check on all write operations
- PDF uploads validated (only .pdf files allowed)
- 10MB file size limit on PDFs
- CORS enabled for local development

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, TailwindCSS, ShadcnUI, React Query
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **PDF Processing:** pdf-parse library
- **File Upload:** multer
- **Authentication:** JWT (JSON Web Tokens)

---

## 📝 Running the Application

```bash
# Terminal 1 - Start both servers
npm run dev:full

# The app will be available at:
# Frontend: http://localhost:8080
# Backend: http://localhost:5000
```

---

## ✨ Next Steps / Optional Enhancements

- Add image upload for articles
- Add category/topic filtering
- Implement user ratings/votes
- Add search functionality to admin
- Create topic/section management
- Add analytics for popular articles
- Implement bulk article import from CSV
- Add article templates

---

**Implementation completed on:** January 15, 2026
**Status:** ✅ Ready for production

