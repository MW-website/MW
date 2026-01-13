# MW E-Commerce Platform - Full-Stack Setup

## 🎯 Overview

A complete full-stack e-commerce platform with:
- ✅ **Backend API** (Node.js/Express/MongoDB)
- ✅ **User Authentication** (JWT-based)
- ✅ **Real-time Inventory Management**
- ✅ **Stripe Payment Processing**
- ✅ **Order Management System**
- ✅ **Admin Dashboard**
- ✅ **Secure Checkout Flow**

---

## 📋 Prerequisites

- **Node.js** v18+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **Stripe Account** (for payment processing)

---

## 🚀 Quick Start

### 1. Install MongoDB

**Windows (using Chocolatey):**
```powershell
choco install mongodb
```

**Or download from:** https://www.mongodb.com/try/download/community

**Start MongoDB:**
```powershell
mongod --dbpath C:\data\db
```

### 2. Setup Backend

```powershell
cd server
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mw-ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Seed the database:**
```powershell
npm run seed
```

**Start backend server:**
```powershell
npm run dev
```

Backend will run on: http://localhost:5000

### 3. Setup Frontend

```powershell
cd ..
npm install
```

Create `.env` file in root:
```env
VITE_API_URL=http://localhost:5000/api
```

**Start frontend:**
```powershell
npm run dev
```

Frontend will run on: http://localhost:5173

---

## 🔐 Test Accounts

### Admin Account
- **Email:** admin@mw.com
- **Password:** admin123
- **Access:** Full admin dashboard + inventory management

### Customer Account
- **Email:** customer@test.com
- **Password:** customer123
- **Access:** Shopping and order history

---

## 💳 Stripe Setup

### 1. Create Stripe Account
Visit: https://dashboard.stripe.com/register

### 2. Get API Keys
- Go to: https://dashboard.stripe.com/test/apikeys
- Copy **Secret key** (starts with `sk_test_`)
- Add to `server/.env` as `STRIPE_SECRET_KEY`

### 3. Test Card Numbers
Use these for testing:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits

### 4. Webhook Setup (Optional for production)
```powershell
# Install Stripe CLI
# Then forward webhooks:
stripe listen --forward-to localhost:5000/api/orders/webhook
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products/check-stock` - Check stock availability
- `POST /api/products` - Create product (admin)
- `PATCH /api/products/:id` - Update product (admin)
- `POST /api/products/:id/stock` - Update stock (admin)

### Orders
- `POST /api/orders/create-checkout-session` - Create Stripe checkout
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

---

## 🎨 Features

### Customer Features
1. **Browse Products** - Filter by category, price, search
2. **Shopping Cart** - Add/remove items, update quantities
3. **Wishlist** - Save favorite items
4. **Secure Checkout** - Stripe payment integration
5. **Order History** - Track all orders and statuses
6. **User Authentication** - Register, login, profile management

### Admin Features
1. **Inventory Management** - Update stock levels in real-time
2. **Order Management** - View and update order statuses
3. **Product Management** - CRUD operations on products
4. **Stock History** - Track all inventory changes
5. **Dashboard Analytics** - Overview of products and orders

---

## 🏗️ Project Structure

```
MW/
├── server/                 # Backend application
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── scripts/           # Database seeding
│   └── server.js          # Express server
│
├── src/                   # Frontend application
│   ├── components/        # React components
│   ├── context/           # Context providers
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── styles/            # CSS styles
│
└── README_FULLSTACK.md    # This file
```

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Helmet security headers
- Input validation
- Protected admin routes

---

## 📊 Database Models

### User
- Email, password (hashed)
- Name, role (customer/admin)
- Address, phone
- Stripe customer ID

### Product
- Name, description, price
- Category, tags, colors, sizes
- Stock quantity
- Stock history tracking
- Images, ratings

### Order
- Order number
- User reference
- Items array
- Shipping address
- Payment info (Stripe)
- Status tracking
- Timestamps

---

## 🛠️ Development

### Backend Development
```powershell
cd server
npm run dev  # Auto-restarts on changes
```

### Frontend Development
```powershell
npm run dev  # Hot module replacement
```

### Build for Production
```powershell
# Frontend
npm run build

# Backend (runs as-is)
cd server
npm start
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```powershell
# Check if MongoDB is running
mongosh

# Start MongoDB service
net start MongoDB
```

### Port Already in Use
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Stripe Webhook Errors
- Make sure webhook secret matches in `.env`
- Use Stripe CLI for local testing
- Check webhook endpoint: `/api/orders/webhook`

---

## 📝 Environment Variables

### Backend (.env in server/)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mw-ecommerce
JWT_SECRET=<generate-strong-secret>
STRIPE_SECRET_KEY=<your-stripe-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-secret>
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚢 Deployment

### Backend (Node.js)
- Deploy to: Heroku, Railway, Render, or AWS
- Set environment variables
- Use MongoDB Atlas for database

### Frontend (Vite/React)
- Deploy to: Vercel, Netlify, or Cloudflare Pages
- Update `VITE_API_URL` to production backend URL
- Run `npm run build`

---

## 📄 License

MIT License - Feel free to use this project for learning and commercial purposes.

---

## 🤝 Support

For issues or questions:
1. Check MongoDB is running
2. Verify all environment variables are set
3. Ensure both frontend and backend are running
4. Check browser console for errors

---

## ✨ Next Steps

1. Test the checkout flow with Stripe test cards
2. Access admin dashboard at `/admin` (login as admin@mw.com)
3. Manage inventory and orders from admin panel
4. Create new customer accounts and place orders
5. Monitor real-time stock updates

**Happy Coding! 🎉**
