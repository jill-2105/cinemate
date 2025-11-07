import express from 'express';
import mongoose from 'mongoose';

import reviewerRoutes from './routes/reviewers.js';
import movieRoutes from './routes/movies.js';
import reviewRoutes from './routes/reviews.js';

const app = express();
app.use(express.json());

const dbLink = 'mongodb://127.0.0.1:27017/movie_review?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.7';
mongoose.connect(dbLink)
  .then(() => console.log('Database Connection Successful'))
  .catch(err => console.log(err));

app.use('/reviewers', reviewerRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/test', (req,res) => {
  return res.send('Heyy there');
})

export default app;
