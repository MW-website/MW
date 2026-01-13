# ✅ MW E-Commerce Platform - Testing Checklist

## 🚦 Pre-Flight Checks

### Environment Setup
- [ ] MongoDB installed and running
- [ ] Node.js v18+ installed
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `server/.env` file created with proper values
- [ ] `.env` file created in root directory
- [ ] Database seeded (`cd server && npm run seed`)

### Services Running
- [ ] MongoDB running on port 27017
- [ ] Backend server running on http://localhost:5000
- [ ] Frontend dev server running on http://localhost:5173
- [ ] Backend health check: http://localhost:5000/health

---

## 🧪 Feature Testing

### 1. User Authentication ✅

#### Registration
- [ ] Visit http://localhost:5173/register
- [ ] Fill in name, email, password
- [ ] Submit form
- [ ] ✓ User created successfully
- [ ] ✓ Redirected to home page
- [ ] ✓ User info visible in header/profile

#### Login
- [ ] Visit http://localhost:5173/login
- [ ] Test with: admin@mw.com / admin123
- [ ] Submit form
- [ ] ✓ Login successful
- [ ] ✓ JWT token stored in localStorage
- [ ] ✓ User info displayed

#### Protected Routes
- [ ] Try accessing /checkout without login
- [ ] ✓ Redirected to login page
- [ ] Login and try again
- [ ] ✓ Access granted

---

### 2. Product Browsing ✅

#### Product List
- [ ] Visit http://localhost:5173/shop
- [ ] ✓ Products load from backend API
- [ ] ✓ Images display correctly
- [ ] ✓ Prices shown
- [ ] ✓ Stock levels visible

#### Filtering
- [ ] Use category filter
- [ ] ✓ Products filtered correctly
- [ ] Use price range filter
- [ ] ✓ Results update
- [ ] Search for product
- [ ] ✓ Search results shown

#### Product Details
- [ ] Click on a product
- [ ] ✓ Product page loads
- [ ] ✓ All details displayed
- [ ] ✓ Add to cart button works
- [ ] ✓ Stock availability shown

---

### 3. Shopping Cart ✅

#### Add to Cart
- [ ] Add product from shop page
- [ ] ✓ Toast notification shown
- [ ] ✓ Cart count updates in header
- [ ] ✓ Item stored in localStorage

#### Cart Management
- [ ] Open cart drawer/modal
- [ ] ✓ Items displayed
- [ ] Increase quantity
- [ ] ✓ Quantity updates
- [ ] ✓ Total recalculates
- [ ] Remove item
- [ ] ✓ Item removed

---

### 4. Checkout & Payment 🔥

#### Stock Validation
- [ ] Add items to cart
- [ ] Go to checkout
- [ ] ✓ Stock checked before payment
- [ ] Try to order more than available
- [ ] ✓ Error message shown

#### Shipping Form
- [ ] Fill in shipping information:
  - Name: Test Customer
  - Email: test@test.com
  - Street: 123 Main St
  - City: New York
  - State: NY
  - ZIP: 10001
  - Country: US
- [ ] ✓ All fields validated
- [ ] Click "Proceed to Payment"

#### Stripe Integration
- [ ] ✓ Redirected to Stripe Checkout
- [ ] ✓ Correct items shown
- [ ] ✓ Correct total amount
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Expiry: 12/34
- [ ] CVC: 123
- [ ] Click "Pay"
- [ ] ✓ Payment processed
- [ ] ✓ Redirected to success page

#### Order Creation
- [ ] Check backend logs
- [ ] ✓ Webhook received from Stripe
- [ ] ✓ Order created in database
- [ ] ✓ Stock quantities reduced
- [ ] ✓ Order visible in order history

---

### 5. Order History ✅

#### View Orders
- [ ] Visit http://localhost:5173/orders
- [ ] ✓ Past orders displayed
- [ ] ✓ Order numbers shown
- [ ] ✓ Order status visible
- [ ] ✓ Items listed
- [ ] ✓ Total amount shown
- [ ] ✓ Order date displayed

#### Order Details
- [ ] Click on an order
- [ ] ✓ Full details shown
- [ ] ✓ Shipping address
- [ ] ✓ Payment info (last 4 digits)
- [ ] ✓ Status history

---

### 6. Admin Dashboard 👑

#### Access Control
- [ ] Logout if logged in
- [ ] Try to access http://localhost:5173/admin
- [ ] ✓ Redirected away (not admin)
- [ ] Login as: admin@mw.com / admin123
- [ ] Visit /admin again
- [ ] ✓ Dashboard loads

#### Inventory Management
- [ ] View products table
- [ ] ✓ All products listed
- [ ] ✓ Stock levels shown
- [ ] ✓ Low stock highlighted
- [ ] Click "Update Stock" on a product
- [ ] Change stock quantity
- [ ] Set action to "Add" or "Set"
- [ ] Click "Save"
- [ ] ✓ Stock updated in database
- [ ] ✓ Stock history recorded
- [ ] Refresh page
- [ ] ✓ New stock value persists

#### Order Management
- [ ] Click "Orders" tab
- [ ] ✓ All orders listed
- [ ] ✓ Customer info shown
- [ ] ✓ Order status visible
- [ ] Change order status dropdown
- [ ] Select new status (e.g., "shipped")
- [ ] ✓ Status updated
- [ ] ✓ Status history recorded
- [ ] Check customer's order history
- [ ] ✓ Status reflected

---

### 7. Real-Time Inventory ⚡

#### Stock Deduction on Purchase
1. Note current stock of a product: ______
2. Place an order for 3 units
3. Payment successful
4. Check product stock again
5. ✓ Stock reduced by 3
6. Check stock history in database
7. ✓ Sale recorded with reason

#### Stock Validation
1. Find product with stock = 5
2. Try to order 10 units
3. ✓ Error: Insufficient stock
4. Try to order 3 units
5. ✓ Order succeeds
6. Stock now = 2

#### Admin Stock Update
1. Admin updates stock from 10 to 50
2. ✓ Stock updated immediately
3. ✓ History shows "+40 restock"
4. Customers see new stock level
5. ✓ Can now order up to 50 units

---

### 8. API Testing 🔧

#### Health Check
```powershell
curl http://localhost:5000/health
```
- [ ] ✓ Returns status: ok

#### Products API
```powershell
curl http://localhost:5000/api/products
```
- [ ] ✓ Returns products array
- [ ] ✓ Includes pagination

#### Auth API (Register)
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"newuser@test.com","password":"test123"}'
```
- [ ] ✓ Returns user and token

#### Protected Route (Without Token)
```powershell
curl http://localhost:5000/api/orders/my-orders
```
- [ ] ✓ Returns 401 Unauthorized

#### Protected Route (With Token)
```powershell
$token = "your_jwt_token_here"
curl http://localhost:5000/api/orders/my-orders `
  -H "Authorization: Bearer $token"
```
- [ ] ✓ Returns orders array

---

### 9. Security Testing 🔒

#### Authentication
- [ ] Try accessing /api/orders without token
- [ ] ✓ 401 error
- [ ] Try accessing /api/products/:id/stock without admin role
- [ ] ✓ 403 Forbidden

#### Rate Limiting
- [ ] Make 150 requests rapidly to any endpoint
- [ ] ✓ Rate limit kicks in (after 100)
- [ ] ✓ 429 Too Many Requests returned

#### Input Validation
- [ ] Try to register with invalid email
- [ ] ✓ Validation error
- [ ] Try to register with short password (<6 chars)
- [ ] ✓ Validation error
- [ ] Try to create product with negative price (admin)
- [ ] ✓ Validation error

#### Password Security
- [ ] Check database directly
- [ ] ✓ Passwords are hashed
- [ ] ✓ Not readable in plaintext

---

### 10. Error Handling 🚨

#### Network Errors
- [ ] Stop backend server
- [ ] Try to load products
- [ ] ✓ Error message shown
- [ ] ✓ Graceful fallback

#### Not Found
- [ ] Visit /api/products/invalid-id
- [ ] ✓ 404 error
- [ ] ✓ Error message

#### Validation Errors
- [ ] Submit empty form
- [ ] ✓ Required field errors shown
- [ ] ✓ User-friendly messages

---

## 🎯 Performance Testing

### Load Time
- [ ] Check initial page load
- [ ] ✓ Loads in <3 seconds
- [ ] Check product list load
- [ ] ✓ Loads in <2 seconds

### API Response Time
- [ ] Check /api/products response time
- [ ] ✓ <500ms
- [ ] Check /api/orders response time
- [ ] ✓ <500ms

---

## 🗄️ Database Verification

### MongoDB Checks
```javascript
// Connect to MongoDB
mongosh mw-ecommerce

// Check collections
show collections

// Count documents
db.users.countDocuments()    // Should be 2+ (admin + customer)
db.products.countDocuments()  // Should be 5+
db.orders.countDocuments()    // Should match orders placed

// Check a product's stock history
db.products.findOne({ name: "Classic White T-Shirt" }).stockHistory

// Check an order
db.orders.findOne({}).shippingAddress
```

- [ ] ✓ All collections exist
- [ ] ✓ Data properly structured
- [ ] ✓ Relationships correct
- [ ] ✓ Stock history tracked

---

## 🐛 Common Issues Checklist

### Backend Won't Start
- [ ] MongoDB is running
- [ ] .env file exists and has correct values
- [ ] Dependencies installed
- [ ] Port 5000 is not in use

### Frontend Can't Connect to Backend
- [ ] Backend is running
- [ ] VITE_API_URL is set correctly
- [ ] CORS configured properly
- [ ] Check browser console for errors

### Stripe Checkout Fails
- [ ] STRIPE_SECRET_KEY is set
- [ ] Using test mode key (sk_test_...)
- [ ] Valid test card number used
- [ ] Webhook endpoint accessible

### Orders Not Created
- [ ] Webhook received (check logs)
- [ ] Stock available
- [ ] User authenticated
- [ ] Items array not empty

---

## ✅ Final Verification

### Production Readiness
- [ ] All tests passing
- [ ] No console errors
- [ ] API responses correct
- [ ] Database operations working
- [ ] Authentication secure
- [ ] Payments processing
- [ ] Inventory updating
- [ ] Admin panel functional
- [ ] Error handling graceful
- [ ] Performance acceptable

### Documentation
- [ ] README_FULLSTACK.md complete
- [ ] TRANSFORMATION_SUMMARY.md reviewed
- [ ] ARCHITECTURE.md understood
- [ ] Environment variables documented
- [ ] API endpoints documented

---

## 🎉 Success Criteria

✅ Users can register and login  
✅ Products load from database  
✅ Cart functionality works  
✅ Checkout flow completes  
✅ Stripe payment processes  
✅ Orders created in database  
✅ Stock automatically updates  
✅ Order history displays  
✅ Admin can manage inventory  
✅ Admin can manage orders  
✅ Real-time stock tracking works  
✅ Security measures in place  

---

## 📊 Test Results Template

```
Test Date: __________
Tester: __________

Environment:
✅ MongoDB Version: __________
✅ Node Version: __________
✅ Backend Port: 5000
✅ Frontend Port: 5173

Results:
✅ Authentication: PASS / FAIL
✅ Product Browse: PASS / FAIL
✅ Shopping Cart: PASS / FAIL
✅ Checkout: PASS / FAIL
✅ Payment: PASS / FAIL
✅ Order History: PASS / FAIL
✅ Admin Dashboard: PASS / FAIL
✅ Inventory Management: PASS / FAIL
✅ Order Management: PASS / FAIL
✅ Security: PASS / FAIL

Overall: PASS / FAIL

Notes:
_________________________________
_________________________________
```

---

**Once all items are checked, your full-stack e-commerce platform is ready! 🚀**
