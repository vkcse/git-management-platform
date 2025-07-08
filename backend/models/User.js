const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  gitlabId: String,
  bitbucketId: String,
  name: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  provider: String
});

module.exports = mongoose.model('User', userSchema);