import { connectToDB } from "@/utils/database";
import Review from "@/models/review";

export const GET = async (request : Request, { 
  params 
} : {
  params : { ids: Array<string> } 
}) => {
  try {
    await connectToDB();

    /* Single user review? */
    if (params.ids[1]) {
      const existingReview = await Review.findOne({
        recipe: params.ids[0],
        creator: params.ids[1]
      });
      if (existingReview) {
        return new Response(JSON.stringify(existingReview), { status: 200});
      } else {
        return new Response("No review for that recipe exists.", { status: 201});
      }
    } else { /* All reviews for a given recipe with 'review' field. */
      const existingReviews = await Review.find({
        recipe: params.ids[0],
        review: { $ne: '' }
      }).populate('creator');
      if (existingReviews) {
        return new Response(JSON.stringify(existingReviews), { status: 200});
      } else {
        return new Response("No reviews for that recipe exists.", { status: 201});
      }
    }
  } catch (error) {
    return new Response("Failed to fetch recipe review.", { status: 500 } );
  }
}