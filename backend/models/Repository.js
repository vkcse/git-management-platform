const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  repoId: String,
  name: String,
  stars: Number,
  defaultBranch: String,
  autoReview: { type: Boolean, default: false },
  provider: String
});

module.exports = mongoose.model('Repository', repositorySchema);