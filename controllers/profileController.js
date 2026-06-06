const axios = require('axios');
const { pool } = require('../database');

// Fetch public profile data from GitHub using username and store insights
const analyzeProfile = async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch data from GitHub API
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const data = response.data;

    // Extract useful insights
    const profileData = {
      username: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      location: data.location,
      blog: data.blog
    };

    // Store in MySQL database using INSERT ... ON DUPLICATE KEY UPDATE
    const query = `
      INSERT INTO profiles (username, name, bio, avatar_url, public_repos, followers, following, location, blog)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        avatar_url = VALUES(avatar_url),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        location = VALUES(location),
        blog = VALUES(blog),
        analyzed_at = CURRENT_TIMESTAMP
    `;

    const values = [
      profileData.username,
      profileData.name,
      profileData.bio,
      profileData.avatar_url,
      profileData.public_repos,
      profileData.followers,
      profileData.following,
      profileData.location,
      profileData.blog
    ];

    await pool.query(query, values);

    res.status(200).json({
      message: 'Profile analyzed and saved successfully.',
      data: profileData
    });

  } catch (error) {
    console.error('Error analyzing profile:', error);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'GitHub user not found.' });
    }
    res.status(500).json({ error: 'Internal server error while analyzing profile.' });
  }
};

// Fetch all stored analyzed profile list
const getAllProfiles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profiles ORDER BY analyzed_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal server error while fetching profiles.' });
  }
};

// Fetch data of a single profile
const getProfileByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM profiles WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found in database. Analyze it first.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error while fetching profile.' });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername
};
