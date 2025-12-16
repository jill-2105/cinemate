const request = require('supertest');
const app = require('../app');

describe('Reviews API', () => {

  // ADD REVIEW (4 tests)
  test('Add review valid - 201', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer',
      email: 'reviewer@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'reviewer',
      password: 'pass123456',
      title: 'Review Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).post('/reviews/add').send({
      username: 'reviewer',
      password: 'pass123456',
      reviewText: 'Great movie!',
      rating: 8,
      movie: 'Review Movie'
    });
    expect(res.status).toBe(201);
  });

  test('Add review missing fields - 400', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer2',
      email: 'reviewer2@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/reviews/add').send({
      username: 'reviewer2',
      password: 'pass123456',
      reviewText: 'Incomplete'
    });
    expect(res.status).toBe(400);
  });

  test('Add review invalid rating - 400', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer3',
      email: 'reviewer3@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'reviewer3',
      password: 'pass123456',
      title: 'Bad Rating Movie',
      releaseYear: 2020,
      genre: 'Drama'
    });
    const res = await request(app).post('/reviews/add').send({
      username: 'reviewer3',
      password: 'pass123456',
      reviewText: 'Test',
      rating: 15,
      movie: 'Bad Rating Movie'
    });
    expect(res.status).toBe(400);
  });

  test('Add review missing movie - 400', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer4',
      email: 'reviewer4@test.com',
      password: 'pass123456'
    });
    const res = await request(app).post('/reviews/add').send({
      username: 'reviewer4',
      password: 'pass123456',
      reviewText: 'No movie',
      rating: 8,
      movie: 'NonExistent Movie'
    });
    expect(res.status).toBe(400);
  });

  // GET REVIEWS (4 tests)
  test('Get all reviews - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer5',
      email: 'reviewer5@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'reviewer5',
      password: 'pass123456',
      title: 'Get All Reviews',
      releaseYear: 2020,
      genre: 'Drama'
    });
    await request(app).post('/reviews/add').send({
      username: 'reviewer5',
      password: 'pass123456',
      reviewText: 'Test',
      rating: 8,
      movie: 'Get All Reviews'
    });
    const res = await request(app).get('/reviews/all');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.reviews)).toBe(true);
  });

  test('Get reviews newest first - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer6',
      email: 'reviewer6@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'reviewer6',
      password: 'pass123456',
      title: 'Newest Test',
      releaseYear: 2020,
      genre: 'Drama'
    });
    await request(app).post('/reviews/add').send({
      username: 'reviewer6',
      password: 'pass123456',
      reviewText: 'First review',
      rating: 8,
      movie: 'Newest Test'
    });
    const res = await request(app).get('/reviews/newest');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.reviews)).toBe(true);
  });

  test('Get reviews oldest first - 200', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'reviewer7',
      email: 'reviewer7@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'reviewer7',
      password: 'pass123456',
      title: 'Oldest Test',
      releaseYear: 2020,
      genre: 'Drama'
    });
    await request(app).post('/reviews/add').send({
      username: 'reviewer7',
      password: 'pass123456',
      reviewText: 'Old review',
      rating: 8,
      movie: 'Oldest Test'
    });
    const res = await request(app).get('/reviews/oldest');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.reviews)).toBe(true);
  });

  test('Get by movie not found - 404', async () => {
    const res = await request(app).get('/reviews/movie/NonExistent');
    expect(res.status).toBe(404);
  });

  // DELETE REVIEW (1 test)
  test('Delete non-existent - 404', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).delete(`/reviews/delete/${fakeId}`);
    expect(res.status).toBe(404);
  });

  test('Movie populated', async () => {
    await request(app).post('/reviewers/register').send({
      username: 'popmovie',
      email: 'popmovie@test.com',
      password: 'pass123456'
    });
    await request(app).post('/movies/add').send({
      username: 'popmovie',
      password: 'pass123456',
      title: 'Pop Movie Title',
      releaseYear: 2020,
      genre: 'Drama'
    });
    await request(app).post('/reviews/add').send({
      username: 'popmovie',
      password: 'pass123456',
      reviewText: 'Pop movie test',
      rating: 8,
      movie: 'Pop Movie Title'
    });
    const res = await request(app).get('/reviews/all');
    expect(res.status).toBe(200);
    expect(res.body.reviews[0].movie.title).toBe('Pop Movie Title');
  });
});