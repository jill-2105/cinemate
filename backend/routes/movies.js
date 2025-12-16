const express = require('express');
const bcrypt = require('bcrypt');
const Movie = require('../models/movie.js');
const Reviewer = require('../models/reviewer.js');

const validate = require('../validator/middleware');
const {
  movieValidateSchema,
  movieTitleSchema,
} = require('../validator/movieValidator');

const router = express.Router();

// Add a new movie
router.post('/add', validate(movieValidateSchema), async (req, res) => {
    try {
        const { username, password, title, releaseYear, genre} = req.body;
        
            // Checking if user exists by checking username
            const reviewerCheck = await Reviewer.findOne({ username });
            if (!reviewerCheck) {
                return res.status(404).json({ message: 'Reviewer not found. Please Register' });
            }
    
            // Comparing the password entered with the hashed password of user 
            const passwordMatch = await bcrypt.compare(password, reviewerCheck.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }

        // Checking if movie already exists by checking title
        const movieExists = await Movie.findOne({ title: title });
        if (movieExists)
            return res.status(409).json({ message: 'Movie already exists. Please Update' });

        // Saving Movie Data as per the entered Data
        const newMovie = new Movie({
            title,
            releaseYear,
            genre,
            author: reviewerCheck._id
        });

        // Saving Movie to DB
        const savedMovie = await newMovie.save();
        const populatedMovie = await Movie.findById(savedMovie._id).populate('author', 'username');
        return res.status(201).json({ message: `Movie ${savedMovie.title} added successfully`, movie: populatedMovie });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error in adding Movie', errors: error.errors });
        }
        return res.status(500).json({ message: 'Error adding Movie', error: error.message });
    }
});

// Get all movies
router.get('/all', async (req, res) => {
    try {
        // Fetching all the Movies
        const allMovies = await Movie.find().populate('author', 'username');
        return res.status(200).json({ message: 'Movies fetched Successfully', movies: allMovies });
    } catch (error) {
        return res.status(500).json({ message: 'Error Fetching Movies', error: error.message });
    }
});

// Get specific movie by title
router.get('/movie/:title', validate(movieTitleSchema, 'params'), async (req, res) => {
    try {
        const { title } = req.params;
        // Checking if Movie exists by checking title, if does send it
        const fetchedMovie = await Movie.findOne({ title }).populate('author', 'username');
        if (!fetchedMovie)
            return res.status(404).json({ message: 'Movie not found' });

        return res.status(200).json({ message: 'Movie by Title Fetched Successfully', fetchedMovie });
    } catch (error) {
        return res.status(500).json({ message: 'Error Fetching movie by title', error: error.message });
    }
});

// Update movie by ID
router.put('/update/:title', validate(movieTitleSchema, 'params'),validate(movieValidateSchema, 'body'), async (req, res) => {
    try {
        const { title: currenttitle } = req.params;
        const { username, password, title: newTitle, releaseYear, genre } = req.body;

        // Authentication: Check if user exists and password is correct
        const reviewerCheck = await Reviewer.findOne({ username });
        if (!reviewerCheck) {
            return res.status(404).json({ message: 'Reviewer not found. Please Register' });
        }

        // Comparing the password entered with the hashed password of user 
        const passwordMatch = await bcrypt.compare(password, reviewerCheck.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Checking if movie exists by checking title
        const movieCheck = await Movie.findOne({ title: currenttitle });
        if (!movieCheck) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Authorization: Check if the authenticated user is the creator of the movie
        if (movieCheck.author.toString() !== reviewerCheck._id.toString()) {
            return res.status(403).json({ message: 'Access denied. Only the creator can update this movie' });
        }

        // Creating object that will have the data to be updated
        const updateData = {};

        // If movie is to be updated, check if its already taken or not before updating
        if (newTitle && newTitle !== currenttitle) {
            const isInvalid = await Movie.findOne({ title: newTitle });
            if (isInvalid) {
                // If the new movie is already taken, return 400
                return res.status(409).json({ message: 'Movie already taken' });
            }
            // Adding new username to updateData
            updateData.title = newTitle;
        }

        // Adding releaseYear and genre to updateData
        if (releaseYear) updateData.releaseYear = releaseYear;
        if (genre) updateData.genre = genre;

        // Perform the update operation and return the updated document
        const updatedMovie = await Movie.findOneAndUpdate(
            { title: currenttitle },
            { $set: updateData },
            { new: true }
        ).populate('author', 'username');

        return res.status(200).json({ message: `Movie ${updatedMovie.title} updated Successfully`, movie: updatedMovie });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error in updating movie', errors: error.errors });
        }
        return res.status(500).json({ message: 'Error updating movie', error: error.message });
    }
});

// Delete movie by ID
router.delete('/delete/:title', validate(movieTitleSchema, 'params'), async (req, res) => {
    try {
        const { title } = req.params;
        const { username, password } = req.body;

        // Authentication: Check if user exists and password is correct
        const reviewerCheck = await Reviewer.findOne({ username });
        if (!reviewerCheck) {
            return res.status(404).json({ message: 'Reviewer not found. Please Register' });
        }

        // Comparing the password entered with the hashed password of user 
        const passwordMatch = await bcrypt.compare(password, reviewerCheck.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Checking if movie already exists by checking title
        const movieCheck = await Movie.findOne({ title });
        if (!movieCheck) {
            return res.status(404).json({ message: 'Movie not Found' });
        }

        // Authorization: Check if the authenticated user is the creator of the movie
        if (movieCheck.author.toString() !== reviewerCheck._id.toString()) {
            return res.status(403).json({ message: 'Access denied. Only the creator can delete this movie' });
        }

        await Movie.deleteOne({ title });
        return res.status(200).json({ message: `Movie ${title} deleted successfully` });

    } catch (error) {
        return res.status(500).json({ message: 'Error deleting Movie', error: error.message });
    }
});

module.exports = router;
