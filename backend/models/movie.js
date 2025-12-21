const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  // frontend uses movie.year for display/sorting
  year: {
    type: Number,
    required: true,
  },

  // keep releaseYear for compatibility (can be same as year)
  releaseYear: {
    type: Number,
  },

  genre: {
    type: String,
    required: true,
  },

  // optional poster image URL used in MovieCard
  posterUrl: {
    type: String,
    default: "",
  },

  // shown under the title in MovieCard
  director: {
    type: String,
    default: "",
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "Reviewer",
    required: true,
  },
    year: {
    type: Number,
    // required: true,  // ✅ REMOVED - now optional
  },
});

module.exports = mongoose.model("Movie", movieSchema);
