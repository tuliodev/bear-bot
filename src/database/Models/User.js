const mongoose = require('mongoose');

const User = new mongoose.Schema({
  discord_id: {
    type: String,
    unique: true,
  },
  name: String,
  coins: Number,
  xp: Number,
  level: Number,
});

module.exports = mongoose.model('User', User);
