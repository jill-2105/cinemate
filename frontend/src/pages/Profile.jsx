"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"
import Toast from "../components/Toast"
import { getReviewer, updateReviewer, deleteReviewer, getAllMovies } from "../utils/api"
import "./Profile.css"

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const [profile, setProfile] = useState(null)
  const [userReviews, setUserReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    setLoading(true)

    const { data: profileData, error: profileError } = await getReviewer(username)
    if (profileData) {
      setProfile(profileData)
      setNewEmail(profileData.email)
    }

    // Fetch all movies to get user's reviews
    const { data: moviesData } = await getAllMovies()
    if (moviesData) {
      const reviews = []
      moviesData.forEach((movie) => {
        if (movie.reviews) {
          movie.reviews.forEach((review) => {
            if (review.reviewerUsername === username) {
              reviews.push({
                ...review,
                movieTitle: movie.title,
              })
            }
          })
        }
      })
      setUserReviews(reviews)
    }

    setLoading(false)
  }

  const handleUpdateEmail = async (e) => {
    e.preventDefault()

    if (!newEmail.includes("@")) {
      setToast({ message: "Please enter a valid email", type: "error" })
      return
    }

    const { data, error } = await updateReviewer(username, { email: newEmail })
    if (data) {
      setToast({ message: "Email updated successfully", type: "success" })
      setShowEditModal(false)
      fetchProfile()
    } else {
      setToast({ message: error || "Failed to update email", type: "error" })
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    const { data, error } = await deleteReviewer(username)
    if (data) {
      setToast({ message: "Account deleted", type: "success" })
      logout()
      setTimeout(() => navigate("/"), 1000)
    } else {
      setToast({ message: error || "Failed to delete account", type: "error" })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!profile) {
    return (
      <div className="container">
        <p>User not found</p>
      </div>
    )
  }

  const isOwnProfile = currentUser === username

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">{profile.username}</h1>
          <p className="text-gray-600 mb-6">{profile.email}</p>

          {isOwnProfile && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            {isOwnProfile ? "My Reviews" : `${username}'s Reviews`}
          </h2>

          {userReviews.length > 0 ? (
            <div className="space-y-4">
              {userReviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3
                    className="font-serif text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-amber-600"
                    onClick={() => navigate(`/movie/${encodeURIComponent(review.movieTitle)}`)}
                  >
                    {review.movieTitle}
                  </h3>
                  <div className="text-amber-500 text-lg mb-3">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          )}
        </section>
      </div>

      {showEditModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">Edit Profile</h3>
            <form onSubmit={handleUpdateEmail}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

export default Profile
