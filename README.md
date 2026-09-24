# FlowDesk — Personal Workflow Automation & Task Orchestration Platform

<div align="center">
  <h3>⚡ Transform your productivity with intelligent <code>WHEN (Trigger) → IF (Condition) → THEN (Action)</code> automated workflows.</h3>
</div>

---

## 🌟 Key Features

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

### Frontend
* **React 18** (Vite tooling)
* **Tailwind CSS v3** (Custom glassmorphic design system and dark theme tokens)
* **Lucide React** (Modern iconography)
* **Framer Motion** (Micro-interactions, modals, and toasts)
* **Recharts** (Interactive SVG charts)
* **Axios** (Centralized client with automatic Bearer token injection)
* **date-fns** (Localized date formatting and distance calculations)

### Backend
* **Node.js & Express.js** (Layered modular architecture)
* **MongoDB Atlas & Mongoose** (Compound indexes and TTL collections)
* **JWT (jsonwebtoken)** & **bcryptjs** (Authentication & security)
* **node-cron** (Scheduled automation scanning)
* **Zod** (Type-safe input validation)
* **Helmet & express-rate-limit** (HTTP security hardening)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB** (Local instance on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)

### 2. Environment Configuration
Create `server/.env` with your settings:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/flowdesk
JWT_SECRET=your_secure_jwt_secret_key_change_in_production_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CRON_SCHEDULE=*/5 * * * *
```

### 3. Install Dependencies & Seed Data
```bash
# Install root, server, and client dependencies
npm install
cd server && npm install
cd ../client && npm install

# (Optional) Seed demo user, workflows, tasks, and telemetry data
cd ../server && npm run seed
```

### 4. Run Development Servers
From the project root:
```bash
npm run dev
```
* **Frontend Application**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000`

---

## 🔑 Demo Credentials (from Seeder)
* **Email**: `alex.developer@flowdesk.io`
* **Password**: `FlowDeskPass2026!`

*(Or register a new account from the web UI)*

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user account |
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT |
| `GET` | `/api/v1/auth/me` | Get current authenticated user profile |
| `PUT` | `/api/v1/auth/profile` | Update profile preferences and timezone |
| `GET` | `/api/v1/tasks` | Filter, sort, and paginate tasks |
| `POST` | `/api/v1/tasks` | Create new task (triggers `TASK_CREATED`) |
| `GET` | `/api/v1/tasks/:id` | Get single task details |
| `PUT` | `/api/v1/tasks/:id` | Update task fields (triggers priority/status events) |
| `PATCH`| `/api/v1/tasks/:id/status`| Update status only |
| `DELETE`| `/api/v1/tasks/:id` | Delete task and its subtasks |
| `POST` | `/api/v1/tasks/:id/subtasks` | Append subtask |
| `PATCH`| `/api/v1/tasks/:id/subtasks/:subtaskId` | Toggle subtask completed |
| `GET` | `/api/v1/workflows` | List all user workflows |
| `POST` | `/api/v1/workflows` | Create workflow configuration |
| `PUT` | `/api/v1/workflows/:id` | Update workflow rule |
| `PATCH`| `/api/v1/workflows/:id/toggle` | Toggle workflow active state |
| `DELETE`| `/api/v1/workflows/:id` | Delete workflow rule |
| `POST` | `/api/v1/workflows/:id/test` | Dry-run test workflow against a task |
| `GET` | `/api/v1/automation/logs` | Fetch audit logs with status/workflow filters |
| `GET` | `/api/v1/automation/stats` | Execution counts and success rate metrics |
| `GET` | `/api/v1/notifications` | Fetch user notifications |
| `PATCH`| `/api/v1/notifications/read-all`| Mark all notifications as read |
| `GET` | `/api/v1/dashboard/overview` | Aggregated KPIs and chart datasets |

---

## 🛡️ License
MIT License. Built for seamless workflow orchestration and productivity.
