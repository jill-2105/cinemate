"use client"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    const query = e.target.value
    if (query) {
      navigate(`/movies?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={handleSearch}
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
    </div>
  )
}

export default SearchBar
