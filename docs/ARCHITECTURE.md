# MW E-Commerce Platform - System Architecture

## 📊 Complete System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                     (React + Vite App)                          │
│                   http://localhost:5173                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pages:                    Components:               Context:    │
│  • Home                   • Header                  • Auth       │
│  • Shop                   • ProductCard             • Cart       │
│  • Product Details        • CartDrawer              • Wishlist   │
│  • Login/Register         • QuickView               • Toast      │
│  • Checkout              • CategorySidebar          • Theme      │
│  • Order History         • Toast                                │
│  • Admin Dashboard       • Footer                               │
│                                                                  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ HTTPS REST API
                       │ (JWT Auth Headers)
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                     API LAYER                                    │
│                (Express.js Server)                              │
│                 http://localhost:5000                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Middleware:              Routes:                               │
│  • CORS                  /api/auth/*                            │
│  • Helmet                  - POST /register                     │
│  • Rate Limiter            - POST /login                        │
│  • JWT Auth                - GET /me                            │
│  • Validation                                                   │
│                          /api/products/*                        │
│                            - GET / (list)                       │
│                            - GET /:id                           │
│                            - POST /check-stock                  │
│                            - POST / (admin)                     │
│                            - PATCH /:id (admin)                 │
│                            - POST /:id/stock (admin)            │
│                                                                  │
│                          /api/orders/*                          │
│                            - POST /create-checkout-session      │
│                            - POST /webhook (Stripe)             │
│                            - GET /my-orders                     │
│                            - GET /:id                           │
│                            - GET / (admin)                      │
│                            - PATCH /:id/status (admin)          │
│                                                                  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ Mongoose ODM
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                   DATABASE LAYER                                 │
│                   (MongoDB)                                      │
│              mongodb://localhost:27017                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Collections:                                                    │
│                                                                  │
│  users                    products                 orders        │
│  ├─ _id                   ├─ _id                  ├─ _id       │
│  ├─ email                 ├─ name                 ├─ orderNumber│
│  ├─ password (hashed)     ├─ slug                 ├─ user (ref) │
│  ├─ name                  ├─ description          ├─ items[]    │
│  ├─ role (enum)           ├─ price                ├─ shipping   │
│  ├─ address               ├─ category             ├─ payment    │
│  ├─ phone                 ├─ tags[]               ├─ subtotal   │
│  ├─ stripeCustomerId      ├─ image                ├─ tax        │
│  ├─ isActive              ├─ images[]             ├─ total      │
│  ├─ createdAt             ├─ colors[]             ├─ status     │
│  └─ updatedAt             ├─ sizes[]              ├─ history[]  │
│                           ├─ stock ⚡              ├─ tracking   │
│                           ├─ stockHistory[]       ├─ createdAt  │
│                           ├─ rating               └─ updatedAt  │
│                           ├─ reviews                            │
│                           ├─ onSale                             │
│                           ├─ featured                           │
│                           ├─ isActive                           │
│                           ├─ createdAt                          │
│                           └─ updatedAt                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Stripe Payment Gateway                                          │
│  https://api.stripe.com                                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ Checkout Session → Payment → Webhook → Order         │      │
│  │                                                       │      │
│  │ 1. Client requests checkout session                  │      │
│  │ 2. Backend creates Stripe session                    │      │
│  │ 3. Client redirects to Stripe                        │      │
│  │ 4. User completes payment                            │      │
│  │ 5. Stripe sends webhook to backend                   │      │
│  │ 6. Backend creates order & updates stock             │      │
│  │ 7. User redirected to success page                   │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### 1. User Registration Flow
```
User Browser                API Server              Database
     │                          │                       │
     │──── POST /register ─────▶│                       │
     │     {email, pass, name}  │                       │
     │                          │                       │
     │                          │──── Validate ────────▶│
     │                          │──── Hash Password     │
     │                          │──── Create User ─────▶│
     │                          │                       │
     │                          │◀──── User Created ────│
     │                          │                       │
     │◀─── JWT Token + User ────│                       │
     │                          │                       │
     │─ Store token in local ───│                       │
     │                          │                       │
```

### 2. Checkout & Payment Flow
```
Client              Backend              Stripe           MongoDB
  │                    │                    │                │
  │─── Checkout ──────▶│                    │                │
  │   (cart items)     │                    │                │
  │                    │                    │                │
  │                    │─── Check Stock ───▶│                │
  │                    │◀─── Stock OK ──────│                │
  │                    │                    │                │
  │                    │─── Create Session ─▶│               │
  │                    │◀─── Session URL ────│               │
  │                    │                    │                │
  │◀─ Redirect URL ────│                    │                │
  │                    │                    │                │
  │────── Stripe Payment UI ──────────────▶│                │
  │                    │                    │                │
  │                    │◀─── Webhook ───────│                │
  │                    │    (payment_intent) │               │
  │                    │                    │                │
  │                    │─── Create Order ───────────────────▶│
  │                    │─── Update Stock ───────────────────▶│
  │                    │                    │                │
  │◀─ Success Page ────│                    │                │
```

### 3. Admin Inventory Update Flow
```
Admin Dashboard         API Server           MongoDB
       │                     │                   │
       │── Update Stock ────▶│                   │
       │   (product, qty)    │                   │
       │                     │                   │
       │                     │─── Auth Check ───▶│
       │                     │    (admin role)    │
       │                     │                   │
       │                     │─── Get Product ──▶│
       │                     │◀─── Product ──────│
       │                     │                   │
       │                     │─── Update Stock ─▶│
       │                     │    + Add History   │
       │                     │◀─── Updated ──────│
       │                     │                   │
       │◀─ Success + New ────│                   │
       │     Stock Value     │                   │
```

### 4. Product Search & Filter Flow
```
Shop Page              API Server           MongoDB
    │                      │                   │
    │─── GET /products ───▶│                   │
    │  ?category=Dresses    │                   │
    │  &minPrice=50         │                   │
    │  &inStock=true        │                   │
    │  &page=1              │                   │
    │                      │                   │
    │                      │─── Build Query ──▶│
    │                      │    {                │
    │                      │      category: ..   │
    │                      │      price: {$gte}  │
    │                      │      stock: {$gt:0} │
    │                      │    }                │
    │                      │                   │
    │                      │◀─── Products[] ────│
    │                      │                   │
    │◀─── Products + ──────│                   │
    │     Pagination       │                   │
    │                      │                   │
    │─── Render Grid ──────│                   │
```

---

## 🔐 Authentication Flow

```
┌────────────────────────────────────────────────────────────┐
│                    JWT Authentication                       │
└────────────────────────────────────────────────────────────┘

1. LOGIN
   User → POST /api/auth/login → Server validates → 
   → Generate JWT Token → Return to client → 
   → Store in localStorage

2. AUTHENTICATED REQUEST
   Client reads token from localStorage →
   → Adds to Authorization header →
   → Server verifies JWT →
   → Extracts user ID →
   → Loads user from DB →
   → Attaches to req.user →
   → Proceeds to route handler

3. PROTECTED ROUTE
   Client request →
   → authenticate middleware →
   → authorize middleware (check role) →
   → Route handler

4. TOKEN EXPIRY
   Token expires (7 days) →
   → Server returns 401 →
   → Client clears token →
   → Redirects to login
```

---

## 📦 Database Relationships

```
┌──────────────┐
│    users     │
└──────┬───────┘
       │
       │ 1:N (one user has many orders)
       │
       ▼
┌──────────────┐        ┌──────────────┐
│   orders     │───────▶│   products   │
└──────────────┘   N:M  └──────────────┘
                   (order items
                    reference products)

Order.items = [
  {
    product: ObjectId → references products._id
    name: String (denormalized)
    price: Number (snapshot at purchase)
    quantity: Number
  }
]
```

---

## 🚀 Deployment Architecture (Production)

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                      │
│                   https://mw-store.com                   │
├──────────────────────────────────────────────────────────┤
│  • Static build (npm run build)                          │
│  • CDN distribution                                       │
│  • Auto SSL                                              │
│  • Environment: VITE_API_URL=backend_url                 │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTPS
                     │
┌────────────────────▼─────────────────────────────────────┐
│               BACKEND (Railway/Render)                    │
│              https://api.mw-store.com                    │
├──────────────────────────────────────────────────────────┤
│  • Node.js server                                         │
│  • Environment variables                                  │
│  • Auto-deploy from Git                                   │
│  • Health checks                                          │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ├────────────────┬─────────────────┐
                     │                │                 │
                     ▼                ▼                 ▼
         ┌───────────────┐  ┌──────────────┐  ┌─────────────┐
         │ MongoDB Atlas │  │    Stripe    │  │  SendGrid   │
         │   (Database)  │  │  (Payments)  │  │   (Email)   │
         └───────────────┘  └──────────────┘  └─────────────┘
```

---

## 📊 Inventory Management Logic

```
Product Stock Tracking:

Initial Stock: 100

EVENT 1: Admin Restocks (+50)
├─ New Stock: 150
└─ History: { quantity: +50, type: 'restock', reason: 'New shipment' }

EVENT 2: Customer Orders (Qty: 3)
├─ Stock Check: 150 >= 3 ✓
├─ Stock Reduced: 147
└─ History: { quantity: -3, type: 'sale', reason: 'Order ORD-12345' }

EVENT 3: Admin Adjusts (Set to 140)
├─ Difference: 140 - 147 = -7
├─ Stock Set: 140
└─ History: { quantity: -7, type: 'adjustment', reason: 'Inventory audit' }

Stock History Array:
[
  { quantity: +50, type: 'restock', timestamp: '2026-01-10' },
  { quantity: -3, type: 'sale', timestamp: '2026-01-11' },
  { quantity: -7, type: 'adjustment', timestamp: '2026-01-12' }
]
```

---

## 🎯 API Response Examples

### GET /api/products
```json
{
  "products": [
    {
      "_id": "65a1b2c3d4e5f6...",
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "stock": 150,
      "category": "Tops",
      "image": "https://...",
      "rating": 4.5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

### POST /api/auth/login
```json
{
  "user": {
    "_id": "65a1b2c3...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/orders/create-checkout-session
```json
{
  "sessionId": "cs_test_a1b2c3...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

---

## ⚡ Performance Considerations

1. **Database Indexing**
   - Product: name (text), category, stock
   - Order: user, status, orderNumber
   - User: email (unique)

2. **Caching Strategy** (Future)
   - Redis for session storage
   - Product catalog caching
   - Rate limit storage

3. **Query Optimization**
   - Pagination on all list endpoints
   - Selective field projection
   - Population only when needed

4. **Frontend Optimization**
   - Code splitting per route
   - Image lazy loading
   - API response caching (React Query)
   - Debounced search

---

This architecture provides a scalable, secure, and maintainable 
foundation for a production e-commerce platform! 🚀
