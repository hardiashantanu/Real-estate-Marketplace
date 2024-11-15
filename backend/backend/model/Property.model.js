// const mongoose = require('mongoose');

// const propertySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Assuming you have a User model
//     required: true,
//   },
//   image: {
//     type: String, // This will store the file path or URL of the uploaded image
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   verified: {
//     type: Boolean,
//     default: false, // Default to false until an admin verifies it
//   },
// });

// module.exports = mongoose.model('Property', propertySchema);
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  image: {
    type: String, // This will store the file path or URL of the uploaded image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false, // Default to false until an admin verifies it
  },
  purchased: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the buyer
      default: null, // Default to null when not purchased
    },
    status: {
      type: Boolean,
      default: false, // Default to false until the property is purchased
    },
  },
});

module.exports = mongoose.model('Property', propertySchema);

