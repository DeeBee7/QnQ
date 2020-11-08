const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for Reviews
const ReviewsSchema = new Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'The Creator field is required']
  },

  // TODO: Change this location to map to actual location (maybe google maps)
  _location: {
    type: String,
    required: [true, 'The Location field is required']
  },

  title: {
    type: String,
    required: [true, 'The Review Title field is required'],
  },

  text: String
}, { emitIndexErrors: true });

ReviewsSchema.index({ _creator: 1, _location: 1 }, { unique: true });

var handleE11000 = function(error, res, next) {
  if ((error.name === 'MongoError') && (error.code === 11000)) {
    next(new Error('Duplicate Unique Key: Creator has already reviewed this location!'));
  } else {
    next();
  }
};

ReviewsSchema.post('save', handleE11000);

// create model for Reviews
const Reviews = mongoose.model('Reviews', ReviewsSchema, 'Reviews');

module.exports = Reviews;