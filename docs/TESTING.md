# Testing Guide

## Automated Tests

### Backend (Jest + Supertest)
```bash
cd backend
cp .env.example .env   # point MONGO_URI at a disposable test database
npm install
npm test
```
`backend/tests/auth.test.js` covers registration, duplicate-email rejection,
weak-password rejection, login (success/failure), and protected-route access.
Use it as the template for extending coverage to `donations`, `requests`, and
`admin` endpoints — each following the same arrange/act/assert + cleanup
pattern against a real (test) database.

### Frontend
The frontend is scaffolded for component/unit testing with Vitest + React
Testing Library (add as dev dependencies: `vitest`, `@testing-library/react`,
`@testing-library/jest-dom`, `jsdom`) if deeper automated coverage is desired.
Given the UI-heavy nature of this app, manual QA (below) plus the backend's
API test suite give the highest-value coverage for the effort.

## Manual Testing Checklist

### Authentication
- [ ] Register as donor / NGO / volunteer
- [ ] Duplicate email is rejected
- [ ] Weak password is rejected
- [ ] Login with correct/incorrect credentials
- [ ] Forgot password → reset link is returned and works
- [ ] Logout clears session and redirects protected routes to `/login`

### Donor Flow
- [ ] Add a donation with images, expiry in the future
- [ ] Expiry in the past is rejected client- and server-side
- [ ] Edit a donation (not yet collected)
- [ ] Cannot edit a donation already collected/delivered
- [ ] Delete a donation removes its Cloudinary images
- [ ] Accept/reject incoming requests; accepting rejects other pending requests automatically

### NGO Flow
- [ ] Register NGO profile with registration document
- [ ] See "pending" status until admin verifies
- [ ] Browse nearby donations (geo query respects `maxDistanceKm`)
- [ ] Request a donation; cannot double-request the same donation
- [ ] Mark a donation collected after acceptance

### Volunteer Flow
- [ ] Complete volunteer profile (vehicle type, availability)
- [ ] View nearby pickups
- [ ] Accept, collect, and deliver a donation
- [ ] Reward points increment by 10 on delivery
- [ ] Appear correctly on the public leaderboard

### Admin Flow
- [ ] View/search/filter users; ban/unban; delete (non-admin only)
- [ ] View/cancel donations
- [ ] Verify/reject pending NGOs; verified NGO receives email + notification
- [ ] Analytics dashboard renders charts with live data
- [ ] Feedback and contact messages are visible and can be updated/resolved

### Cross-Cutting
- [ ] Dark mode toggle persists across reload
- [ ] Responsive layout on mobile viewport (< 640px)
- [ ] Rate limiting kicks in after repeated rapid auth attempts
- [ ] Unauthenticated access to a protected route redirects to `/login`
- [ ] Role-mismatched access to a role-gated route redirects to `/dashboard`
