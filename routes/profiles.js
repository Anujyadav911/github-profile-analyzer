const express = require('express');
const router = express.Router();
const { analyzeProfile, getAllProfiles, getProfileByUsername } = require('../controllers/profileController');

// POST /api/profiles/:username - Fetch from GitHub and store/update in DB
router.post('/:username', analyzeProfile);

// GET /api/profiles - Fetch all stored profiles
router.get('/', getAllProfiles);

// GET /api/profiles/:username - Fetch a single profile from DB
router.get('/:username', getProfileByUsername);

module.exports = router;
