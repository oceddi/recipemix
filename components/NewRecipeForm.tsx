"use client";

import { FormSubmitProps } from '@/types'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { CustomButton } from '.';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/constants';

const NewRecipeForm = ({ 
  post,
  setPost,
  uploadPhoto,
  submitting,
  handleSubmit
} : FormSubmitProps ) => {
  const router = useRouter();
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newStep, setNewStep] = useState<string>("");

  const handleChangeIngredient = (e:React.FormEvent<HTMLInputElement>) => {    
    setNewIngredient(e.currentTarget.value.trimStart());
  };

  const handleAddIngredient = () => {
    if (newIngredient === "")
      return;
    const nextIngredients = post.ingredients.slice();
    nextIngredients.push(newIngredient);
    setPost({ ...post, ingredients:nextIngredients});
    setNewIngredient("");
  };

  const handleChangeStep = (e:React.FormEvent<HTMLInputElement>) => {
    setNewStep(e.currentTarget.value.trimStart());
  };

  const handleAddStep = () => {
    if (newStep === "")
      return;
    const nextSteps = post.steps.slice();
    nextSteps.push(newStep);
    setPost({ ...post, steps:nextSteps});
    setNewStep("");
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="space-y-12 w-[770px]  p-10 border-2">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-xl font-semibold leading-7 text-gray-900">Add New Recipe</h1>
          <hr/>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Recipe Name
              </label>
              <div className="col-span-full">
                <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    name="title"
                    value={post.name}
                    onChange={(e)=> setPost({...post, name: e.target.value })}
                    type="text"
                    className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Chicken Pot Pie"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e)=> setPost({...post, category: e.target.value })}
                >
                  {
                    categories.map((category, i)=> (
                      <option key={i} value={category}>{category}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  value={post.description}
                  onChange={(e)=> setPost({ ...post, description: e.target.value })}
                  rows={3}
                  className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this dish.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="recipe-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Recipe photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={ async (e) => {
                          const photo= await uploadPhoto(e);
                          setPost({...post, photo : photo});
                        }
                      } accept="image/png, image/jpeg" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Ingredient List</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Provide a list of ingredients for the dish:</p>

          <ul role="list" className="divide-y divide-gray-100 pt-2">
            {post.ingredients.map((ingredient, i) => (
              <li key={i} className="flex justify-between py-1">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm leading-6 font-semibold text-gray-900">{ingredient}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="ingredient" className="block text-sm font-medium leading-6 text-gray-900">
                New Ingredient
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="ingredient"
                  id="ingredient"
                  className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChangeIngredient}
                  value={newIngredient}
                />
              </div>
              <CustomButton
                title="Add Ingredient"
                containerStyles="bg-blue-400 text-white rounded-full mt-10"
                handleClick={() => {handleAddIngredient()}}
              />
            </div>

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Preparation Steps</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Give us a set of steps (in order) to make the dish:
          </p>

          <ol role="list" className="m-4 list-decimal divide-y divide-gray-100 pt-2">
            {post.steps.map((step, i) => (
              <li key={i} className="py-1">
                    <p className="text-sm leading-6 font-semibold text-gray-500">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="step" className="block text-sm font-medium leading-6 text-gray-900">
                New Step
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="step"
                  id="step"
                  className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChangeStep}
                  value={newStep}
                />
              </div>
              <CustomButton
                title="Add Step"
                containerStyles="bg-blue-400 text-white rounded-full mt-10"
                handleClick={() => {handleAddStep()}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 flex items-center justify-end gap-x-4">
        <CustomButton
          title="Cancel"
          containerStyles="bg-white text-gray-900 font-semibold"
          handleClick={(() => {router.push('/')})}
        />
        <CustomButton
          title="Save Recipe"
          btnType="submit"
          containerStyles="main_button text-white rounded-full"
          disabled={submitting}
        />
      </div>
    </form>
  )
}

export default NewRecipeForm