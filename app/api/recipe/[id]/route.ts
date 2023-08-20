import { connectToDB } from "@/utils/database";
import Recipe from "@/models/recipe";

export const GET = async (request : Request, { 
  params 
} : {
  params : { id: string } 
}) => {
  try {
    await connectToDB();

    const recipe = await Recipe.findById(params.id).populate('creator');
    return new Response(JSON.stringify(recipe), { status: 200});
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 } );
  }
}