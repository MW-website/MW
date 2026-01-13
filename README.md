# MW E-Commerce Platform

> **Full-Stack E-Commerce Solution with Real-Time Inventory Management, Secure Payment Processing, and Optimized Checkout Experience**

## ✨ Project Overview

A complete, production-ready e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) featuring Stripe payment integration, JWT authentication, real-time inventory tracking, and a comprehensive admin dashboard.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Stripe Account

### Installation
```bash
# Run automated setup
powershell -ExecutionPolicy Bypass -File ./setup.ps1

# Or manual setup:
npm install
cd server && npm install
```

### Start Development Servers
```bash
# Terminal 1 - Start MongoDB
mongod --dbpath C:\data\db

# Terminal 2 - Backend
cd server
npm run dev

# Terminal 3 - Frontend
npm run dev
```

**Frontend:** http://localhost:5173  
**Backend API:** http://localhost:5000  

---

## 🎯 Key Features

### Customer Features
✅ User authentication & registration  
✅ Product browsing with filters  
✅ Shopping cart & wishlist  
✅ Secure Stripe checkout  
✅ Order history & tracking  
✅ Real-time stock availability  

### Admin Features
✅ Inventory management dashboard  
✅ Real-time stock updates  
✅ Order management & status tracking  
✅ Product CRUD operations  
✅ Stock history logging  
✅ Customer management  

### Technical Features
✅ JWT authentication  
✅ RESTful API  
✅ MongoDB with Mongoose  
✅ Stripe payment processing  
✅ Real-time inventory tracking  
✅ Stock history audit trail  
✅ Role-based access control  
✅ Rate limiting & security  

---

## 📚 Documentation

- **[Full Setup Guide](README_FULLSTACK.md)** - Complete installation & configuration
- **[Architecture Overview](ARCHITECTURE.md)** - System design & data flow
- **[Testing Checklist](TESTING_CHECKLIST.md)** - Comprehensive testing guide
- **[Transformation Summary](TRANSFORMATION_SUMMARY.md)** - Project evolution details

---

## 🔐 Test Accounts

### Admin Account
- Email: `admin@mw.com`
- Password: `admin123`
- Access: Admin dashboard at `/admin`

### Customer Account
- Email: `customer@test.com`
- Password: `customer123`

---

## 💳 Stripe Test Cards

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Expiry:** Any future date
- **CVC:** Any 3 digits

---

## 📦 Tech Stack

### Frontend
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- GSAP Animations
- Lucide Icons

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe API
- Bcrypt

---

## 🏗️ Project Structure

```
MW/
├── server/              # Backend API
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Auth & validation
│   └── server.js       # Express app
│
├── src/                # Frontend app
│   ├── components/     # React components
│   ├── context/        # State management
│   ├── pages/          # Route pages
│   ├── services/       # API client
│   └── App.jsx         # Main app
│
└── Documentation files
```

---

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register  - Create account
POST /api/auth/login     - User login
GET  /api/auth/me        - Get current user
```

### Products
```
GET  /api/products           - List products
GET  /api/products/:id       - Get product
POST /api/products/check-stock - Validate stock
```

### Orders (Protected)
```
POST /api/orders/create-checkout-session - Start checkout
GET  /api/orders/my-orders   - User's orders
GET  /api/orders             - All orders (admin)
```

---

## 🛠️ Development

```bash
# Frontend development
npm run dev

# Backend development
cd server && npm run dev

# Seed database
cd server && npm run seed

# Build for production
npm run build
```

---

## 🚢 Deployment

### Backend
Deploy to: Railway, Render, Heroku
- Set environment variables
- Connect to MongoDB Atlas
- Configure Stripe webhooks

### Frontend
Deploy to: Vercel, Netlify
- Build: `npm run build`
- Set `VITE_API_URL` to backend URL

---

## 🔒 Security

- JWT token authentication
- Password hashing (bcrypt)
- CORS protection
- Rate limiting
- Input validation
- Helmet security headers
- Protected admin routes

---

## 📝 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mw-ecommerce
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for common issues and solutions.

---

## 📄 License

MIT License - Free to use for learning and commercial projects.

---

## 🤝 Contributing

This is a learning project. Feel free to fork and customize!

---

## 🎉 What's New

This project was transformed from a frontend-only demo into a **full-stack e-commerce platform** with:

✅ Complete backend API  
✅ Real database integration  
✅ Live payment processing  
✅ Actual inventory management  
✅ Production-ready architecture  

See [TRANSFORMATION_SUMMARY.md](TRANSFORMATION_SUMMARY.md) for details.

---

**Ready to build something amazing! 🚀**

