import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-9xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="font-serif text-3xl font-bold text-gray-700 mb-4">Scene Not Found</h2>
        <p className="text-gray-600 mb-8">Looks like this page has been cut from the final edit.</p>
        <Link
          to="/"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
