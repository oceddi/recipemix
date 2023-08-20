'use client';

import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AccessDenied, NewRecipeForm } from '@/components';
import { RecipeNewProps } from '@/types';
import { categories } from '@/constants';

const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) : Promise<string> => {
  const file = e.target.files?.[0]!;
  const filename = encodeURIComponent(file.name);
  const fileType = encodeURIComponent(file.type);

  const res = await fetch(
    `/api/upload?file=${filename}&fileType=${fileType}`,
  );
  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (upload.ok) {
    return fields.key;
  } else {
    console.error('Upload failed.');
    console.dir(upload, {depth:null});
    console.dir(await upload.text());

    return '';
  }
};


export default function new_recipe() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<RecipeNewProps>({
    name: '',
    category: categories[0], // Default to this so we match first entry in pulldown.
    description: '',
    photo: '',
    ingredients: Array(),
    steps: Array(),
    stars: []
  });

  const createRecipe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/recipe/new',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          ...post
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error); 
    } finally {
      setSubmitting(false);
    }
  };

  if (!session) {
    return (
      <AccessDenied />
    )
  }

  return (
    <div className="flex justify-center">
      <NewRecipeForm 
        post={post}
        setPost={setPost}
        uploadPhoto={uploadPhoto}
        submitting={submitting}
        handleSubmit={createRecipe}
      />
    </div>
  );
}