const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviewer',
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Review', reviewSchema);
