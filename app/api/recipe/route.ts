import { connectToDB } from "@/utils/database";
import Recipe from "@/models/recipe";
import { NextRequest } from "next/server";

const REGEXP_ALPHA_CHARS_SPACES =  new RegExp(/[^a-zA-Z ]/g);

function sanitizeInput(input : string) {
  // Remove non-alphanumeric characters using a regular expression
  return input.replace(REGEXP_ALPHA_CHARS_SPACES, '');
}

export const GET = async (req: NextRequest ) => {
  const mongoSearch : {
    category?: string;
    name?: {
      '$regex' : RegExp
    };
  } = {};

  const urlObj = new URL(req.url);

  try {
    await connectToDB();

    if (urlObj) {
      if (urlObj.searchParams.has('category')) {
        mongoSearch['category'] = sanitizeInput(urlObj.searchParams.get('category') || '');
      }

      if (urlObj.searchParams.has('keyword')) {
        mongoSearch['name'] = { 
          $regex: new RegExp(sanitizeInput(urlObj.searchParams.get('keyword') || ''), 'i')
        };
      }
    }

    const results = await Recipe.find(mongoSearch).populate('creator');

    return new Response(JSON.stringify(results), { status: 200});
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 } );
  }
}