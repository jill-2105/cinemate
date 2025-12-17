# 🎬 Cinemate

> A modern, full-stack movie review platform where cinephiles can discover, review, and share their thoughts on films.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://cinemate-neon.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

**🌐 Live Application:** [https://cinemate-neon.vercel.app/](https://cinemate-neon.vercel.app/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

Cinemate is a comprehensive movie review platform that enables users to:
- Browse and discover movies
- Create and manage movie listings
- Write detailed reviews with star ratings
- View reviews from other users
- Manage personal profiles and review history

Built with modern web technologies, Cinemate provides a seamless user experience with a responsive design and robust backend API.

## ✨ Features

### User Management
- 🔐 Secure user registration and authentication
- 👤 User profiles with review history
- 🔒 Password hashing with bcrypt
- ✏️ Profile updates and account management

### Movie Management
- 🎥 Add new movies with title, release year, and genre
- 📝 View comprehensive movie listings
- 🔍 Search and filter movies
- ✨ Movie detail pages with all reviews
- 🛡️ Authenticated movie creation and editing

### Review System
- ⭐ Star-based rating system (1-10)
- 📝 Rich text reviews
- 📊 Review aggregation and statistics
- 🔄 Sort reviews by newest/oldest
- 👥 View reviews by author or movie
- 🗑️ Review management (create, delete)

### User Experience
- 🎨 Modern, responsive UI built with Tailwind CSS
- 🚀 Fast and intuitive navigation
- 📱 Mobile-friendly design
- ⚡ Real-time data updates
- 🎭 Beautiful component library (shadcn/ui)

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** shadcn/ui, Radix UI
- **Routing:** React Router DOM 7.10.1
- **HTTP Client:** Axios 1.13.2
- **Form Handling:** React Hook Form 7.60.0
- **Validation:** Zod 3.25.76
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB
- **ODM:** Mongoose 8.18.3
- **Validation:** Joi 18.0.1
- **Security:** bcrypt 6.0.0
- **CORS:** Enabled for cross-origin requests

### Development Tools
- **Testing:** Jest 29.7.0, Supertest 7.1.4
- **Code Quality:** ESLint
- **Build Tool:** React Scripts 5.0.1
- **Package Manager:** npm

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally on default port 27017) or MongoDB Atlas connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cinemate
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/movie_review
   PORT=5000
   ```

6. **Start MongoDB**
   ```bash
   # On Windows: Start MongoDB service
   # On Mac/Linux: mongod
   ```

### Running the Application

#### Development Mode

1. **Start the backend server** (from `backend` directory)
   ```bash
   cd backend
   npm run dev  # Uses nodemon for auto-reload
   # or
   npm start    # Standard node execution
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server** (from `frontend` directory)
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Database Seeding (Optional)

To populate the database with sample data:

```bash
cd backend
node seed.js
```

This creates:
- 5 sample reviewers (admin1 through admin5)
- 5 sample movies
- 5 sample reviews

**Note:** The seed script will delete all existing data before adding new data.

## 📁 Project Structure

```
cinemate/
│
├── backend/                 # Backend API
│   ├── models/             # Mongoose models
│   │   ├── movie.js
│   │   ├── review.js
│   │   └── reviewer.js
│   ├── routes/             # Express routes
│   │   ├── movies.js
│   │   ├── reviews.js
│   │   └── reviewers.js
│   ├── validator/          # Validation middleware
│   │   ├── middleware.js
│   │   ├── movieValidator.js
│   │   ├── reviewerValidator.js
│   │   └── reviewValidator.js
│   ├── tests/              # Test files
│   ├── app.js              # Main application file
│   ├── seed.js             # Database seeding script
│   └── package.json
│
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AddReviewForm.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── StarRating.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Movies.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   ├── AddMovie.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/        # React context
│   │   │   └── AuthContext.jsx
│   │   ├── api/            # API client
│   │   │   └── client.js
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   └── package.json
│
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Reviewer Endpoints

#### Register a New Reviewer
```http
POST /reviewers/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /reviewers/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

#### Get All Reviewers
```http
GET /reviewers/all
```

#### Get Reviewer by Username
```http
GET /reviewers/username/:username
```

#### Update Reviewer
```http
PUT /reviewers/update/:username
Content-Type: application/json

{
  "username": "new_username",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

#### Delete Reviewer
```http
DELETE /reviewers/delete
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

### Movie Endpoints

#### Add a New Movie
```http
POST /movies/add
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123",
  "title": "The Matrix",
  "releaseYear": 1999,
  "genre": "SciFi"
}
```

#### Get All Movies
```http
GET /movies/all
```

#### Get Movie by Title
```http
GET /movies/movie/:title
```

#### Update Movie
```http
PUT /movies/update/:title
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123",
  "title": "The Matrix Reloaded",
  "releaseYear": 2003,
  "genre": "SciFi"
}
```
**Note:** Only the creator of the movie can update it.

#### Delete Movie
```http
DELETE /movies/delete/:title
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```
**Note:** Only the creator of the movie can delete it.

### Review Endpoints

#### Add a New Review
```http
POST /reviews/add
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123",
  "reviewText": "An amazing movie with great storytelling!",
  "rating": 9,
  "movie": "The Matrix"
}
```

#### Get All Reviews
```http
GET /reviews/all
```

#### Get Reviews (Newest First)
```http
GET /reviews/newest
```

#### Get Reviews (Oldest First)
```http
GET /reviews/oldest
```

#### Get Reviews by Movie Title
```http
GET /reviews/movie/:title
```

#### Get Reviews by Reviewer Username
```http
GET /reviews/author/:author
```

#### Delete Review
```http
DELETE /reviews/delete/:id
```

### Data Models

#### Reviewer
- `username` (String, unique, required)
- `email` (String, unique, required)
- `password` (String, required, hashed with bcrypt)
- `registrationDate` (Date, default: Date.now)

#### Movie
- `title` (String, unique, required)
- `releaseYear` (Number, required)
- `genre` (String, required)
- `author` (ObjectId, ref: Reviewer, required)

#### Review
- `reviewer` (ObjectId, ref: Reviewer, required)
- `movie` (ObjectId, ref: Movie, required)
- `reviewText` (String, required)
- `rating` (Number, required, 1-10)
- `creationDate` (Date, default: Date.now)

## 🧪 Testing

### Backend Tests

Run the test suite:
```bash
cd backend
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🔒 Security Features

- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Input validation using Joi schemas
- ✅ Authentication required for protected routes
- ✅ Authorization checks (only creators can modify their content)
- ✅ Password exclusion from API responses
- ✅ CORS configuration for secure cross-origin requests
- ✅ Environment variables for sensitive data

## 📊 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (authorization failed)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## 🚢 Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel at: [https://cinemate-neon.vercel.app/](https://cinemate-neon.vercel.app/)

### Backend
The backend can be deployed on platforms like:
- Railway
- Heroku
- AWS
- DigitalOcean
- MongoDB Atlas (for database)

Ensure to set the following environment variables:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (production/development)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Notes

- Passwords are never returned in API responses
- Movie titles must be unique
- Usernames and emails must be unique
- Only one review per reviewer per movie is allowed
- Movie creators are automatically set to the authenticated user who adds the movie
- Reviews are automatically populated with reviewer and movie data

## 📄 License

This project is part of an assignment for **ADT (Advanced Database Topics)** course.

## 👨‍💻 Author

Created as part of **Semester 2 (Fall 2025) Advanced Database Topics Assignment 1**.

---

<div align="center">

**Built with ❤️ for cinephiles**

[Live Demo](https://cinemate-neon.vercel.app/) • [Report Bug](https://github.com/yourusername/cinemate/issues) • [Request Feature](https://github.com/yourusername/cinemate/issues)

</div>
