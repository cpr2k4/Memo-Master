// models/User.js
import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    // minlength: 3, // Optional: adjust according to your needs
    // maxlength: 30 // Optional: adjust according to your needs
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that each email is unique
    trim: true,
    lowercase: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address'] // Optional: email validation
  },
  password: {
    type: String,
    required: true,
    // minlength: 6 // Optional: adjust according to your needs
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
