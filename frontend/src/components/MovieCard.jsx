"use client"
import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  // ADD THESE LOGS FIRST
  console.log('🎬 MovieCard received data:', JSON.stringify(movie, null, 2))
  console.log('📊 Reviews specifically:', movie?.reviews)
  console.log('⭐ Ratings values:', movie?.reviews?.map(r => ({ rating: r?.rating, type: typeof r?.rating })))
  const navigate = useNavigate()

  const calculateAvgRating = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) return "No ratings yet"
  const validRatings = reviews
    .map(review => Number(review?.rating))
    .filter(r => !isNaN(r) && r >= 0)
    return validRatings.length ? (validRatings.reduce((a,b)=>a+b,0)/validRatings.length).toFixed(1) : "No ratings yet"
  }

  const renderStars = (rating) => {
  if (rating === "No ratings yet") {
    return <span className="text-gray-400 text-sm">No ratings yet</span>
  }
  
  const numRating = Math.min(5, Math.max(0, Number.parseFloat(rating))) // Clamp 0-5
  if (isNaN(numRating)) {
    return <span className="text-gray-400 text-sm">Invalid rating</span>
  }
  
  const fullStars = Math.floor(numRating)
  // Fix: Round to nearest 0.5 for half-stars
  const roundedRating = Math.round(numRating * 2) / 2
  const hasHalfStar = roundedRating % 1 === 0.5
  const totalFilledStars = Math.floor(roundedRating) + (hasHalfStar ? 1 : 0)
  const emptyStars = Math.max(0, 5 - totalFilledStars)

    return (
      <span className="text-amber-500 text-lg">
        {"★".repeat(Math.max(0, fullStars))}
        {hasHalfStar && "½★"}  {/* Better half-star */}
        {"☆".repeat(emptyStars)}
      </span>
    )
  }

  const avgRating = calculateAvgRating(movie.reviews)
  const posterUrl = movie.posterUrl
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
          {movie.director} • {movie.releaseYear}
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
