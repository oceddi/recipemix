"use client";

import Image from 'next/image';
import { CustomButton } from '.';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Showcase = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleScroll = () => { 
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="showcase">
      <div className="flex-1 pt-26 padding-x">
        <h1 className="showcase__title">
          Find, share, talk about recipes - quickly and easily!
        </h1>

        <p className="showcase__subtitle">
          Make figuring out dinner an easier activity.
        </p>

        <div className="flex flex-row gap-4">
          <CustomButton 
            title="Expore Recipes"
            containerStyles="main_button text-white rounded-full mt-10"
            handleClick={handleScroll}
          />
          { session?.user ?  
            (<CustomButton 
              title="Add Recipe"
              containerStyles="main_button text-white rounded-full mt-10"
              handleClick={() => { router.push('/recipes/new') }}
              />
            ) : (

                <div className="flex flex-row gap-2 mt-12">
                  <p className="text-lg pl-5">"Sign In" to Add New Recipes</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                  </svg>
                </div>
            )
          }
        </div>
      </div>

      <div className="showcase__image-container">
        <div className="showcase__image">
          <Image 
            src="/stir-fry.png"
            alt="stir-fry"
            placeholder="empty"
            fill
            className="object-contain" />
        </div>

        <div className="showcase__image-overlay"></div>
      </div>
    </div>
  )
}

export default Showcase