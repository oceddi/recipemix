import {  Schema, model, models  } from 'mongoose';

const RecipeSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description : {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: false
    },
    ingredients: {
      type: [String],
      required: true
    },
    steps: {
      type: [String],
      required: true
    },
    createDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    stars: {
      type: [Number],
      required: false
    }
});

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;