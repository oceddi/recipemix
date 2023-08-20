'use client';

import { CommentsThread, Review, Star } from '@/components';
import { RecipeFullProps } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react'

const ViewRecipe = ( { 
  params 
} : {
  params : { id: string } 
}) => {
  const { data: session } = useSession();
  const [recipe, setRecipe] = useState<RecipeFullProps>();
  const [isLoading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [reviewStars, setReviewStars] = useState(Array(5).fill(0));
  const [submitting, setSubmitting] = useState(false);
  const [reviewed, setReviewed] = useState(true);
  const [comments, setComments] = useState([]);

  const createReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const numStars = reviewStars.reduce((acc, cur) => acc + cur);

      const response = await fetch(`/api/recipe/${params.id}/review/new`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          recipeId: params.id,
          review,
          numStars
        })
      });

      if (response.ok) {
        setReviewed(true);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    const getRecipeDetail = async () => {
      const responseRecipe = await fetch(`/api/recipe/${params.id}`);
      if (responseRecipe.ok) {
        const recipeData = await responseRecipe.json();
        setRecipe(recipeData);
      }

      if (session?.user.id) {
        const responseReview = await fetch(`/api/reviews/${params.id}/${session.user.id}`);
        console.dir(responseReview);
        if(responseReview.ok && responseReview.status === 200) {
          setReviewed(true);
        } else {
          setReviewed(false);
        }
      }

      const responseComments = await fetch(`/api/reviews/${params.id}`);
      if (responseComments.ok) {
        const commentData = await responseComments.json();
        setComments(commentData);
      }

      setLoading(false);
    };

    if (params.id) getRecipeDetail();
  }, [params.id, reviewed])

  if (isLoading) {
    return (
      <div className="flex  justify-center my-10">
        <div className="flex flex-col gap-10 items-center">
            <p className="text-5xl">Loading...</p>
        </div>
      </div>
    )
  } else {
    const { creator, name, category, description, photo, stars } = recipe || {};
    const starsToDisplay = new Array(5).fill(0);
    let numStarsAvg = 0;
    
    if (stars && stars.length) {
      const numStarsTotal = stars.reduce((acc: number, cur: number) => acc + cur);
      numStarsAvg = numStarsTotal / stars.length;
      numStarsAvg = Math.round((numStarsAvg + Number.EPSILON) * 100) / 100

      for (let i=0; i<5; i++) {
        if (numStarsAvg > i) {
          starsToDisplay[i] = 1;
        }
      }
    }

    return (
      <div className="flex justify-center">
        <div className="max-w-[1240px] p-5">
          <div className="">
            <div className="grid grid-cols-1  bg-white pb-5 rounded-md gap-3">
              {photo && (
                <div className="aspect-video relative">
                  <Image
                    src={`https://recipemix.s3.us-west-2.amazonaws.com/${photo}`}
                    alt="food picture"
                    fill
                  />
                </div>
              )}
              <div className="flex justify-start gap-5 flex-row items-end">
                <h3 className="text-5xl font-bold text-black">
                  {name}
                </h3>
                <p className="font-semibold text-sm  text-gray-500">
                  {category?.toUpperCase()}
                </p>
              </div>
              <div className="">
                <div className="flex flex-row justify-start items-end gap-2">
                  <div className="flex flex-row  star_review">
                    <Star value={starsToDisplay[0]} size={12}/>
                    <Star value={starsToDisplay[1]} size={12}/>
                    <Star value={starsToDisplay[2]} size={12}/>
                    <Star value={starsToDisplay[3]} size={12}/>
                    <Star value={starsToDisplay[4]} size={12}/>
                  </div>
                  <div className="text-sm font-bold text-black">
                    {numStarsAvg} ({stars?.length || 0})
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-10">
                <p className="font-satoshi  text-gray-500">
                  {description}
                </p>
              </div>
              <div className="flex flex-row justify-start font-satoshi text-sm gap-2">
                <div className=" ">
                  Contributed By:
                </div>
                <div className="text-blue-500">
                   {creator?.username}
                </div>
              </div>
              <div className="border-b border-t border-gray-900/10 pb-12 pt-12">
                <h2 className="pb-5 text-2xl">Ingredients:</h2>
                <ul className="list-disc">
                  {recipe?.ingredients.map((ingredient, i) => (
                    <li key={i} className="m-5">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm leading-6 text-gray-600">{ingredient}</p>
                        </div>
                      </div>
                  </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="pb-5 text-2xl">Directions:</h2>
                <ol className="">
                  {recipe?.steps.map((step, i) => (
                    <li key={i} className="py-5">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <h2 className="text-lg leading-6 font-semibold text-gray-900 py-1">Step {i+1}</h2>
                          <p className="text-sm leading-6 text-gray-600">{step}</p>
                        </div>
                      </div>
                  </li>
                  ))}
                </ol>
              </div>
              {(session?.user.id && !reviewed) &&
                <Review 
                  review={review}
                  setReview={setReview}
                  stars={reviewStars}
                  setStars={setReviewStars}
                  submitting={submitting}
                  handleSubmit={createReview}
                />
              }
              {comments &&
                <CommentsThread
                  comments={comments}
                />

              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewRecipe