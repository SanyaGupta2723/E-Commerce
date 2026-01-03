# 🛒 Full Stack E-Commerce Web Application

A modern full-stack **E-Commerce Web Application** built using **React + TypeScript (Vite)** on the frontend and **Node.js + Express + MongoDB Atlas** on the backend. This project is designed to handle **hundreds or thousands of products dynamically** without manually adding products in frontend code.

---

## 🚀 Project Overview

This project was initially started with **static mock data**, but later fully upgraded to a **real backend-driven system** where products are fetched directly from the database using APIs.

Key focus of this project:

* Real-world e-commerce flow
* Backend API integration
* Scalable product handling
* Clean and reusable UI components

---

## 🧠 What We Built (Step-by-Step)

### 1️⃣ Frontend (React + TypeScript)

Frontend is built using **Vite + React + TypeScript** with Tailwind CSS for styling.

Key pages:

* **Home Page** – Hero section + Trending products + Categories
* **Shop Page** – Displays all products with filters & sorting
* **Product Detail Page** – Individual product view
* **Cart Page** – Add to cart functionality

Important components:

* `ProductCard.tsx`
* `HomePage.tsx`
* `ShopPage.tsx`
* `ProductDetailPage.tsx`

State management is handled using **React Context API** (`AppContext`).

---

### 2️⃣ Backend (Node.js + Express)

Backend is built using **Node.js + Express.js**.

Main responsibilities:

* Provide product APIs
* Handle pagination
* Connect to MongoDB Atlas

Main API endpoints:

* `GET /api/products` → Fetch all products (with pagination)
* `GET /api/products/:id` → Fetch single product

---

### 3️⃣ Database (MongoDB Atlas)

Products are stored in **MongoDB Atlas** using a `Product` schema.

Product fields:

* name
* description
* price
* imageUrl
* category
* stock
* ratings

This allows us to store **100s or 1000s of products easily**.

---

### 4️⃣ CSV Bulk Upload (Most Important Feature ✅)

Instead of manually adding products one by one:

✔ Products are added using a **CSV file**
✔ CSV is imported using a Node script
✔ Data is directly inserted into MongoDB

This makes the app **scalable and real-world ready**.

---

## 🔁 How Data Flows in the Project

1. Products are stored in MongoDB Atlas
2. Backend fetches products using APIs
3. Frontend calls APIs using Axios
4. UI updates automatically with real data

No hardcoded products in frontend anymore 🚫

---

## ⚙️ Tech Stack Used

### Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## ✨ Key Features

* ✅ Real backend integration
* ✅ Pagination support
* ✅ Product detail page
* ✅ Add to cart
* ✅ Category-based filtering
* ✅ Scalable product management
* ✅ Clean & reusable UI

---

## 📌 Why This Project Is Important

This project is **not just UI-based** — it demonstrates:

* Real API usage
* Backend + frontend integration
* Database handling
* Industry-level architecture

Perfect for:

* College projects
* Resume
* Internships
* Full-stack learning

---

## 📂 How to Run the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ❤️ Final Note

This project was built step-by-step by:

* First understanding frontend
* Then connecting backend
* Fixing real errors
* Making it scalable

This shows **real development learning**, not copy-paste work 🚀

---

✨ Happy Coding ✨
