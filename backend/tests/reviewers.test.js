const request = require('supertest');
const app = require('../app');

describe('Reviewers API', () => {
  
  // REGISTER (5 tests)
  test('Register with valid data - 201', async () => {
    const res = await request(app).post('/reviewers/register').send({
      username: 'newuser',
      email: 'new@test.com',
      password: 'pass123456'
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toContain('registered successfully');
  });

  test('Register duplicate username - 409', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'dupuser',
      email: 'dup1@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/reviewers/register').send({
      username: 'dupuser',
      email: 'dup2@test.com',
      password: 'pass123456'
    });
    expect(res.status).toBe(409);
  });

  test('Register duplicate email - 409', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'user1',
      email: 'same@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/reviewers/register').send({
      username: 'user2',
      email: 'same@test.com',
      password: 'pass123456'
    });
    expect(res.status).toBe(409);
  });

  test('Register missing fields - 400', async () => {
    const res = await request(app).post('/reviewers/register').send({
      username: 'incomplete'
    });
    expect(res.status).toBe(400);
  });

  test('Register invalid email - 400', async () => {
    const res = await request(app).post('/reviewers/register').send({
      username: 'badmail',
      email: 'notanemail',
      password: 'pass123456'
    });
    expect(res.status).toBe(400);
  });

  // LOGIN (3 tests)
  test('Login valid credentials - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'loginuser',
      email: 'login@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/reviewers/login').send({
      username: 'loginuser',
      password: 'pass123456'
    });
    expect(res.status).toBe(200);
  });

  test('Login invalid password - 401', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'loginuser2',
      email: 'login2@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/reviewers/login').send({
      username: 'loginuser2',
      password: 'wrongpass'
    });
    expect(res.status).toBe(401);
  });

  test('Login non-existent user - 404', async () => {
    const res = await request(app).post('/reviewers/login').send({
      username: 'ghost',
      password: 'pass123456'
    });
    expect(res.status).toBe(404);
  });

  // GET REVIEWERS (2 tests)
  test('Get all reviewers - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'user1',
      email: 'u1@test.com',
      password: 'pass123456'
    });
    const res = await request(app).get('/reviewers/all');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThan(0);
  });

  test('Get reviewer by username exists - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'findme',
      email: 'find@test.com',
      password: 'pass123456'
    });
    const res = await request(app).get('/reviewers/username/findme');
    expect(res.status).toBe(200);
    expect(res.body.reviewer.username).toBe('findme');
  });

  // UPDATE (2 tests)
  test('Update reviewer valid auth - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'updateme',
      email: 'old@test.com',
      password: 'pass123456'
    });
    const res = await request(app).put('/reviewers/update/updateme').send({
      username: 'updateme',
      email: 'new@test.com',
      password: 'pass123456'
    });
    expect(res.status).toBe(201);
  });

  // DELETE (2 tests)
  test('Delete reviewer valid credentials - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'deleteme',
      email: 'delete@test.com',
      password: 'pass123456'
    });
    const res = await request(app).delete('/reviewers/delete').send({
      username: 'deleteme',
      password: 'pass123456'
    });
    expect(res.status).toBe(200);
  });

  test('Delete reviewer invalid credentials - 401', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'deleteme2',
      email: 'delete2@test.com',
      password: 'pass123456'
    });
    const res = await request(app).delete('/reviewers/delete').send({
      username: 'deleteme2',
      password: 'wrongpass'
    });
    expect(res.status).toBe(401);
  });
});