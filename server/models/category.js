import mongoose, { Schema } from 'mongoose';

const Category = Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#3366CC'
  }
});

export default mongoose.model('Category', Category);