const express = require('express');
const mongoose = require('mongoose');

const reviewerRoutes = require('./routes/reviewers.js');
const movieRoutes = require('./routes/movies.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();
app.use(express.json());

const dbLink = 'mongodb://127.0.0.1:27017/movie_review?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.7';

if (process.env.NODE_ENV !== 'test') {
mongoose
  .connect(dbLink)
  .then(() => console.log('Database Connection Successful'))
  .catch((err) => console.log(err));
}

app.use('/reviewers', reviewerRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

app.get('/test', (req, res) => {
  return res.send('Heyy there');
});

const PORT = 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
