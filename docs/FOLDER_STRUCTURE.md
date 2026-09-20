# Folder Structure — Annotated

```
foodshare-plus/
│
├── backend/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection via Mongoose
│   │   └── cloudinary.js          # Cloudinary config + upload/delete helpers
│   ├── controllers/
│   │   ├── authController.js      # register, login, verify email, password reset
│   │   ├── donationController.js  # donation CRUD, search/filter/geo
│   │   ├── requestController.js   # request/accept/reject/collect/deliver flow
│   │   ├── ngoController.js       # NGO registration + admin verification
│   │   ├── volunteerController.js # volunteer profile, nearby pickups, leaderboard
│   │   ├── userController.js      # profile, avatar, password change
│   │   ├── notificationController.js
│   │   ├── reviewController.js
│   │   ├── feedbackController.js
│   │   ├── contactController.js
│   │   └── adminController.js     # user/donation moderation, analytics, reports
│   ├── middleware/
│   │   ├── auth.js                # protect (JWT verify) + authorize (role check)
│   │   ├── errorHandler.js        # AppError class + centralized error responses
│   │   ├── asyncHandler.js        # wraps async route handlers
│   │   ├── rateLimiter.js         # general + strict auth rate limits
│   │   ├── upload.js              # multer memory storage + file filter
│   │   └── validateRequest.js     # express-validator error formatter
│   ├── models/                    # Mongoose schemas (see docs/DATABASE.md)
│   ├── routes/                    # one file per resource, mounted in server.js
│   ├── utils/
│   │   ├── generateToken.js       # JWT signing + cookie response helper
│   │   ├── geoUtils.js            # Haversine distance calculation
│   │   ├── aiHelpers.js           # freshness score, duplicate detection, NGO suggestion ranking
│   │   ├── createNotification.js  # shared in-app notification creator
│   │   └── seed.js                # demo data seed script
│   ├── validation/                 # express-validator rule sets per resource
│   ├── tests/
│   │   └── auth.test.js           # Jest + Supertest integration tests
│   ├── server.js                   # app entry point — middleware + route mounting
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Navbar, Footer, ProtectedRoute, AnimatedCounter
│   │   │   ├── landing/            # Hero, StatsSection, HowItWorks, Features, Testimonials, CallToAction
│   │   │   └── dashboard/          # StatCard, DonationCard
│   │   ├── pages/
│   │   │   ├── auth/                # Login, Register, ForgotPassword, ResetPassword
│   │   │   ├── donor/                # Overview, AddDonation, MyDonations, Requests
│   │   │   ├── ngo/                  # Overview, NearbyDonations, Requests, History
│   │   │   ├── volunteer/            # Overview, NearbyPickups, Deliveries, Leaderboard
│   │   │   ├── admin/                # Overview (analytics+charts), Users, Donations, NGOVerification
│   │   │   └── *.jsx                 # Landing, About, HowItWorks, Browse, Contact, FAQ, Terms, Privacy, 404, Profile, Notifications
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx       # public site chrome (Navbar + Footer)
│   │   │   └── DashboardLayout.jsx  # role-aware sidebar for authenticated app
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # user session state, login/register/logout
│   │   │   └── ThemeContext.jsx     # dark/light mode, persisted to localStorage
│   │   ├── services/                 # Axios-based API clients, one per resource
│   │   ├── App.jsx                   # route table
│   │   ├── main.jsx                  # ReactDOM root, providers, toaster
│   │   └── index.css                 # Tailwind entry + custom component classes
│   ├── index.html
│   ├── tailwind.config.js            # color palette, animations, dark mode
│   ├── vite.config.js
│   └── package.json
│
├── docs/                              # this file + API/DATABASE/ARCHITECTURE/DEPLOYMENT/TESTING
├── .github/workflows/ci.yml           # backend test + frontend build CI
└── README.md
```
