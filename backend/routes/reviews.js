const express = require('express');
const bcrypt = require('bcrypt');
const Review = require('../models/review.js');
const Reviewer = require('../models/reviewer.js');
const Movie = require('../models/movie.js');

const validate = require('../validator/middleware');
const {
  reviewCreateSchema,
  titleParaSchema,
  authorParaSchema,
  reviewIdParamSchema,
} = require('../validator/reviewValidator');

const router = express.Router();

// Add a new review
router.post('/add', validate(reviewCreateSchema), async (req, res) => {
    try {
        const { username, password, reviewText, rating, movie } = req.body;

        const reviewerCheck = await Reviewer.findOne({ username });
        if (!reviewerCheck) {
            return res.status(404).json({ message: 'Reviewer not found' });
        }

        const passwordMatch = await bcrypt.compare(password, reviewerCheck.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const movieCheck = await Movie.findOne({ title: movie });
        if (!movieCheck) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if review already exists
        const existingReview = await Review.findOne({
            reviewer: reviewerCheck._id,
            movie: movieCheck._id
        });
        if (existingReview) {
            return res.status(400).json({ message: 'Review already exists for this movie by this reviewer' });
        }

        // Create and save new review
        const newReview = new Review({
            reviewer: reviewerCheck._id,
            reviewText,
            rating,
            movie: movieCheck._id
        });

        const savedReview = await newReview.save();
        const populatedReview = await Review.findById(savedReview._id)
            .populate('movie', 'title releaseYear genre')
            .populate('reviewer', 'username email')
            .exec();

        // Returning populated data
        return res.status(201).json({ message: `Review added successfully`, review: populatedReview });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error in adding Review', errors: error.errors });
        }
        return res.status(500).json({ message: 'Error adding Review', error: error.message });
    }
});

// Get all reviews with movie and reviewer populated
router.get('/all', async (req, res) => {
    try {
        const allReviews = await Review.find()
            .populate('movie', 'title releaseYear')
            .populate('reviewer', 'username')
            .exec();
        return res.status(200).json({ message: 'Reviews fetched successfully', reviews: allReviews });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Get reviews sorted by newest first
router.get('/newest', async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('movie', 'title releaseYear')
            .populate('reviewer', 'username')
            .sort({ creationDate: -1 })
            .exec();
        return res.status(200).json({ message: 'Reviews fetched successfully (newest first)', reviews });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Get reviews sorted by oldest first
router.get('/oldest', async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('movie', 'title releaseYear')
            .populate('reviewer', 'username')
            .sort({ creationDate: 1 })
            .exec();
        return res.status(200).json({ message: 'Reviews fetched successfully (oldest first)', reviews });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Get review by movie title with populated movie and reviewer
router.get('/movie/:title', validate(titleParaSchema, 'params'), async (req, res) => {
    try {
        const { title } = req.params;

        const movieCheck = await Movie.findOne({ title: title });
        if (!movieCheck) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const review = await Review.find({ movie: movieCheck._id })
            .populate('movie', 'title releaseYear')
            .populate('reviewer', 'username')
            .sort({ creationDate: -1 })
            .exec();

        if (!review || review.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this movie' });
        }
        return res.status(200).json({ message: 'Review fetched successfully', review });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
});

// Get review by reviewer with populated movie and reviewer
router.get('/author/:author', validate(authorParaSchema, 'params'), async (req, res) => {
    try {
        const { author } = req.params;

        const reviewerCheck = await Reviewer.findOne({ username: author });
        if (!reviewerCheck) {
            return res.status(404).json({ message: 'Reviewer not found' });
        }

        const review = await Review.find({ reviewer: reviewerCheck._id })
            .populate('movie', 'title releaseYear')
            .populate('reviewer', 'username')
            .sort({ creationDate: -1 })
            .exec();

        if (!review || review.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this reviewer' });
        }
        return res.status(200).json({ message: 'Review fetched successfully', review });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
});

router.delete('/delete/:id', validate(reviewIdParamSchema, 'params'), async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id)
            .populate('movie', 'title releaseYear')
            .populate('reviewer', 'username')
            .exec();
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await Review.deleteOne({ _id: id });
        return res.status(200).json({ message: 'Review deleted successfully', review });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});

module.exports = router;
