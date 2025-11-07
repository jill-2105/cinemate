import mongoose from 'mongoose';
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

export default mongoose.model('Movie', movieSchema);
