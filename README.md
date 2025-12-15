# IT Support Ticketing System

A full-stack IT support ticketing system built with **Next.js (TypeScript)** on the frontend and **Ruby on Rails** on the backend. The application allows users to create, view, and manage IT support tickets through a modern UI styled with **Tailwind CSS** and **HeroUI**, backed by a **PostgreSQL** database.

---

## 🧱 Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- HeroUI

### Backend
- Ruby on Rails
- PostgreSQL

---

## 📁 Project Structure

IT-Support-Ticketing-System/  
├── backend/    # Ruby on Rails API  
└── frontend/   # Next.js frontend application

---

## ⚙️ Prerequisites

Assume a fresh machine with nothing installed.

### Required Software
- Git
- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- Ruby (v3.x recommended)
- Rails (v7.x recommended)
- PostgreSQL (must run on port **5433**, not the default 5432)

### Download Links
- Node.js: https://nodejs.org/
- Ruby: https://www.ruby-lang.org/en/downloads/
- Rails: https://guides.rubyonrails.org/getting_started.html
- PostgreSQL (Postgres.app for macOS): https://postgresapp.com/

---

## 🐘 PostgreSQL Setup (Required)

This project **requires PostgreSQL to run on port `5433`**  
(Default PostgreSQL port `5432` will not work.)

### Using Postgres.app
1. Download and install Postgres.app from https://postgresapp.com/
2. Open the app and click **Start**
3. Ensure PostgreSQL is running on **port 5433**

---

## 🚀 Backend Setup (Ruby on Rails)

You must be inside the `backend` directory to run backend commands.

cd backend  

### Only needs to be done Once  
bundle install  
rails db:create  
rails db:migrate  
rails db:seed 

### To start the backend use the command  
rails s  

Backend runs on http://localhost:4000  
(Professor you do not need to worry about this port.)

---

## 🎨 Frontend Setup (Next.js)

You must be inside the `frontend` directory to run frontend commands.

cd frontend  
npm install  
npm run dev  

Frontend runs on http://localhost:3000

---

## 🔗 Running the Full Application

1. Start PostgreSQL (port 5433)
2. Start Rails backend
3. Start Next.js frontend
4. Open http://localhost:3000

---

## 🛠 Common Commands

Backend:
rails server
rails db:migrate
rails db:seed

Frontend:
npm run dev
npm run build
npm run start

---

## 📄 License

Educational use only.

---

## 👤 Contributors

Onkar Dhillon  
GitHub: https://github.com/OnkarSama

Joseph Bergmann  
GitHub: https://github.com/JosephBergmann

Sehajveer Dhillon  
GitHub: https://github.com/sehajveerd

Gabriel Kaloo  
GitHub: https://github.com/gkaloo17591

Alina James  
GitHub: https://github.com/alinaj04

