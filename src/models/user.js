const mongoose = require('mongoose');

// Define the password schema
const passwordSchema = new mongoose.Schema({
  website: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

// Define the user schema
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Firebase UID
  email: { type: String, required: true },
  name: { type: String, required: true },
  passwords: { type: [passwordSchema], default: [] },
}, {
  timestamps: true // Automatically handle createdAt and updatedAt fields
});

let User;

// Check if model already exists
if (!mongoose.models.User) {
  User = mongoose.model('User', userSchema, 'user-data');
} else {
  User = mongoose.models.User; // Reuse existing model
}

module.exports = User;
