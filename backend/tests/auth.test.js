/**
 * Integration tests for auth routes.
 * Requires a running MongoDB instance reachable via MONGO_URI (use a dedicated
 * test database, e.g. mongodb://localhost:27017/foodshareplus_test).
 */
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('../server');
const User = require('../models/User');

const testUser = {
  name: 'Test Donor',
  email: 'test.donor@example.com',
  password: 'TestPass123',
  role: 'donor',
};

beforeAll(async () => {
  await User.deleteMany({ email: testUser.email });
});

afterAll(async () => {
  await User.deleteMany({ email: testUser.email });
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.user.password).toBeUndefined();
  });

  it('rejects duplicate registration', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects registration with a weak password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...testUser, email: 'weak@example.com', password: 'short' });
    expect(res.statusCode).toBe(400);
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'WrongPassword1' });
    expect(res.statusCode).toBe(401);
  });

  it('rejects unauthenticated access to /me', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });

  it('returns the current user with a valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.user.email).toBe(testUser.email);
  });
});
