# Cinemate Backend System
# Movie Review API

A RESTful API for managing movie reviews, built with Node.js, Express, and MongoDB. This application allows users to register as reviewers, add movies, and create reviews with ratings.

## Features

- **User Management**: Register, login, update, and delete reviewer accounts
- **Movie Management**: Add, view, update, and delete movies (with authentication)
- **Review System**: Create reviews for movies with ratings and text
- **Secure Authentication**: Password hashing using bcrypt
- **Data Validation**: Request validation using Joi
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Population**: Automatic population of related data (reviewer, movie references)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Joi
- **Security**: bcrypt (password hashing)
- **Development**: nodemon

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie_review
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running:
```bash
# MongoDB should be running on localhost:27017
# On Windows: Start MongoDB service
# On Mac/Linux: mongod
```

## Database Setup

The application uses MongoDB database named `movie_review`. The connection string is configured in `app.js`:
```
mongodb://127.0.0.1:27017/movie_review
```

### Seed the Database (Optional)

To populate the database with sample data, run:
```bash
node seed.js
```

This will create:
- 5 sample reviewers (admin1 through admin5)
- 5 sample movies
- 5 sample reviews

**Note**: The seed script will delete all existing data before adding new data.

## Running the Application

1. Start the server:
```bash
node app.js
```

Or with nodemon (auto-reload on changes):
```bash
nodemon app.js
```

2. The server will start on `http://localhost:3000`

3. Test the connection:
```bash
curl http://localhost:3000/test
```

## API Endpoints

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
**Note**: Only the creator of the movie can update it.

#### Delete Movie
```http
DELETE /movies/delete/:title
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```
**Note**: Only the creator of the movie can delete it.

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

## Project Structure

```
movie_review/
│
├── app.js                 # Main application file
├── seed.js                # Database seeding script
├── package.json           # Project dependencies
│
├── models/                # Mongoose models
│   ├── movie.js          # Movie schema
│   ├── review.js         # Review schema
│   └── reviewer.js       # Reviewer schema
│
├── routes/                # Express routes
│   ├── movies.js         # Movie endpoints
│   ├── reviews.js        # Review endpoints
│   └── reviewers.js      # Reviewer endpoints
│
└── validator/             # Validation middleware
    ├── middleware.js     # Validation middleware
    ├── movieValidator.js # Movie validation schemas
    ├── reviewerValidator.js # Reviewer validation schemas
    └── reviewValidator.js # Review validation schemas
```

## Data Models

### Reviewer
- `username` (String, unique, required)
- `email` (String, unique, required)
- `password` (String, required, hashed)
- `registrationDate` (Date, default: Date.now)

### Movie
- `title` (String, unique, required)
- `releaseYear` (Number, required)
- `genre` (String, required)
- `author` (ObjectId, ref: Reviewer, required)

### Review
- `reviewer` (ObjectId, ref: Reviewer, required)
- `movie` (ObjectId, ref: Movie, required)
- `reviewText` (String, required)
- `rating` (Number, required)
- `creationDate` (Date, default: Date.now)

## Example Usage

### 1. Register a New Reviewer
```bash
curl -X POST http://localhost:3000/reviewers/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "movie_lover",
    "email": "movie@example.com",
    "password": "mypassword123"
  }'
```

### 2. Add a Movie
```bash
curl -X POST http://localhost:3000/movies/add \
  -H "Content-Type: application/json" \
  -d '{
    "username": "movie_lover",
    "password": "mypassword123",
    "title": "Inception",
    "releaseYear": 2010,
    "genre": "SciFi"
  }'
```

### 3. Create a Review
```bash
curl -X POST http://localhost:3000/reviews/add \
  -H "Content-Type: application/json" \
  -d '{
    "username": "movie_lover",
    "password": "mypassword123",
    "reviewText": "Mind-bending and visually stunning!",
    "rating": 10,
    "movie": "Inception"
  }'
```

### 4. Get All Reviews for a Movie
```bash
curl http://localhost:3000/reviews/movie/Inception
```

## Security Features

- Password hashing using bcrypt (10 salt rounds)
- Input validation using Joi schemas
- Authentication required for movie creation, update, and deletion
- Authorization checks (only movie creators can update/delete their movies)
- Password exclusion from API responses

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (authorization failed)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## Notes

- Passwords are never returned in API responses
- Movie titles must be unique
- Usernames and emails must be unique
- Only one review per reviewer per movie is allowed
- Movie creators are automatically set to the authenticated user who adds the movie

## License

This project is part of an assignment for ADT (Advanced Data Structures) course.

## Author

Created as part of Semester 2 (FAll 2025) Advanced Databse Topics Assignment 1.