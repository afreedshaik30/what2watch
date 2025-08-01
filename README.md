# What2Watch

What2Watch is a personal watchlist application where users can manage their movie watchlists with CRUD (Create, Read, Update, Delete) operations. Users can add movie details, including names, links, descriptions, and posters, which are uploaded to ImgBB and stored in a MySQL database. The application features a secure backend with Spring Boot and JWT authentication, and a responsive frontend built with React and styled with Tailwind CSS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites

To set up and run What2Watch, you’ll need the following tools and services:

- **Java 17 or later**: For running the Spring Boot backend.
- **Node.js 18.x or later**: For the React frontend.
- **MySQL 8.x**: For the database.
- **ImgBB Account and API Key**: For uploading movie posters (sign up at [ImgBB](https://imgbb.com)).
- **IDE**: IntelliJ IDEA, VS Code, or similar.
- **Maven**: For managing Spring Boot dependencies.
- **Git**: Optional, for version control.

## Installation

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/what2watch.git
   cd what2watch/backend
   ```

2. **Set Up MySQL Database**:
   - Create a database named `watchlist_db` in MySQL.
   - Configure the database connection in `src/main/resources/application.properties`:

3. **Run the Backend**:
   - Use Maven to start the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
   - The backend will run on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend**:
   ```bash
   npm start
   ```
   - The frontend will run on `http://localhost:3000`.

## Usage

Once the application is running:
- **Register**: Navigate to `/register` to create a new account.
- **Login**: Go to `/login` to authenticate and receive a JWT token.
- **Manage Watchlist**:
  - View your movies at the homepage (`/`).
  - Add a new movie at `/add`, including a poster image that will be uploaded to ImgBB.
  - Edit an existing movie at `/edit/:id`.
  - Delete movies directly from the list view.

The UI is styled with Tailwind CSS, providing a responsive and modern design. Each user can only manage their own watchlist, secured by JWT authentication.

## API Documentation

The backend provides RESTful APIs for authentication and movie management. All movie-related endpoints require a valid JWT token in the `Authorization` header.

| Endpoint                | Method | Description                     | Authentication Required |
|-------------------------|--------|---------------------------------|-------------------------|
| `/api/auth/register`    | POST   | Register a new user            | No                      |
| `/api/auth/login`       | POST   | Authenticate and get JWT token | No                      |
| `/api/movies`           | GET    | Retrieve all movies for user   | Yes                     |
| `/api/movies`           | POST   | Add a new movie                | Yes                     |
| `/api/movies/{id}`      | PUT    | Update an existing movie       | Yes                     |
| `/api/movies/{id}`      | DELETE | Delete a movie                 | Yes                     |

### Authentication Endpoints

- **Register**
  - **Method**: POST
  - **URL**: `/api/auth/register`
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - **Response**: 200 OK with message `"User registered successfully"`

- **Login**
  - **Method**: POST
  - **URL**: `/api/auth/login`
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response**: 200 OK with JWT token (e.g., `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`)

### Movie Endpoints

- **Get All Movies**
  - **Method**: GET
  - **URL**: `/api/movies`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: 200 OK with an array of movie objects:
    ```json
    [
      {
        "id": 1,
        "name": "Movie Title",
        "posterUrl": "https://i.ibb.co/abc123/poster.jpg",
        "link": "https://example.com",
        "description": "A short description",
        "user": { "id": 1, "username": "user1" }
      }
    ]
    ```

- **Add Movie**
  - **Method**: POST
  - **URL**: `/api/movies`
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: Multipart form data with:
    - `movie`: JSON string of movie details (`{ "name": "string", "link": "string", "description": "string" }`)
    - `poster`: Image file (e.g., JPEG, PNG)
  - **Response**: 200 OK with message `"Movie added successfully"`

- **Update Movie**
  - **Method**: PUT
  - **URL**: `/api/movies/{id}`
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: Multipart form data with updated movie details and optional new poster file
  - **Response**: 200 OK with message `"Movie updated successfully"`

- **Delete Movie**
  - **Method**: DELETE
  - **URL**: `/api/movies/{id}`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: 200 OK with message `"Movie deleted successfully"`

**Note**: All movie operations are restricted to the authenticated user’s own movies, enforced by JWT-based authorization.

## Deployment


### 🚀 Backend Deployment to Render using Docker

1. **Create a Render Account**: Sign up at [https://render.com](https://render.com).

2. **Prepare Docker Setup**:
   - Create a `Dockerfile` in your backend root:
     ```dockerfile
     FROM openjdk:17
     ARG JAR_FILE=target/*.jar
     COPY ${JAR_FILE} app.jar
     ENTRYPOINT ["java", "-jar", "/app.jar"]
     ```
   - In your `application.properties`, allow dynamic port binding:
     ```properties
     server.port=${PORT:8080}
     ```

3. **Build the Backend**:
   ```bash
   mvn clean package
   ```

4. **Push to GitHub**: Ensure your code is committed and pushed to a public/private GitHub repo.

5. **Deploy on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/).
   - Click **New > Web Service**.
   - Connect your GitHub repo.
   - Fill out the form:
     - **Environment**: Docker
     - **Docker Build Command**: *leave empty*
     - **Start Command**: *leave empty*
   - Set Environment Variables:
     ```
     IMGBB_API_KEY=your_imgbb_api_key
     JWT_SECRET=your_jwt_secret
     ```

6. **Click Create Web Service** and wait for deployment.

7. **Access Your API**:
   - Once deployed, your backend will be live at `https://<your-service-name>.onrender.com`.


### Frontend Deployment to Netlify

1. **Create a Netlify Account**: Sign up at [Netlify](https://www.netlify.com) and install the Netlify CLI.
2. **Build the React App**:
   ```bash
   npm run build
   ```
3. **Deploy to Netlify**:
   - Using Netlify CLI:
     ```bash
     netlify deploy --prod
     ```
   - Or, connect your repository to Netlify for continuous deployment via the Netlify dashboard.
4. **Set Environment Variable**:
   - In the Netlify dashboard, set `REACT_APP_API_URL` to your Heroku app URL (e.g., `https://your-app-name.herokuapp.com`)
   - Alternatively, create a `.env` file in the frontend directory:
     ```env
     REACT_APP_API_URL=https://your-app-name.herokuapp.com
     ```

**CORS Configuration**:
- Update the backend’s `CorsConfig.java` to allow requests from the Netlify domain:


## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, contact afreedshaik560@gmail.com.
