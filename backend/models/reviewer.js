const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Reviewer', reviewerSchema);
