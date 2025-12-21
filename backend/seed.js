require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Reviewer = require("./models/reviewer")
const Movie = require("./models/movie")
const Review = require("./models/review")

const dbLink = process.env.MONGODB_URI

const seedData = async () => {
  try {
    await mongoose.connect(dbLink)
    console.log("Database Connection Successful")

    // Clear existing data
    await Reviewer.deleteMany({})
    await Movie.deleteMany({})
    await Review.deleteMany({})
    console.log("Old Data Deleted")

    // 1. Create 5 reviewers (3 admins, 2 users)
    const hash = (p) => bcrypt.hash(p, 10)

    const reviewers = await Reviewer.create([
      { username: "admin1", email: "admin1@gmail.com", password: await hash("admin1pass"), role: "admin" },
      { username: "admin2", email: "admin2@gmail.com", password: await hash("admin2pass"), role: "admin" },
      { username: "admin3", email: "admin3@gmail.com", password: await hash("admin3pass"), role: "admin" },
      { username: "user1",  email: "user1@gmail.com",  password: await hash("user1pass"),  role: "user" },
      { username: "user2",  email: "user2@gmail.com",  password: await hash("user2pass"),  role: "user" },
    ])

    console.log("Reviewers Added")

    // 2. Define 20 movies (title, year, director, poster, etc.)
    const movieDefs = [
      {
        title: "3 Idiots",
        year: 2009,
        releaseYear: 2009,
        genre: "Drama",
        director: "Rajkumar Hirani",
        posterUrl: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
        authorIndex: 0,
      },
      {
        title: "Joker",
        year: 2019,
        releaseYear: 2019,
        genre: "Thriller",
        director: "Todd Phillips",
        posterUrl: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        authorIndex: 1,
      },
      {
        title: "Need for Speed",
        year: 2000,
        releaseYear: 2000,
        genre: "Comedy",
        director: "George Gatins",
        posterUrl: "https://image.tmdb.org/t/p/w500/4ktdbrhCnAoDGLW36afjB717Sa.jpg",
        authorIndex: 2,
      },
      {
        title: "Inception",
        year: 2010,
        releaseYear: 2010,
        genre: "SciFi",
        director: "Christopher Nolan",
        posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        authorIndex: 0,
      },
      {
        title: "Interstellar",
        year: 2014,
        releaseYear: 2014,
        genre: "SciFi",
        director: "Christopher Nolan",
        posterUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        authorIndex: 1,
      },
      {
        title: "The Dark Knight",
        year: 2008,
        releaseYear: 2008,
        genre: "Action",
        director: "Christopher Nolan",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        authorIndex: 2,
      },
      {
        title: "The Shawshank Redemption",
        year: 1994,
        releaseYear: 1994,
        genre: "Drama",
        director: "Frank Darabont",
        posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        authorIndex: 0,
      },
      {
        title: "Parasite",
        year: 2019,
        releaseYear: 2019,
        genre: "Thriller",
        director: "Bong Joon-ho",
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        authorIndex: 1,
      },
      {
        title: "Spirited Away",
        year: 2001,
        releaseYear: 2001,
        genre: "Fantasy",
        director: "Hayao Miyazaki",
        posterUrl: "https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg",
        authorIndex: 2,
      },
      {
        title: "The Matrix",
        year: 1999,
        releaseYear: 1999,
        genre: "SciFi",
        director: "The Wachowskis",
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        authorIndex: 0,
      },
      {
        title: "Fight Club",
        year: 1999,
        releaseYear: 1999,
        genre: "Drama",
        director: "David Fincher",
        posterUrl: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
        authorIndex: 1,
      },
      {
        title: "Dhurandhar (2025)",
        year: 2025,
        releaseYear: 2025,
        genre: "Crime",
        director: "Aditya Dhar",
        posterUrl: "https://image.tmdb.org/t/p/w500/clMx0KuFdoh8ck0fvCVy2lpafM6.jpg",
        authorIndex: 2,
      },
      {
        title: "The Godfather",
        year: 1972,
        releaseYear: 1972,
        genre: "Crime",
        director: "Francis Ford Coppola",
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        authorIndex: 0,
      },
      {
        title: "The Godfather Part II",
        year: 1974,
        releaseYear: 1974,
        genre: "Crime",
        director: "Francis Ford Coppola",
        posterUrl: "https://image.tmdb.org/t/p/w500/amvmeQWheahG3StKwIE1f7jRnkZ.jpg",
        authorIndex: 1,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        year: 2001,
        releaseYear: 2001,
        genre: "Fantasy",
        director: "Chris Columbus",
        posterUrl: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
        authorIndex: 2,
      },
      {
        title: "The Lord of the Rings: The Two Towers",
        year: 2002,
        releaseYear: 2002,
        genre: "Fantasy",
        director: "Peter Jackson",
        posterUrl: "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
        authorIndex: 0,
      },
      {
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
        releaseYear: 2003,
        genre: "Fantasy",
        director: "Peter Jackson",
        posterUrl: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        authorIndex: 1,
      },
      {
        title: "Iron Man 3",
        year: 2013,
        releaseYear: 2013,
        genre: "Drama",
        director: "Shane Black",
        posterUrl: "https://image.tmdb.org/t/p/w500/xscVJa7VhG2O0j8Huc08JARVY8s.jpg",
        authorIndex: 2,
      },
      {
        title: "Avatar",
        year: 2025,
        releaseYear: 2025,
        genre: "Fiction",
        director: "James Cameron",
        posterUrl: "https://image.tmdb.org/t/p/w500/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg",
        authorIndex: 0,
      },
      {
        title: "Phir Hera Pheri (2006)",
        year: 2006,
        releaseYear: 2006,
        genre: "Comedy",
        director: "Neeraj Vora",
        posterUrl: "https://image.tmdb.org/t/p/w500/c1Mvyd983ZyrU5Vf2aKEe6WncSq.jpg",
        authorIndex: 1,
      },
    ]

    const movies = await Movie.create(
      movieDefs.map((m) => ({
        title: m.title,
        year: m.year,
        releaseYear: m.releaseYear,
        genre: m.genre,
        director: m.director,
        posterUrl: m.posterUrl,
        author: reviewers[m.authorIndex]._id,
      }))
    )

    console.log("Movies Added")

    // 3. Create 100 reviews (5 per movie, cycling through reviewers)
    const reviewTexts = [
      "Loved the pacing and characters.",
      "Amazing cinematography.",
      "Story was okay, but performances were great.",
      "Instant classic.",
      "Rewatchable and fun every time.",
    ]

    const ratingsPattern = [10, 9, 8, 7, 9]

    const reviewDocs = []

    movies.forEach((movie, movieIndex) => {
      for (let i = 0; i < 5; i++) {
        const reviewer = reviewers[i % reviewers.length]
        reviewDocs.push({
          movie: movie._id,
          reviewer: reviewer._id,
          rating: ratingsPattern[i % ratingsPattern.length],
          reviewText: `${reviewTexts[i]} (movie #${movieIndex + 1})`,
        })
      }
    })

    await Review.insertMany(reviewDocs)
    console.log("Reviews Added")
    console.log("Seeding Completed Successfully")
  } catch (error) {
    console.error("Error Adding Data to Database", error)
  } finally {
    await mongoose.connection.close()
  }
}

seedData()
