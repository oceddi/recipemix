import { connectToDB } from "@/utils/database";
import Review from '@/models/review';
import Recipe from "@/models/recipe";


export const POST = async (req : Request, {
   params
  } : {
    params : { id: string }
  }) => {
  const { userId, recipeId, review, numStars } = await req.json();

  try {
    await connectToDB();

    const recipe = await Recipe.findById(recipeId);
    if(!recipe) {
      return new Response("Recipe does not exist", { status: 404});
    }

    // Only 1 review per person per recipe ...
    const existingReview = await Review.findOne({
      recipe: recipeId,
      creator: userId
    });

    if (existingReview) {
      return new Response("Review already exists", { status: 409});
    } else {
      if (recipe.stars) {
        recipe.stars.push(numStars);      
      } else {
        recipe.stars = [numStars];
      }

      await recipe.save();

      const newReview = new Review({
        recipe: recipeId,
        creator: userId,
        review,
        starCount: numStars
      });

      await newReview.save();

      return new Response(JSON.stringify(newReview), { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new review", { status: 500 });
  }
};