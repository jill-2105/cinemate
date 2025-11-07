import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Reviewer from './models/reviewer.js';
import Movie from './models/movie.js';
import Review from './models/review.js';

const dbLink = 'mongodb://127.0.0.1:27017/movie_review?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.7';

const seedData = async () => {
  try {
    await mongoose.connect(dbLink);
    console.log('Database Connection Successful');
    
    // Clear existing data first
    await Reviewer.deleteMany({});
    await Movie.deleteMany({});
    await Review.deleteMany({});
    console.log('\nOld Data Deleted (if present)');

    // Creating Reviewers
    const hashedPass1 = await bcrypt.hash("admin1pass", 10);
    const hashedPass2 = await bcrypt.hash("admin2pass", 10);
    const hashedPass3 = await bcrypt.hash("admin3pass", 10);
    const hashedPass4 = await bcrypt.hash("admin4pass", 10);
    const hashedPass5 = await bcrypt.hash("admin5pass", 10);
    
    const reviewers = await Reviewer.create([
      { username: 'admin1', email: 'admin1@gmail.com', password: hashedPass1 },
      { username: 'admin2', email: 'admin2@gmail.com', password: hashedPass2 },
      { username: 'admin3', email: 'admin3@gmail.com', password: hashedPass3 },
      { username: 'admin4', email: 'admin4@gmail.com', password: hashedPass4 },
      { username: 'admin5', email: 'admin5@gmail.com', password: hashedPass5 },
    ]);
    console.log('Reviewers Added');

    // Creating Movies
    const movies = await Movie.create([
      { title: '3 Idiots', releaseYear: 2009, genre: 'Drama', author: reviewers[0]._id },
      { title: 'Joker', releaseYear: 2019, genre: 'Thriller', author: reviewers[1]._id },
      { title: 'Hera Pheri', releaseYear: 2009, genre: 'Comedy', author: reviewers[2]._id },
      { title: 'Inception', releaseYear: 2010, genre: 'SciFi', author: reviewers[3]._id },
      { title: 'Interstellar', releaseYear: 2014, genre: 'SciFi', author: reviewers[4]._id },
    ]);
    console.log('Movies Added');

    // Creating Reviews with a delay to ensure unique timestamps
    const reviewsData = [
      {
        reviewText: 'Heartwarming comedy-drama that beautifully challenges educational stereotypes.',
        rating: 9,
        reviewer: reviewers[0]._id,
        movie: movies[0]._id
      },
      {
        reviewText: 'Haunting psychological masterpiece with Joaquin Phoenix delivering an incredible transformation.',
        rating: 9,
        reviewer: reviewers[1]._id,
        movie: movies[1]._id
      },
      {
        reviewText: 'Hilarious comedy that perfectly captures the chaotic dynamics of friendship and the struggles of keeping up with a tight-knit group.',
        rating: 10,
        reviewer: reviewers[2]._id,
        movie: movies[2]._id
      },
      {
        reviewText: 'Mind-bending sci-fi thriller with Christopher Nolan\'s signature blend of complex narrative and visual spectacle.',
        rating: 10,
        reviewer: reviewers[3]._id,
        movie: movies[3]._id
      },
      {
        reviewText: 'Epic space adventure with stunning visuals, thought-provoking themes, and a powerful emotional journey that transcends the genre.',
        rating: 10,
        reviewer: reviewers[4]._id,
        movie: movies[4]._id
      }
    ];

    for (const review of reviewsData) {
      await Review.create(review);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('Reviews Added');
    console.log('Seeding Completed Successfully\n');
  } 
  
  catch (error) {
    console.error('Error Adding Data to Database', error);
  }
  
  finally {
    mongoose.connection.close();
  }
};

seedData();
