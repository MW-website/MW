# 🚀 MW E-Commerce - Quick Reference Card

## ⚡ Start Commands

```bash
# Start MongoDB
mongod --dbpath C:\data\db

# Backend (Terminal 1)
cd server && npm run dev

# Frontend (Terminal 2)  
npm run dev
```

---

## 🔗 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| Admin Dashboard | http://localhost:5173/admin |

---

## 🔐 Test Credentials

```
Admin
  Email: admin@mw.com
  Password: admin123

Customer  
  Email: customer@test.com
  Password: customer123
```

---

## 💳 Stripe Test Cards

```
Success:  4242 4242 4242 4242
Decline:  4000 0000 0000 0002
Expiry:   12/34 (any future date)
CVC:      123 (any 3 digits)
```

---

## 📡 API Endpoints

### Auth
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Products
```
GET  /api/products
GET  /api/products/:id
POST /api/products/check-stock
POST /api/products (admin)
POST /api/products/:id/stock (admin)
```

### Orders
```
POST /api/orders/create-checkout-session
GET  /api/orders/my-orders
GET  /api/orders (admin)
PATCH /api/orders/:id/status (admin)
```

---

## 🗄️ MongoDB Quick Commands

```javascript
// Connect
mongosh mw-ecommerce

// View collections
show collections

// Count documents
db.users.countDocuments()
db.products.countDocuments()
db.orders.countDocuments()

// Find one
db.products.findOne({ name: "Classic White T-Shirt" })
db.orders.findOne({})

// Check stock history
db.products.findOne({}, { stockHistory: 1, name: 1, stock: 1 })
```

---

## 📂 Key Files

```
Configuration:
  server/.env           - Backend config
  .env                  - Frontend config

Database:
  server/models/        - Mongoose models
  server/scripts/       - Seed script

API:
  server/routes/        - API routes
  server/middleware/    - Auth middleware

Frontend:
  src/services/api.js   - API client
  src/context/          - State management
  src/pages/            - Route pages
```

---

## 🛠️ Useful Scripts

```bash
# Seed database
cd server && npm run seed

# Install dependencies
npm install
cd server && npm install

# Build for production
npm run build

# Run automated setup
powershell -ExecutionPolicy Bypass -File ./setup.ps1
```

---

## 🐛 Troubleshooting

### MongoDB not starting
```bash
# Create data directory
New-Item -ItemType Directory -Force -Path C:\data\db
```

### Port 5000 in use
```bash
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Clear local storage (if auth issues)
```javascript
// In browser console
localStorage.clear()
```

### Reset database
```bash
cd server
npm run seed
```

---

## 📊 User Flows

### Customer Purchase
```
1. Browse /shop
2. Add to cart
3. /checkout
4. Fill shipping info
5. Pay with Stripe
6. View /orders
```

### Admin Management
```
1. Login as admin
2. Go to /admin
3. Update stock
4. Manage orders
5. Update statuses
```

---

## 🔑 Environment Variables

### server/.env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mw-ecommerce
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
```

### .env (root)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Main overview |
| README_FULLSTACK.md | Complete setup guide |
| ARCHITECTURE.md | System design |
| TESTING_CHECKLIST.md | Test procedures |
| TRANSFORMATION_SUMMARY.md | Project details |
| QUICK_REFERENCE.md | This file |

---

## 🎯 Feature Checklist

✅ User Registration/Login  
✅ Product Browsing  
✅ Cart Management  
✅ Stripe Checkout  
✅ Order History  
✅ Admin Dashboard  
✅ Inventory Management  
✅ Order Management  
✅ Real-time Stock Updates  
✅ Stock History Tracking  

---

## 📞 Getting Help

1. Check [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)
2. Review [README_FULLSTACK.md](README_FULLSTACK.md)
3. Verify all services running
4. Check browser console
5. Check backend logs

---

## 🎉 Quick Test

```bash
# 1. Verify backend
curl http://localhost:5000/health

# 2. Get products
curl http://localhost:5000/api/products

# 3. Login (replace with actual values)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"customer123"}'
```

---

**Keep this handy while developing! 📌**
