# FoodShare+ API Documentation

Base URL (local): `http://localhost:5000/api`

All authenticated routes expect either:
- `Authorization: Bearer <token>` header, **or**
- an `httpOnly` `token` cookie (set automatically on login/register)

All responses follow the shape:
```json
{ "success": true, "...": "..." }
```
or on error:
```json
{ "success": false, "message": "Human-readable error", "errors": [ /* validation details, optional */ ] }
```

---

## Auth (`/api/auth`)

### Register
`POST /api/auth/register`
```json
{
  "name": "Rohan's Kitchen",
  "email": "donor@example.com",
  "password": "SecurePass123",
  "role": "donor",
  "phone": "+919876543210"
}
```
**201 Created**
```json
{ "success": true, "token": "eyJhbGciOi...", "user": { "_id": "...", "name": "Rohan's Kitchen", "role": "donor", "...": "..." } }
```

### Login
`POST /api/auth/login`
```json
{ "email": "donor@example.com", "password": "SecurePass123" }
```
**200 OK** → same shape as register.

### Get Current User
`GET /api/auth/me` (Private) → `{ "success": true, "user": { ... } }`

### Logout
`POST /api/auth/logout` (Private) → `{ "success": true, "message": "Logged out successfully" }`

### Verify Email
`GET /api/auth/verify-email/:token` → `{ "success": true, "message": "Email verified successfully" }`

### Forgot / Reset Password
`POST /api/auth/forgot-password` — `{ "email": "..." }`
No email service is configured, so the response includes the reset link
directly rather than sending it by email:
```json
{ "success": true, "message": "...", "resetUrl": "http://localhost:5173/reset-password/<token>" }
```
`PUT /api/auth/reset-password/:token` — `{ "password": "NewSecurePass123" }`

---

## Donations (`/api/donations`)

### List / Search / Filter
`GET /api/donations?search=biryani&category=Cooked+Food&status=available&lng=72.87&lat=19.07&maxDistanceKm=15&sort=-createdAt&page=1&limit=12`

**200 OK**
```json
{
  "success": true,
  "count": 12,
  "total": 48,
  "page": 1,
  "pages": 4,
  "donations": [ { "_id": "...", "foodName": "Vegetable Biryani", "status": "available", "...": "..." } ]
}
```

### Get One
`GET /api/donations/:id` → `{ "success": true, "donation": { ... } }`

### Create (donor only, multipart/form-data)
`POST /api/donations`
Fields: `foodName, category, description, quantity[value], quantity[unit], cookedTime, expiryTime, pickupTime[start], pickupTime[end], pickupAddress, location[coordinates][0] (lng), location[coordinates][1] (lat), images (files, up to 5)`

**201 Created** → `{ "success": true, "donation": { ... } }`

### Update (owner only)
`PUT /api/donations/:id` — any subset of the create fields.

### Delete (owner or admin)
`DELETE /api/donations/:id` → `{ "success": true, "message": "Donation deleted" }`

### My Donations (donor only)
`GET /api/donations/my-donations`

---

## Requests (`/api/requests`)

| Method & Path | Role | Description |
|---|---|---|
| `POST /api/requests` `{ donationId, message }` | ngo, volunteer | Request to collect a donation |
| `PUT /api/requests/:id/accept` | donor (owner) | Accept a pending request |
| `PUT /api/requests/:id/reject` | donor (owner) | Reject a pending request |
| `PUT /api/requests/:id/collect` | ngo, volunteer (requester) | Mark donation collected |
| `PUT /api/requests/:id/deliver` | volunteer (requester) | Mark donation delivered (+10 reward points) |
| `GET /api/requests/my-requests?as=donor` | any | List requests relevant to the logged-in user |

---

## NGOs (`/api/ngos`)

| Method & Path | Role | Description |
|---|---|---|
| `POST /api/ngos/register` (multipart) | ngo | Submit NGO profile + registration document |
| `GET /api/ngos?verificationStatus=pending` | public | List NGOs |
| `GET /api/ngos/:id` | public | Get one NGO |
| `PUT /api/ngos/:id/verify` `{ decision: "verified"|"rejected", notes }` | admin | Approve/reject NGO |

---

## Volunteers (`/api/volunteers`)

| Method & Path | Role | Description |
|---|---|---|
| `POST /api/volunteers/profile` | volunteer | Create/update volunteer profile |
| `GET /api/volunteers/profile` | volunteer | Get own profile |
| `GET /api/volunteers/nearby-pickups?lng=&lat=&maxDistanceKm=` | volunteer | Nearby available donations |
| `GET /api/volunteers/leaderboard` | public | Top 20 volunteers by reward points |

---

## Users (`/api/users`)

| Method & Path | Role | Description |
|---|---|---|
| `PUT /api/users/profile` | any | Update name/phone/address/city/location/darkMode |
| `PUT /api/users/avatar` (multipart, field `avatar`) | any | Upload avatar |
| `PUT /api/users/change-password` `{ currentPassword, newPassword }` | any | Change password |
| `GET /api/users/:id` | public | Public profile snippet |

---

## Notifications (`/api/notifications`)

| Method & Path | Description |
|---|---|
| `GET /api/notifications?unreadOnly=true` | List notifications |
| `PUT /api/notifications/:id/read` | Mark one as read |
| `PUT /api/notifications/read-all` | Mark all as read |

---

## Reviews (`/api/reviews`)

| Method & Path | Description |
|---|---|
| `POST /api/reviews` `{ donationId, revieweeId, rating, comment }` | Leave a review after delivery |
| `GET /api/reviews/user/:userId` | Get reviews for a user |

---

## Feedback (`/api/feedback`)

| Method & Path | Role |
|---|---|
| `POST /api/feedback` `{ category, subject, message }` | any |
| `GET /api/feedback?status=open` | admin |
| `PUT /api/feedback/:id` `{ status, adminNotes }` | admin |

---

## Contact (`/api/contact`)

| Method & Path | Role |
|---|---|
| `POST /api/contact` `{ name, email, subject, message }` | public |
| `GET /api/contact?isResolved=false` | admin |
| `PUT /api/contact/:id/resolve` | admin |

---

## Admin (`/api/admin`) — all routes require `admin` role

| Method & Path | Description |
|---|---|
| `GET /api/admin/users?role=&search=&page=&limit=` | List/search users |
| `PUT /api/admin/users/:id/ban` | Toggle ban status |
| `DELETE /api/admin/users/:id` | Delete a user |
| `GET /api/admin/donations?status=&page=&limit=` | List all donations |
| `PUT /api/admin/donations/:id/cancel` | Force-cancel a donation |
| `GET /api/admin/analytics` | Dashboard metrics (users, donations, meals saved, CO₂ saved, monthly trend, category breakdown) |
| `POST /api/admin/reports` `{ reportType, periodStart, periodEnd }` | Generate a report snapshot |

---

## Status Codes Used

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Resource created |
| 400 | Validation error / bad request |
| 401 | Not authenticated / invalid credentials |
| 403 | Authenticated but not authorized for this action |
| 404 | Resource not found |
| 500 | Server error |
