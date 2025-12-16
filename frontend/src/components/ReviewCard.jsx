"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ReviewCard = ({ review, onDelete }) => {
  const { currentUser } = useAuth()

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  const canDelete = currentUser === review.reviewerUsername

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <Link to={`/profile/${review.reviewerUsername}`} className="font-semibold text-gray-900 hover:text-amber-600">
          {review.reviewerUsername}
        </Link>
        <span className="text-amber-500 text-lg">{renderStars(review.rating)}</span>
      </div>
      <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
      {canDelete && (
        <button
          onClick={() => onDelete(review._id)}
          className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default ReviewCard
