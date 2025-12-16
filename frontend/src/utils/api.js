import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000",
})

export const getAuthData = () => {
  const username = localStorage.getItem("username")
  const password = localStorage.getItem("password")
  return { username, password }
}

export const checkSession = () => {
  const loginTime = localStorage.getItem("loginTime")
  if (!loginTime) {
    throw new Error("Session expired. Please login again.")
  }

  const thirtyMinutes = 30 * 60 * 1000
  if (Date.now() - Number.parseInt(loginTime) >= thirtyMinutes) {
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    localStorage.removeItem("loginTime")
    throw new Error("Session expired. Please login again.")
  }
}

// Reviewer endpoints
export const registerReviewer = async (username, email, password) => {
  try {
    const response = await api.post("/reviewers/register", { username, email, password })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || "Registration failed" }
  }
}

export const loginReviewer = async (username, password) => {
  try {
    const response = await api.post("/reviewers/login", { username, password })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed" }
  }
}

export const getReviewer = async (username) => {
  try {
    const response = await api.get(`/reviewers/${username}`)
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch reviewer" }
  }
}

export const updateReviewer = async (username, newData) => {
  try {
    checkSession()
    const response = await api.put("/reviewers/update", { username, newData })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Update failed" }
  }
}

export const deleteReviewer = async (username) => {
  try {
    checkSession()
    const response = await api.delete("/reviewers/delete", { data: { username } })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Delete failed" }
  }
}

// Movie endpoints
export const getAllMovies = async () => {
  try {
    const response = await api.get("/movies/all")
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch movies" }
  }
}

export const getMovie = async (title) => {
  try {
    const response = await api.get(`/movies/movie/${encodeURIComponent(title)}`)
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch movie" }
  }
}

export const createMovie = async (movieData) => {
  try {
    checkSession()
    const { username, password } = getAuthData()
    const response = await api.post("/movies/create", { ...movieData, username, password })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Failed to create movie" }
  }
}

export const updateMovie = async (title, updateData) => {
  try {
    checkSession()
    const { username, password } = getAuthData()
    const response = await api.put("/movies/update", { title, updateData, username, password })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Failed to update movie" }
  }
}

export const deleteMovie = async (title) => {
  try {
    checkSession()
    const { username, password } = getAuthData()
    const response = await api.delete("/movies/delete", { data: { title, username, password } })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Failed to delete movie" }
  }
}

// Review endpoints
export const addReview = async (movieTitle, reviewerUsername, rating, reviewText, password) => {
  try {
    checkSession()
    const response = await api.post("/reviews/add", {
      movieTitle,
      reviewerUsername,
      rating,
      reviewText,
      password,
    })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Failed to add review" }
  }
}

export const deleteReview = async (id) => {
  try {
    checkSession()
    const { username, password } = getAuthData()
    const response = await api.delete(`/reviews/delete/${id}`, { data: { username, password } })
    return { data: response.data }
  } catch (error) {
    return { error: error.response?.data?.message || error.message || "Failed to delete review" }
  }
}

export default api
