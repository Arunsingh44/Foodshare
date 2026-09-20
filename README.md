# FoodShare+ 🍲

**Connecting Surplus Food with People Who Need It.**

FoodShare+ is a full-stack platform that connects food donors (restaurants,
hotels, caterers, households) with NGOs and volunteers who rescue surplus
food and deliver it to communities in need — before it goes to waste.

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, React Hook Form, React Hot Toast, Recharts, Leaflet |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas (via Mongoose) |
| Auth       | JWT + bcrypt |
| Images     | Cloudinary |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Monorepo Structure

```
foodshare-plus/
├── backend/          Express REST API
├── frontend/          React + Vite SPA
├── docs/              Architecture, API, and deployment documentation
└── .github/workflows/ CI/CD pipeline
```

See `docs/FOLDER_STRUCTURE.md` for a fully annotated file-by-file breakdown.

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Cloudinary account (for image uploads)

### Option A — One server, one port (recommended for local testing)

This builds the React app and has the Express backend serve it directly, so
the whole thing runs on a single `http://localhost:5000`.

```bash
# from the repo root
cp backend/.env.example backend/.env      # fill in MONGO_URI, JWT_SECRET, and Cloudinary creds
cp frontend/.env.example frontend/.env    # leave VITE_API_URL unset — it defaults to relative '/api'

npm run install:all    # installs both backend and frontend dependencies
npm run seed             # optional: populates demo data (see console for demo logins)
npm start                 # builds the frontend, then starts the backend serving it
```

Visit **http://localhost:5000** — frontend and API both live there.

### Option B — Two dev servers (best for active frontend development)

Keeps Vite's hot-reload for frontend work, while still using relative
`/api` calls via a built-in dev proxy — no separate `VITE_API_URL` needed.

```bash
# terminal 1
cd backend
cp .env.example .env
npm install
npm run seed     # optional
npm run dev        # http://localhost:5000

# terminal 2
cd frontend
cp .env.example .env
npm install
npm run dev        # http://localhost:5173 — proxies /api calls to :5000
```

Visit **http://localhost:5173** for hot-reloading frontend work; the backend
API is still reachable directly at `http://localhost:5000/api`.

## Documentation

- [`docs/API.md`](docs/API.md) — full REST API reference with request/response examples
- [`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) — annotated file tree for both frontend and backend
- [`docs/DATABASE.md`](docs/DATABASE.md) — MongoDB collections, schemas, relationships, indexes
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — step-by-step Vercel + Render + Atlas + Cloudinary deployment guide
- [`docs/TESTING.md`](docs/TESTING.md) — testing strategy and manual QA checklist
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system architecture, use case, sequence, and ER diagrams (Mermaid)

## Demo Accounts (after running `npm run seed`)

| Role      | Email                        | Password       |
|-----------|-------------------------------|----------------|
| Admin     | admin@foodshare-demo.test      | Admin@1234     |
| Donor     | donor@foodshare-demo.test       | Donor@1234     |
| NGO       | ngo@foodshare-demo.test          | Ngo@12345      |
| Volunteer | volunteer@foodshare-demo.test    | Volunteer@123  |

> These are local development seed accounts only — never reuse these
> credentials in a production deployment.

## Security Notes

- Passwords are hashed with bcrypt (cost factor 12); JWTs are short-lived and
  stored in httpOnly cookies as well as returned to the client for header-based auth.
- Helmet, CORS, rate limiting, Mongo sanitization, and XSS filtering are
  applied globally in `backend/server.js`.
- Never commit a real `.env` file — only `.env.example` templates are tracked.
- No email/SMTP service is configured. "Forgot password" generates a reset
  link and returns it directly in the API response (shown on the page) rather
  than emailing it — fine for local development and demos, but if you deploy
  this for real users, wire up an email provider so reset links aren't
  exposed in the response body.

## License

This project was built as a portfolio / educational reference implementation.
Adapt freely for coursework, demos, or as a foundation for a real deployment
(after a security review appropriate to production use).
