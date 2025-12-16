import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
          Your Cinematic Companion
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover, review, and share the films that move you
        </p>
        <Link
          to="/movies"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-amber-700 transition-all hover:scale-105 shadow-lg"
        >
          Explore Movies
        </Link>
      </div>
    </section>
  )
}

export default Hero
