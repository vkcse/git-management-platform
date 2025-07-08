const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Repository = require('../models/Repository');
const axios = require('axios');

router.get('/', auth, async (req, res) => {
  try {
    const repos = await Repository.find({ userId: req.user.id });
    res.json(repos);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id/auto-review', auth, async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);
    if (!repo) return res.status(404).json({ msg: 'Repository not found' });
    
    repo.autoReview = !repo.autoReview;
    await repo.save();
    res.json(repo);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);
    if (!repo) return res.status(404).json({ msg: 'Repository not found' });

    // Fetch line count (simplified approach using GitHub API for demonstration)
    let lineCount = 0;
    if (repo.provider === 'github') {
      const response = await axios.get(
        `https://api.github.com/repos/${repo.name}/git/trees/${repo.defaultBranch}?recursive=1`,
        {
          headers: { Authorization: `Bearer ${req.user.accessToken}` }
        }
      );
      
      // Count lines in files (simplified)
      for (const file of response.data.tree) {
        if (file.type === 'blob') {
          const content = await axios.get(file.url, {
            headers: { Authorization: `Bearer ${req.user.accessToken}` }
          });
          lineCount += Buffer.from(content.data.content, 'base64').toString().split('\n').length;
        }
      }
    }

    res.json({
      ...repo._doc,
      lineCount
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;