'use client';

import RecipeCard from "@/components/RecipeCard";
import { RecipeArray, RecipeFullProps } from "@/types";
import React, { useEffect, useState } from "react";


const RecipeCardList = ({ data  } : { data: RecipeArray }) => {

  return (
    <div className="">
      <div className="m-2 grid grid-cols-12 gap-10">
        {
          data?.map((recipe : RecipeFullProps) => 
            (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            )
          )
        }
      </div>
    </div>
  )
}


const SearchResults = ({searchParams} : { searchParams: URLSearchParams}) => {
  const [recipes, setRecipes] = useState<RecipeArray>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response : Response = await fetch(`/api/recipe?${new URLSearchParams(searchParams)}`);
      const data : RecipeArray = await response.json();

      setRecipes(data);
    }

    fetchRecipes();
  }, [searchParams])

  return (
    <section>
      <RecipeCardList
        data={recipes}
      />
    </section>
  )
}

export default SearchResults