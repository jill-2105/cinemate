"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MovieGrid from "../components/MovieGrid"
import { getAllMovies } from "../utils/api"

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const { data, error } = await getAllMovies()
      if (data) {
        setMovies(data)
        setFilteredMovies(data)
      }
      setLoading(false)
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery && movies.length > 0) {
      const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredMovies(filtered)
    } else {
      setFilteredMovies(movies)
    }
  }, [searchParams, movies])

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-8">All Movies</h1>
        <MovieGrid movies={filteredMovies} loading={loading} />
      </div>
    </div>
  )
}

export default Movies
