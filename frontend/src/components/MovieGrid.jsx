"use client"

import { useState, useEffect } from "react"
import MovieCard from "./MovieCard"
import LoadingSpinner from "./LoadingSpinner"

const MovieGrid = ({ movies, loading }) => {
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genreFilter, setGenreFilter] = useState("")
  const [sortBy, setSortBy] = useState("title")

  useEffect(() => {
    if (!movies) return

    let result = [...movies]

    // Filter by genre
    if (genreFilter) {
      result = result.filter((movie) => movie.genre && movie.genre.toLowerCase().includes(genreFilter.toLowerCase()))
    }

    // Sort
    switch (sortBy) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "releaseYear":
        result.sort((a, b) => b.releaseYear - a.releaseYear)
        break
      case "rating":
        result.sort((a, b) => {
          const ratingA = calcAvgRating(a.reviews)
          const ratingB = calcAvgRating(b.reviews)
          return ratingB - ratingA
        })
        break
      default:
        break
    }

    setFilteredMovies(result)
  }, [movies, genreFilter, sortBy])

  const calcAvgRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Filter by genre..."
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
        >
          <option value="title">Sort by Title (A-Z)</option>
          <option value="releaseYear">Sort by Year (Newest)</option>
          <option value="rating">Sort by Rating (Highest)</option>
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No movies found. Add the first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={movie._id || index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieGrid
