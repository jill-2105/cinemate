"use client"
import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  const calculateAvgRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No ratings yet"
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const renderStars = (rating) => {
    if (rating === "No ratings yet") {
      return <span className="text-gray-400 text-sm">No ratings yet</span>
    }
    const numRating = Number.parseFloat(rating)
    const fullStars = Math.floor(numRating)
    const hasHalfStar = numRating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <span className="text-amber-500 text-lg">
        {"★".repeat(fullStars)}
        {hasHalfStar && "★"}
        {"☆".repeat(emptyStars)}
      </span>
    )
  }

  const avgRating = calculateAvgRating(movie.reviews)
  const posterUrl = movie.posterUrl || "https://via.placeholder.com/300x450/E0E0E0/2C2C2C?text=No+Poster"
  const truncatedTitle = movie.title.length > 30 ? movie.title.substring(0, 30) + "..." : movie.title

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105"
      onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
    >
      <div className="aspect-[2/3] overflow-hidden bg-gray-200">
        <img src={posterUrl || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 line-clamp-1">{truncatedTitle}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {movie.director} • {movie.year}
        </p>
        <div className="flex items-center gap-2">
          {renderStars(avgRating)}
          {avgRating !== "No ratings yet" && <span className="text-sm font-medium text-gray-700">{avgRating}</span>}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
