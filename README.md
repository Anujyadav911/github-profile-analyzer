# GitHub Profile Analyzer API

A Node.js and Express backend service that analyzes a GitHub user profile using the GitHub public API and stores useful insights in a MySQL database.

## Features
- Fetch public profile data from GitHub using a username.
- Store insights like public repository count, followers, following, bio, location, etc. in a MySQL database.
- Retrieve a list of all previously analyzed profiles.
- Retrieve detailed data for a single analyzed profile from the database.

## Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** Server running locally or remotely.

## Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd github-profile-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Database Configuration**:
   - Create a MySQL database (e.g., `github_profiles`).
   - Copy the `.env.example` file to `.env` and fill in your MySQL credentials:
     ```bash
     cp .env.example .env
     ```
   - *Note: If you are using XAMPP/WAMP, the default user is usually `root` and the password is empty. The server will automatically create the database and table upon starting.*

4. **Start the server**:
   ```bash
   # Development mode (auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## Database Schema
The server automatically creates the database and `profiles` table. The raw SQL schema is also available in `schema.sql` for reference or manual import.

## API Endpoints

### 1. Analyze and Store a Profile
- **URL**: `/api/profiles/:username`
- **Method**: `POST`
- **Description**: Fetches data from GitHub for the given `:username` and stores it in the database.
- **Example Response**:
  ```json
  {
    "message": "Profile analyzed and saved successfully.",
    "data": {
      "username": "octocat",
      "name": "The Octocat",
      "public_repos": 8,
      "followers": 12000,
      ...
    }
  }
  ```

### 2. Get All Analyzed Profiles
- **URL**: `/api/profiles`
- **Method**: `GET`
- **Description**: Retrieves a list of all profiles that have been analyzed and stored in the database.
- **Example Response**:
  ```json
  [
    {
      "id": 1,
      "username": "octocat",
      "name": "The Octocat",
      ...
    }
  ]
  ```

### 3. Get a Specific Profile
- **URL**: `/api/profiles/:username`
- **Method**: `GET`
- **Description**: Retrieves data for a single profile from the database.
- **Example Response**:
  ```json
  {
    "id": 1,
    "username": "octocat",
    "name": "The Octocat",
    ...
  }
  ```

## Live Deployed API URL
*Deployment instructions can go here once the project is deployed to a platform like Render, Railway, or AWS.*
