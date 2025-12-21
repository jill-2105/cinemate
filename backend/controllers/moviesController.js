// controllers/movies.js
const Movie = require('../models/movie');
const Review = require('../models/review');

const getMovies = async (req, res) => {
  try {
    // Get all movies
    const movies = await Movie.find().lean();
    
    // Get average ratings for all movies
    const movieIds = movies.map(movie => movie._id);
    const ratings = await Review.aggregate([
      { $match: { movie: { $in: movieIds } } },
      {
        $group: {
          _id: "$movie",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    // Create rating map
    const ratingMap = {};
    ratings.forEach(rating => {
      ratingMap[rating._id.toString()] = {
        avgRating: parseFloat(rating.avgRating.toFixed(1)),
        reviewCount: rating.reviewCount
      };
    });

    // Attach ratings to movies
    const moviesWithRatings = movies.map(movie => ({
      ...movie,
      reviews: ratingMap[movie._id.toString()] ? 
        [{ rating: ratingMap[movie._id.toString()].avgRating }] : []  // Format for your frontend
    }));

    res.json(moviesWithRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMovies };