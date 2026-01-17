const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/auth/sync
// @desc    Sync Clerk user to database (auto-creates if doesn't exist)
// @access  Private
router.post('/sync', protect, async (req, res) => {
  try {
    // User is already synced by protect middleware
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Password management is handled by Clerk
// Users can update their password through Clerk's user profile

module.exports = router;
