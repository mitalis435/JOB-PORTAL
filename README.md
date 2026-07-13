# Job Portal

A full-stack job portal where job seekers can browse and apply for jobs, and recruiters can post jobs and manage applicants.

> Built with the MERN stack (MongoDB, Express, React, Node.js).


## ✨ Features

### For Everyone (no login needed)
- Browse all jobs, search by keyword, and view full job details
- See **AI-recommended related jobs** on every job detail page
- Clean, responsive UI (works on mobile and desktop)

### For Job Seekers (Students)
- Register with a valid account
- Login with existing account
- Apply to jobs (login required)
- Save / bookmark jobs for later (login required)
- Profile page with profile photo, bio, skills, resume, and applied-jobs history
- Edit profile 

### For Recruiters
- Register / login as a recruiter
- Create and manage companies
- Post jobs and edit job listings
- View applicants for each job

### Security / Account
- Passwords hashed with bcrypt, auth via JWT stored in an httpOnly cookie


## 🛠 Tech Stack

**Frontend**
- React 18 + Vite
- Redux Toolkit + redux-persist (state management)
- React Router DOM (routing)
- Tailwind CSS + shadcn/ui (Radix UI) components
- Axios, Sonner (toasts), Lucide icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs (authentication)
- Multer + Cloudinary (file/image uploads)
- Nodemailer (Gmail OAuth2) for OTP emails
- Native `fetch` to call the AI API

---

## 📁 Project Structure

```
JOB-PORTAL/
├── Backend/
│   ├── controllers/      # Route logic (user, job, company, application)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── middleware/       # Auth (JWT) + Multer upload
│   ├── utils/            # db, cloudinary, datauri, mailer, aiClient
│   ├── index.js          # App entry (Express server)
│   └── .env              # Backend secrets (you create this)
│
└── Frontend/
    ├── src/
    │   ├── components/    # UI components (auth, admin, job, shared)
    │   ├── redux/         # Slices + store
    │   ├── hooks/         # Custom data-fetching hooks
    │   └── utils/data.js  # API base URLs
    └── vite.config.js
```

---

## ✅ Prerequisites

Before you start, make sure you have:

- **Node.js** v18 or higher (the backend uses the built-in `fetch`)
- **npm** (comes with Node.js)
- A **MongoDB** database (local or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A **Cloudinary** account (for profile photo uploads) — free tier works


## ⚙️ Setup & Installation

### 1. Clone / download the project
```bash
cd JOB-PORTAL
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a file named **`.env`** inside the `Backend/` folder with these values:

```env
# Database
MONGO_URI = your_mongodb_connection_string

# Auth
JWT_SECRET = any_long_random_secret

# Cloudinary (image uploads)
CLOUD_NAME = your_cloud_name
CLOUD_API  = your_cloudinary_api_key
API_SECRET = your_cloudinary_api_secret

# Server
PORT = 5011
NODE_ENV = development

# Allowed frontend origins (comma separated, no trailing slash)
CORS_ORIGIN = http://localhost:5173

# AI (for job recommendations - OpenAI-compatible endpoint)
AI_BASE_URL = https://api.clod.io/v1
AI_API_KEY  = your_ai_api_key
AI_MODEL    = openai/gpt-oss-120b

```

Start the backend:
```bash
npm run dev
```
The server runs at **http://localhost:5011**

> **Note:** Set `NODE_ENV = development` while developing locally so the backend does not try to serve the production frontend build.

### 3. Frontend setup

Open a **new terminal**:

```bash
cd Frontend
npm install
npm run dev
```
The app runs at **http://localhost:5173**

The frontend talks to the backend using the URLs in `Frontend/src/utils/data.js`
(default `http://localhost:5011`). Change those if your backend runs on a different host/port.

---

## ▶️ Running the App (quick recap)

| Step | Command | Folder | URL |
|------|---------|--------|-----|
| 1. Start backend | `npm run dev` | `Backend/` | http://localhost:5011 |
| 2. Start frontend | `npm run dev` | `Frontend/` | http://localhost:5173 |

Open **http://localhost:5173** in your browser. 🎉


## 🌐 Main API Endpoints

Base URL: `http://localhost:5011`

### User (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register + send OTP |
| POST | `/login` | Login |
| POST | `/logout` | Logout |
| POST | `/profile/update` | Update profile (auth) |

### Jobs (`/api/job`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/get` | List/search all jobs (public) |
| GET | `/get/:id` | Get single job (public) |
| GET | `/recommendations/:id` | AI recommended jobs (public) |
| POST | `/post` | Post a job (recruiter, auth) |
| GET | `/getadminjobs` | Recruiter's jobs (auth) |

### Company (`/api/company`) & Applications (`/api/application`)
- Company create / get / update (recruiter, auth)
- Apply to a job, view applicants (auth)

---

## 🧰 Available Scripts

**Backend**
- `npm run dev` / `npm start` — start with nodemon

**Frontend**
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview the build
- `npm run lint` — run ESLint


## 🩺 Troubleshooting

- **CORS error** — make sure your frontend URL is listed in `CORS_ORIGIN` in the backend `.env`, then restart the backend.
- **`.env` changes not applied** — restart the backend (nodemon does not reload `.env` automatically).
- **Recommendations not showing** — confirm the `AI_*` values in `.env` and that the backend was restarted.



## 👤 Author

**Mitali Singh** — [github.com/mitalis435](https://github.com/mitalis435)

---

> Made with the MERN stack. Contributions and suggestions are welcome!