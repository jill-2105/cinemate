const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviewer',
        required: true,
    },
});

module.exports = mongoose.model('Movie', movieSchema);
