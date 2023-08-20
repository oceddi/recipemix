import { connectToDB } from "@/utils/database";
import Recipe from '@/models/recipe';


export const POST = async (req : Request) => {
  const { userId, name, category, description, photo, ingredients, steps} = await req.json();

  try {
    await connectToDB();
    const newRecipe = new Recipe({
      creator: userId,
      name,
      category,
      description,
      photo,
      ingredients,
      steps
    });

    await newRecipe.save();

    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new recipe", { status: 500 });
  }
};