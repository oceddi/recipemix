import {  Schema, model, models  } from 'mongoose';


const CommentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const ReviewSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Recipe'
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  review: {
    type: String,
    required: false
  },
  starCount: {
    type: Number,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  comments: {
    type: [CommentSchema]
  }
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;