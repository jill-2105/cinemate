const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Reviewer = require('../models/reviewer');
const Movie = require('../models/movie');

describe('Movies API', () => {
  // Clean DB before EACH test for isolation
  beforeEach(async () => {
    await Reviewer.deleteMany({});
    await Movie.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ADD MOVIE (4 tests)
  test('Add movie valid auth - 201', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser',
      email: 'movie@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/movies/add').send({
      username: 'movieuser',
      password: 'pass123456',
      title: 'Test Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    expect(res.status).toBe(201);
  });

  test('Add movie missing fields - 400', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser2',
      email: 'movie2@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/movies/add').send({
      username: 'movieuser2',
      password: 'pass123456',
      title: 'Incomplete'
    });
    expect(res.status).toBe(400);
  });

  test('Add movie duplicate title - 409', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser3',
      email: 'movie3@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'movieuser3',
      password: 'pass123456',
      title: 'Duplicate Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).post('/movies/add').send({
      username: 'movieuser3',
      password: 'pass123456',
      title: 'Duplicate Movie',
      releaseYear: 2021,
      genre: 'Comedy'
    });
    expect(res.status).toBe(409);
  });

  test('Add movie invalid year - 400', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser4',
      email: 'movie4@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/movies/add').send({
      username: 'movieuser4',
      password: 'pass123456',
      title: 'Bad Year',
      releaseYear: 'notayear',
      genre: 'Drama'
    });
    expect(res.status).toBe(400);
  });

  // GET MOVIES (3 tests)
  test('Get all movies - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser5',
      email: 'movie5@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'movieuser5',
      password: 'pass123456',
      title: 'Get All Test',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).get('/movies/all');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.movies)).toBe(true);
  });

  test('Get movie not found - 404', async () => {
    const res = await request(app).get('/movies/movie/NonExistent');
    expect(res.status).toBe(404);
  });

  // UPDATE MOVIE (3 tests)
  test('Update by creator - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser7',
      email: 'movie7@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'movieuser7',
      password: 'pass123456',
      title: 'Update Me',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).put('/movies/update/Update Me').send({
      username: 'movieuser7',
      password: 'pass123456',
      title: 'Updated Title',
      releaseYear: 2021,
      genre: 'Comedy'
    });
    expect(res.status).toBe(200);
  });

  test('Update non-creator - 403', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'creator',
      email: 'creator@test.com',
      password: 'pass123456'
    });
    await request(app).post('/reviewers/register').send({
      username: 'hacker',
      email: 'hacker@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'creator',
      password: 'pass123456',
      title: 'Protected Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).put('/movies/update/Protected Movie').send({
      username: 'hacker',
      password: 'pass123456',
      title: 'Hacked',
      releaseYear: 2021,
      genre: 'Action'
    });
    expect(res.status).toBe(403);
  });

  test('Update invalid data - 400', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser8',
      email: 'movie8@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'movieuser8',
      password: 'pass123456',
      title: 'Update Invalid',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).put('/movies/update/Update Invalid').send({
      username: 'movieuser8',
      password: 'pass123456',
      releaseYear: 'notanumber'
    });
    expect(res.status).toBe(400);
  });

  // DELETE MOVIE (3 tests)
  test('Delete by creator - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser9',
      email: 'movie9@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'movieuser9',
      password: 'pass123456',
      title: 'Delete Me',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).delete('/movies/delete/Delete Me').send({
      username: 'movieuser9',
      password: 'pass123456'
    });
    expect(res.status).toBe(200);
  });

  test('Delete non-creator - 403', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'owner',
      email: 'owner@test.com',
      password: 'pass123456'
    });
    await request(app).post('/reviewers/register').send({
      username: 'thief',
      email: 'thief@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'owner',
      password: 'pass123456',
      title: 'Owned Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).delete('/movies/delete/Owned Movie').send({
      username: 'thief',
      password: 'pass123456'
    });
    expect(res.status).toBe(403);
  });

  test('Delete non-existent - 404', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'movieuser10',
      email: 'movie10@test.com',
      password: 'pass123456'
    });
    const res = await request(app).delete('/movies/delete/Ghost Movie').send({
      username: 'movieuser10',
      password: 'pass123456'
    });
    expect(res.status).toBe(404);
  });

  // POPULATION TEST (1 test)
  test('Author populated correctly', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'poptest',
      email: 'pop@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'poptest',
      password: 'pass123456',
      title: 'Pop Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).get('/movies/all');
    expect(res.status).toBe(200);
    expect(res.body.movies[0].author.username).toBe('poptest');
  });
});
