import { connectToDB } from "@/utils/database";
import Review from "@/models/recipe";

export const GET = async (request : Request, { 
  params 
} : {
  params : { id: string, creator: string } 
}) => {
  try {
    await connectToDB();

    const existingReview = await Review.findOne({
      recipe: params.id,
      creator: params.creator
    });
    
    if (existingReview) {
      return new Response(JSON.stringify(existingReview), { status: 200});
    } else {
      return new Response("No review for that recipe exists.", { status: 201});
    }

  } catch (error) {
    return new Response("Failed to fetch recipe review.", { status: 500 } );
  }
}