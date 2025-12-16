"use client"

import { useState } from "react"
import StarRating from "./StarRating"

const AddReviewForm = ({ movieTitle, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (reviewText.trim().length < 10) {
      setError("Review must be at least 10 characters")
      return
    }

    onSubmit(rating, reviewText)
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <StarRating rating={rating} interactive={true} onChange={setRating} />
        </div>

        <div className="mb-4">
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this film..."
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddReviewForm
