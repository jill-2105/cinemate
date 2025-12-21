"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ReviewCard from "../components/ReviewCard"
import AddReviewForm from "../components/AddReviewForm"
import LoadingSpinner from "../components/LoadingSpinner"
import Toast from "../components/Toast"
import { getMovie, deleteMovie, addReview, deleteReview } from "../utils/api"
import "./MovieDetails.css"

const MovieDetails = () => {
  const { title } = useParams()
  const navigate = useNavigate()
  const { currentUser, password, isSessionValid } = useAuth()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchMovie()
  }, [title])

  const fetchMovie = async () => {
    setLoading(true)
    const { data, error } = await getMovie(title)
    if (data) {
      // Sort reviews by newest first
      if (data.reviews) {
        data.reviews.sort((a, b) => {
          const dateA = new Date(b.createdAt || b._id)
          const dateB = new Date(a.createdAt || a._id)
          return dateA - dateB
        })
      }
      setMovie(data)
    } else {
      setToast({ message: error || "Failed to load movie", type: "error" })
    }
    setLoading(false)
  }

  const calculateAvgRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No ratings yet"
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const renderStars = (rating) => {
    if (rating === "No ratings yet") {
      return <span>No ratings yet</span>
    }
    const numRating = Number.parseFloat(rating)
    const fullStars = Math.floor(numRating)
    const hasHalfStar = numRating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <span className="star-display-large">
        {"★".repeat(fullStars)}
        {hasHalfStar && "★"}
        {"☆".repeat(emptyStars)}
      </span>
    )
  }

  const handleAddReview = async (rating, reviewText) => {
    if (!currentUser || !isSessionValid()) {
      navigate("/login", { state: { message: "Session expired. Please login again." } })
      return
    }

    const { data, error } = await addReview(title, currentUser, rating, reviewText, password)
    if (data) {
      setToast({ message: "Review added!", type: "success" })
      setShowReviewForm(false)
      fetchMovie()
    } else {
      setToast({ message: error || "Failed to add review", type: "error" })
    }
  }

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return

    const { data, error } = await deleteReview(reviewId)
    if (data) {
      setToast({ message: "Review deleted", type: "success" })
      fetchMovie()
    } else {
      setToast({ message: error || "Failed to delete review", type: "error" })
    }
  }

  const handleDeleteMovie = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return

    const { data, error } = await deleteMovie(title)
    if (data) {
      setToast({ message: "Movie deleted", type: "success" })
      setTimeout(() => navigate("/movies"), 1000)
    } else {
      setToast({ message: error || "Failed to delete movie", type: "error" })
    }
  }

  const handleAddReviewClick = () => {
    if (!currentUser || !isSessionValid()) {
      navigate("/login", { state: { message: "Please login to add a review" } })
      return
    }
    setShowReviewForm(true)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!movie) {
    return (
      <div className="container">
        <p>Movie not found</p>
      </div>
    )
  }

  const avgRating = calculateAvgRating(movie.reviews)
  const posterUrl = movie.posterUrl || "https://via.placeholder.com/300x450/E0E0E0/2C2C2C?text=No+Poster"

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <img src={posterUrl || "/placeholder.svg"} alt={movie.title} className="w-full rounded-lg shadow-lg" />
          </div>

          <div className="lg:col-span-2">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">{movie.title}</h1>
            <p className="text-lg text-gray-600 mb-4">
              <span>{movie.director}</span>
              <span className="mx-2">•</span>
              <span>{movie.releaseYear}</span>
              <span className="mx-2">•</span>
              <span>{movie.genre}</span>
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-500 text-3xl">{renderStars(avgRating)}</span>
              <span className="text-gray-700 font-medium">
                {avgRating !== "No ratings yet" && `${avgRating} `}({movie.reviews?.length || 0}{" "}
                {movie.reviews?.length === 1 ? "review" : "reviews"})
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{movie.description}</p>

            {currentUser && (
              <button
                onClick={handleDeleteMovie}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Movie
              </button>
            )}
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Reviews</h2>
            {!showReviewForm && (
              <button
                onClick={handleAddReviewClick}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Add Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <AddReviewForm movieTitle={title} onSubmit={handleAddReview} onCancel={() => setShowReviewForm(false)} />
          )}

          {movie.reviews && movie.reviews.length > 0 ? (
            <div className="space-y-4">
              {movie.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} onDelete={handleDeleteReview} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first one to share your thoughts!</p>
            </div>
          )}
        </section>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

export default MovieDetails
