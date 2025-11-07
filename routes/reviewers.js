import express from 'express';
import Reviewer from '../models/reviewer.js';
import bcrypt from 'bcrypt';

import validate from '../validator/middleware.js';
import {
    reviewerValidateSchema,
    reviewerAuthenticateSchema,
    reviewerUsernameParaSchema
} from '../validator/reviewerValidator.js';

const router = express.Router();

// Add a new reviewer
router.post('/register', validate(reviewerValidateSchema), async (req, res) => {    
    try {
        const { username, email, password } = req.body;

        // Checking if user already exists by checking email
        const userExists = await Reviewer.findOne({ email: email });
        if (userExists)
            return res.status(409).json({ message: 'Reviewer with same email exists. Please Login' });

        // Checking if username already exists
        const usernameExists = await Reviewer.findOne({ username: username });
        if (usernameExists)
            return res.status(409).json({ message: 'Username already taken. Please select another one' });

        // Hashing the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newReviewer = new Reviewer({
            username,
            email,
            password: hashedPassword,
        });

        // Creating Reviewer(User)
        const savedReviewer = await newReviewer.save();
        return res.status(201).json({ message: `User ${savedReviewer.username} registered successfully` });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error in adding Reviewer', errors: error.errors });
        }
        return res.status(500).json({ message: 'Error adding Reviewer', error: error.message });
    }
});

// Login for existing reviewers
router.post('/login', validate(reviewerAuthenticateSchema), async (req, res) => {
    try {
        const { username, password } = req.body;

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

        return res.status(200).json({ message: `Login Successful. Welcome ${reviewerCheck.username}` });
    } catch (error) {
        return res.status(500).json({ message: 'Error Logging in', error: error.message });
    }
});

// Get all reviewers
router.get('/all', async (req, res) => {
    try {
        // Fetching all the reviewers
        const allUsers = await Reviewer.find().select('-password');
        return res.status(200).json({ message: 'Reviewers fetched Successfully', users: allUsers });
    } catch (error) {
        return res.status(500).json({ message: 'Error Fetching Reviewers', error: error.message });
    }
});

// Get specific reviewer by username
router.get('/username/:username', validate(reviewerUsernameParaSchema, 'params'), async (req, res) => {
    try {
        const { username } = req.params;

        // Checking if user exists by checking username, if does send it
        const reviewer = await Reviewer.findOne({ username }).select('-password');
        if (!reviewer)
            return res.status(404).json({ message: 'Reviewer not found' });

        return res.status(200).json({ message: 'Reviewer by Username Fetched Successfully', reviewer });
    } catch (error) {
        return res.status(500).json({ message: 'Error Fetching Reviewer by Username', error: error.message });
    }
});

// Update reviewer by username
router.put('/update/:username', validate(reviewerUsernameParaSchema, 'params'), validate(reviewerValidateSchema, 'body'), async (req, res) => {
    try {
        const { username } = req.params;
        const { username: newUsername, email, password } = req.body;

        // // Checking if user exists by checking username
        const reviewerCheck = await Reviewer.findOne({ username: username });
        if (!reviewerCheck) {
            return res.status(404).json({ message: 'Reviewer not found' });
        }

        // Creating object that will have the data to be updated
        const updateData = {};

        // If username is to be updated, check if its already taken or not before updating
        if (newUsername && newUsername !== username) {
            const isInvalid = await Reviewer.findOne({ username: newUsername });
            if (isInvalid) {
                // If the new username is already taken by another user, return 400
                return res.status(409).json({ message: 'Username already taken' });
            }
            // Adding new username to updateData
            updateData.username = newUsername;
        }

        // If email is to be updated, check if its already taken or not before updating
        if (email && email !== reviewerCheck.email) {
            const emailExists = await Reviewer.findOne({ email: email });
            if (emailExists) {
                return res.status(409).json({ message: 'Email already taken' });
            }
            updateData.email = email;
        }

        // Adding password to updateData after hashing
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // Perform the update operation and return the updated document
        const updatedReviewer = await Reviewer.findOneAndUpdate(
            { username: username },
            { $set: updateData },
            { new: true }
        );

        return res.status(201).json({ message: `Reviewer ${updatedReviewer.username} updated Successfully` });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error in updating reviewer', errors: error.errors });
        }
        return res.status(500).json({ message: 'Error updating reviewer', error: error.message });
    }
});

// Delete reviewer by username and password
router.delete('/delete', validate(reviewerAuthenticateSchema), async (req, res) => {
    try {
        const { username, password } = req.body;

        // Checking if user already exists by checking username
        const reviewerCheck = await Reviewer.findOne({ username });
        if (!reviewerCheck)
            return res.status(404).json({ message: 'User not exists' });

        const confirmDelete = await bcrypt.compare(password, reviewerCheck.password);
        if (confirmDelete) {
            const deletedUser = await Reviewer.deleteOne({ username });
            if (deletedUser.deletedCount === 1) {
                return res.status(200).json({ message: `User ${username} deleted Successfully` });
            } else {
                return res.status(404).json({ message: 'Deleting Reviewer Failed' });
            }
        } else {
            return res.status(401).json({ message: 'Not reviewerized' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error deleting Reviewer', error: error.message });
    }
});

export default router;
