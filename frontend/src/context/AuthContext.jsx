import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [loginTime, setLoginTime] = useState(null)

  useEffect(() => {
    // Load auth data from localStorage on mount
    const storedUser = localStorage.getItem("username")
    const storedPassword = localStorage.getItem("password")
    const storedLoginTime = localStorage.getItem("loginTime")

    if (storedUser && storedPassword && storedLoginTime) {
      const isValid = isSessionValid(Number.parseInt(storedLoginTime))
      if (isValid) {
        setCurrentUser(storedUser)
        setPassword(storedPassword)
        setLoginTime(Number.parseInt(storedLoginTime))
      } else {
        // Session expired, clear storage
        logout()
      }
    }
  }, [])

  const isSessionValid = (time = loginTime) => {
    if (!time) return false
    const thirtyMinutes = 30 * 60 * 1000
    return Date.now() - time < thirtyMinutes
  }

  const login = (username, userPassword) => {
    const time = Date.now()
    localStorage.setItem("username", username)
    localStorage.setItem("password", userPassword)
    localStorage.setItem("loginTime", time.toString())
    setCurrentUser(username)
    setPassword(userPassword)
    setLoginTime(time)
  }

  const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    localStorage.removeItem("loginTime")
    setCurrentUser(null)
    setPassword(null)
    setLoginTime(null)
  }

  const value = {
    currentUser,
    password,
    loginTime,
    login,
    logout,
    isSessionValid,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
