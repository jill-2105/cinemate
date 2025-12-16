const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const reviewerRoutes = require('./routes/reviewers.js');
const movieRoutes = require('./routes/movies.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();
app.use(express.json());

const dbLink = process.env.MONGODB_URI;

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
