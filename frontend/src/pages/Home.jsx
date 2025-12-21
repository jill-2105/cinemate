"use client"

import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import MovieCard from "../components/MovieCard"
import LoadingSpinner from "../components/LoadingSpinner"
import { getAllMovies } from "../utils/api"

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await getAllMovies()
      if (data) {
        // Get 4 random movies for featured section
        const shuffled = [...data].sort(() => 0.5 - Math.random())
        setFeaturedMovies(shuffled.slice(0, 4))
      }
      setLoading(false)
    }

    fetchMovies()
  }, [])

  return (
    <div>
      <Hero />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Featured Movies</h2>
          {loading ? (
            <LoadingSpinner />
          ) : featuredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMovies.map((movie, index) => (
                <MovieCard key={movie._id || index} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No movies available yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
