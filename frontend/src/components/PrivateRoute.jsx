"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
  const { currentUser, isSessionValid } = useAuth()
  const location = useLocation()

  if (!currentUser || !isSessionValid()) {
    return <Navigate to="/login" state={{ from: location, message: "Session expired. Please login again." }} replace />
  }

  return children
}

export default PrivateRoute
