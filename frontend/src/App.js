import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import AddMovie from "./pages/AddMovie"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:title" element={<MovieDetails />} />
            <Route
              path="/add-movie"
              element={
                <PrivateRoute>
                  <AddMovie />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-6 text-center">
          <p className="text-sm">Built with love for cinephiles | © 2025 Cinemate</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
