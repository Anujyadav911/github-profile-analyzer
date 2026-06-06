CREATE DATABASE IF NOT EXISTS github_profiles;

USE github_profiles;

CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(255),
  public_repos INT DEFAULT 0,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  location VARCHAR(255),
  blog VARCHAR(255),
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
