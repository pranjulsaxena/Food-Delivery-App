
# 🍔 InstaFood – Full Stack Food Delivery App  

[![Node.js](https://img.shields.io/badge/Node: MIT](https://img.shields.io/badge/License-MIT-yellow.svg Docs](https://img.shields.io/badge/API%20Docs-Swagger-99o4.onrender.com/api-docs Render](https://img.shields.io/badge/Deployed%20on-Render Status](https://img.shields://instafood-99o4.onrender **full-stack food delivery** application where users can browse menus, place orders, and make secure payments via Stripe.  
Built with **React + Vite + TypeScript** (frontend) and **Node.js + Express + TypeScript + MongoDB** (backend).  
Includes **live, interactive API documentation** via Swagger UI.

***

## 🚀 Live Links
- **App / API Base:** [https://instafood-99o4.onrender.com](https://instafood-99o4.onrender.com)  
- **Swagger API Docs:** [https://instafood-99o4.onrender.com/api-docs](https://instafood-99o4.onrender.com/api-docs)  

***

## 📜 Features
- Responsive SPA frontend with **React + Vite**
- Secure **JWT authentication** (HTTP-only cookies)
- Restaurant browse, search, and ordering system
- Stripe online payments with webhook handling
- Interactive **Swagger UI** API docs
- TypeScript end-to-end
- Ready to deploy on **Render**

***

## 🛠 Tech Stack
**Frontend:** React, Vite, TypeScript, Axios, CSS  
**Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Stripe, Swagger UI  
**Tools:** Nodemon, tsx, tsc, dotenv, cookie-parser, cors

***

## 📂 Project Structure
```
Food-Delivery-App/
├── Client/                      # React + Vite frontend (TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable React components (UI elements)
│   │   ├── pages/               # Page-level components (routes/views)
│   │   └── ...                  # Other frontend-specific logic/files
│   ├── store/                   # Zustand store (state management)
│   └── public/                  # Static assets (favicon, images, etc.)
│
├── Server/                      # Express + TypeScript backend
│   ├── controllers/             # Route handler functions (business logic)
│   ├── db/                      # Database connection and initialization
│   ├── middlewares/              # Express middleware (auth, error handling, etc.)
│   ├── models/                   # Mongoose/MongoDB schemas
│   ├── routes/                   # API route definitions (Swagger-annotated)
│   ├── utils/                    # Helper utilities and configurations
│   │   ├── swagger.ts            # Swagger/OpenAPI configuration
│   │   └── mailtrap/             # Mailtrap email utilities
│   │       ├── mailtrap.ts       # Mailtrap API client & sender config
│   │       ├── Email_UI.ts       # HTML email templates (welcome, reset, verification)
│   │       └── email.ts          # Functions to send verification, welcome, reset emails
│   └── index.ts                  # Backend server entrypoint
│
├── package.json                  # Root package configuration
└── README.md                     # Project documentation

```

***

## ⚙️ Environment Variables
# -----------------------------
# Server Configuration
# -----------------------------
PORT=5000                                # Port on which the server will run
MONGO_URI=your_mongodb_connection_string # MongoDB connection URI
SECRET_KEY=your_jwt_secret_key           # JWT signing key for authentication

# -----------------------------
# Cloudinary (Image Uploads)
# -----------------------------
CLOUD_NAME=your_cloudinary_cloud_name    # Your Cloudinary account name
API_KEY=your_cloudinary_api_key          # Cloudinary API key
API_SECRET=your_cloudinary_api_secret    # Cloudinary API secret

# -----------------------------
# Mailtrap (Email Service)
# -----------------------------
MAILTRAP_API_TOKEN=your_mailtrap_api_token # Mailtrap API token for sending emails

# -----------------------------
# Stripe (Payments)
# -----------------------------
STRIPE_PUBLISHABLE_KEY=pk_test_xxx           # Stripe publishable key (frontend)
STRIPE_SECRET_KEY=sk_test_xxx                # Stripe secret key (backend)
STRIPE_WEBHOOK_SECRET=whsec_xxx               # Stripe webhook signing secret
WEBHOOK_ENDPOINT_SECRET=optional_extra_secret # Optional extra endpoint secret

# -----------------------------
# Frontend URL
# -----------------------------
FRONTEND_URL=https://your-frontend-domain.com # URL of your deployed frontend


***

## 📦 Scripts

| Command | Action |
|---------|--------|
| `npm install` | Install backend deps |
| `npm install --prefix Client` | Install frontend deps |
| `npm run dev` | Start backend (dev) |
| `npm run dev --prefix Client` | Start frontend (dev) |
| `npm run build` | Build frontend for production |
| `npm start` | Start backend (prod) |

***

## 💻 Local Development
**Backend:**
```bash
npm run dev
```
**Frontend:**
```bash
npm run dev --prefix Client
```
- Local Frontend → [http://localhost:5173](http://localhost:5173)  
- Local Swagger UI → [http://localhost:5000/api-docs](http://localhost:5000/api-docs)  

***

## 🌐 Deployment on Render
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- Add all `.env` variables in Render dashboard

***

## 📄 API Overview (Full details in Swagger)
**Auth**
- `POST /api/v1/user/signup` → Register
- `POST /api/v1/user/login` → Login
- `POST /api/v1/user/verify-email` → Verify email
- `POST /api/v1/user/logout` → Logout
- `POST /api/v1/user/forgot-password` → Request reset email
- `POST /api/v1/user/reset-password/{token}` → Reset password
- `GET  /api/v1/user/check-auth` → Check auth status

**Profile**
- `PUT /api/v1/user/profile/update` → Update profile

**Restaurant**
- `POST /api/v1/restaurant` → Create restaurant
- `GET  /api/v1/restaurant` → Get my restaurant
- `PUT /api/v1/restaurant` → Update restaurant
- `GET  /api/v1/restaurant/orders` → Get restaurant orders
- `PUT /api/v1/restaurant/orders/{orderId}/status` → Update order status
- `GET  /api/v1/restaurant/search/{text}` → Search restaurants
- `GET  /api/v1/restaurant/{id}` → Get restaurant by ID

**Menu**
- `POST /api/v1/menu` → Create menu item
- `PUT /api/v1/menu/{id}` → Update menu item

**Order**
- `GET  /api/v1/order` → Get user orders
- `POST /api/v1/order/checkout/create-checkout-session` → Stripe checkout
- `POST /api/v1/order/webhook/stripe` → Stripe webhook

***

## 📷 Screenshots


***

## 📜 License
MIT License – feel free to use and modify.
