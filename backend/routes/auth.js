const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/github', passport.authenticate('github', { scope: ['user:email', 'repo'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/repos?token=${token}`);
  });

router.get('/gitlab', passport.authenticate('gitlab', { scope: ['api', 'read_user', 'read_repository'] }));

router.get('/gitlab/callback', 
  passport.authenticate('gitlab', { failureRedirect: '/login' }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/repos?token=${token}`);
  });

module.exports = router;