const { Schema, model } = require('mongoose');

const course = new Schema({
  _id: String,
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String
});

module.exports = model('Course', course);