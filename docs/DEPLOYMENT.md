# Deployment Guide

## 1. MongoDB Atlas

1. Create a free cluster at https://cloud.mongodb.com
2. Database Access → add a user with a strong password
3. Network Access → allow access from anywhere (`0.0.0.0/0`) for Render, or Render's specific egress IPs if using a paid tier
4. Copy the connection string → this becomes `MONGO_URI`

## 2. Cloudinary

1. Create a free account at https://cloudinary.com
2. Dashboard → copy `Cloud Name`, `API Key`, `API Secret`

## 3. Backend → Render

1. Push the `backend/` folder to a GitHub repository (or the monorepo with `backend/` as the root directory in Render's settings)
2. Render Dashboard → New → Web Service → connect your repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables (copy from `backend/.env.example`, with real values):
   `MONGO_URI, JWT_SECRET, JWT_EXPIRE, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLIENT_URL, NODE_ENV=production`
5. Deploy. Note the resulting URL, e.g. `https://foodshare-api.onrender.com`

## 4. Frontend → Vercel

1. Push the `frontend/` folder (or monorepo) to GitHub
2. Vercel Dashboard → New Project → import repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - `VITE_API_URL = https://foodshare-api.onrender.com/api`
5. Deploy. Note the resulting URL, e.g. `https://foodshare-plus.vercel.app`

## 5. Close the loop

Go back to Render and update `CLIENT_URL` to your Vercel URL, then redeploy the
backend so CORS and reset-password links point to the right place.

## 6. Custom Domain (optional)

- Vercel: Project → Settings → Domains → add your domain, update DNS records as instructed
- Render: Service → Settings → Custom Domain → add domain, update DNS (CNAME)

## 7. HTTPS

Both Vercel and Render provision HTTPS automatically for their subdomains and
for verified custom domains — no manual certificate management needed.

## 8. CI/CD

`.github/workflows/ci.yml` runs backend tests and a frontend production build
on every push/PR to `main`. Add these repository secrets in GitHub:
- `MONGO_URI_TEST` — a MongoDB URI pointing at a disposable test database
- `VITE_API_URL` — used only to validate the frontend build succeeds

Render and Vercel both auto-deploy from the connected branch by default, so
merging to `main` triggers deployment on both platforms independently of this
GitHub Actions workflow (which is for test/build verification, not deploys).
