const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Repository = require('../models/Repository');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-accessToken -refreshToken');
    const repos = await Repository.find({ userId: req.user.id });
    const autoReviewCount = repos.filter(repo => repo.autoReview).length;
    
    res.json({
      ...user._doc,
      totalRepos: repos.length,
      autoReviewRepos: autoReviewCount
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;