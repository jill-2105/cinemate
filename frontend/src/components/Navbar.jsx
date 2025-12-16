"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SearchBar from "./SearchBar"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-serif font-bold text-gray-900 tracking-wide hover:text-amber-600 transition-colors"
            onClick={closeMobileMenu}
          >
            CINEMATE
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1 w-6 h-5 justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full bg-gray-900 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-gray-900 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-gray-900 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Movies
            </Link>
            {currentUser && (
              <Link to="/add-movie" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Add Movie
              </Link>
            )}

            {currentUser ? (
              <>
                <Link
                  to={`/profile/${currentUser}`}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}
        >
          <div className="py-4 space-y-3">
            {/* Mobile Search */}
            <div className="pb-3">
              <SearchBar />
            </div>

            <Link
              to="/"
              className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Movies
            </Link>
            {currentUser && (
              <Link
                to="/add-movie"
                className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Add Movie
              </Link>
            )}

            {currentUser ? (
              <>
                <Link
                  to={`/profile/${currentUser}`}
                  className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium text-center"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
