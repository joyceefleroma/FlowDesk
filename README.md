# FlowDesk — Personal Workflow Automation & Task Orchestration Platform

<div align="center">
  <h3>⚡ Transform your productivity with intelligent <code>WHEN (Trigger) → IF (Condition) → THEN (Action)</code> automated workflows.</h3>
  <p>🎨 Ultra-modern Red & White Glassmorphism UI | Full-Stack React + Node/Express + MongoDB Atlas</p>
</div>

---

## 🌟 Key Features

* **Red & White Glassmorphism UI**: High-contrast dark luxury aesthetic with frosted acrylic panels, crimson glow accents, translucent white glass cards, and crisp typography.
* **Visual Workflow Builder**: Configure custom event-driven automation rules without writing code.
  * **Triggers**: `Task Created`, `Task Completed`, `Deadline Approaching`, `Task Overdue`, `Priority Changed`, `Status Changed`, `Subtask Completed`.
  * **Conditions**: Operator filtering on `status`, `priority`, `category`, `tags`, `subtasksCompleted (%)`, and `hours until deadline` using operators like `EQUALS`, `NOT_EQUALS`, `CONTAINS`, `IN`, `GREATER_THAN`, `LESS_THAN`, `WITHIN_NEXT_HOURS`, `IS_EMPTY`.
  * **Actions**: `Change Priority`, `Change Status`, `Create Notification`, `Send In-App Reminder`, `Create Follow-up Task`, `Add Tag`, `Append Subtask`.
* **Automation Engine Core**:
  * **Decoupled Asynchronous Pub/Sub**: In-process EventBus dispatches automation pipelines non-blockingly.
  * **Recursion Guard**: Tracks execution lineage and halts cascading trigger loops if `depth > 3`.
  * **Deduplication Ledger**: Employs MongoDB TTL indexes to ensure scheduled time-window crons (e.g. 24h deadline alerts) execute idempotently without repeat triggers.
  * **Dry-Run Workflow Simulator**: Test and debug workflow conditions against live tasks before enabling.
* **Task Orchestration**:
  * Dual View Modes: **Interactive List View** and **4-Column Kanban Board** (`To Do`, `In Progress`, `Completed`, `Overdue`).
  * Subtask checklists with live completion progress bars.
  * Category grouping, tag chips, and due date/time tracking.
* **Telemetry & Audit Trail**:
  * Comprehensive execution history recording condition evaluations, execution durations in milliseconds, and action outcomes.
* **Real-Time Notification Center**:
  * In-app alert drawer with unread count badges, direct task links, and one-click mark-as-read.
* **Interactive SaaS Dashboard**:
  * Visual task velocity trend charts and priority distribution donuts powered by Recharts.
  * KPI summary cards with glow accents and live recent activity feeds.
* **Production-Grade Security**:
  * IDOR protection scoping every query to `{ user: req.user._id }`.
  * BCrypt password hashing (12 rounds) and JWT Bearer authorization.
  * Strict Zod schema input validation and Helmet security headers.

---

## 🛠️ Technology Stack

### Frontend (`client/`)
* **React 18** (Vite tooling)
* **Tailwind CSS v3** (Custom Red & White glassmorphic tokens and glowing utility borders)
* **Lucide React** (Crisp vector icons)
* **Framer Motion** (Micro-interactions, modals, and toasts)
* **Recharts** (Interactive SVG charts)
* **Axios** (Centralized client with automatic Bearer token injection)
* **date-fns** (Localized date formatting and distance calculations)

### Backend (`server/`)
* **Node.js & Express.js** (Layered modular architecture)
* **MongoDB Atlas & Mongoose** (Compound indexes and TTL collections)
* **JWT (jsonwebtoken)** & **bcryptjs** (Authentication & security)
* **node-cron** (Scheduled automation scanning)
* **Zod** (Type-safe input validation)
* **Helmet & express-rate-limit** (HTTP security hardening)

---

## 🚀 Deployment Guide

This project is decoupled into two independent directories ready for separate deployment:
* **Frontend (`client`)** ➡️ **Vercel**
* **Backend (`server`)** ➡️ **Render.com**

---

### 1. Deploying Backend to Render.com

1. Sign in to [Render.com](https://render.com) and click **New +** → **Web Service**.
2. Connect your GitHub repository: `joyceefleroma/Flowdesk`.
3. Configure the following service settings:
   * **Name**: `flowdesk-backend` (or your preferred name)
   * **Root Directory**: `server`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
4. In the **Environment Variables** section, add:
   ```env
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://joyceefleromavanja_db_user:2WPawWcijAzDZvpN@cluster0.v9ayxro.mongodb.net/flowdesk?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_jwt_secret_render_production_2026
   JWT_EXPIRES_IN=7d
   CLIENT_URL=https://your-flowdesk-frontend.vercel.app
   CRON_SCHEDULE=*/5 * * * *
   ```
5. Click **Create Web Service**.
6. Once deployed, copy your Render URL (e.g., `https://flowdesk-backend.onrender.com`).

---

### 2. Deploying Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com) and click **Add New...** → **Project**.
2. Select your repository: `joyceefleroma/Flowdesk`.
3. Configure project settings:
   * **Framework Preset**: `Vite`
   * **Root Directory**: Click edit and select `client`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
   * **Install Command**: `npm install`
4. In the **Environment Variables** section, add:
   ```env
   VITE_API_URL=https://flowdesk-backend.onrender.com/api/v1
   ```
   *(Replace with your actual Render backend URL from Step 1)*
5. Click **Deploy**. Vercel will build and serve your app globally with client-side SPA routing supported via `client/vercel.json`.

---

## 💻 Local Development Guide

### 1. Install Dependencies
```bash
# Install root, backend, and frontend packages
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Local Environment Variables
Create `server/.env`:
```env
PORT=5050
NODE_ENV=development
MONGODB_URI=mongodb+srv://joyceefleromavanja_db_user:2WPawWcijAzDZvpN@cluster0.v9ayxro.mongodb.net/flowdesk
JWT_SECRET=flowdesk_jwt_local_dev_secret_key_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CRON_SCHEDULE=*/5 * * * *
```

### 3. Run Locally
From the project root:
```bash
npm run dev
```
* **Frontend Client**: `http://localhost:5173`
* **Backend API**: `http://localhost:5050`

---

## 🔑 Demo Credentials (from Atlas Seeder)
* **Email**: `alex.developer@flowdesk.io`
* **Password**: `FlowDeskPass2026!`

*(Or click "Create Account" on the web UI)*

---

## 🛡️ License
MIT License. Built for seamless workflow orchestration and productivity.
