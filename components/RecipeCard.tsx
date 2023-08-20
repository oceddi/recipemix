import { RecipeFullProps } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star } from '.';

const RecipeCard = ({recipe} :
  {
    recipe : RecipeFullProps
  }) => {
  const router = useRouter();
  const { _id, name, category, photo, stars } = recipe;
  const starsToDisplay = new Array(5).fill(0);
  let numStarsAvg = 0;

  if (stars && stars.length) {
    const numStarsTotal = stars.reduce((acc, cur) => acc + cur);
    numStarsAvg = numStarsTotal / stars.length;
    for (let i=0; i<5; i++) {
      if (numStarsAvg > i) {
        starsToDisplay[i] = 1;
      }
    }
  }

  return (
    <div 
      className="col-span-6 md:col-span-4 lg:col-span-3 shadow-xl"
      onClick={(() => {router.push(`/recipes/${_id}`)})}
      >
      <div className="flex flex-col gap-3">
        <div className="aspect-video relative">
          <Image
              src={ photo ? `https://recipemix.s3.us-west-2.amazonaws.com/${photo}` : "/plate.svg"}
              alt="food picture"
              fill
            />
        </div>

        <div>
          <p className="font-semibold text-sm text-gray-500 ml-5">
            {category.toUpperCase()}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-black ml-5">
            {name}
          </h3>
        </div>

        <div className="ml-5 mb-4">
          <div className="flex flex-row justify-start items-end gap-2">
            <div className="flex flex-row  star_review">
              <Star value={starsToDisplay[0]} size={24}/>
              <Star value={starsToDisplay[1]} size={24}/>
              <Star value={starsToDisplay[2]} size={24}/>
              <Star value={starsToDisplay[3]} size={24}/>
              <Star value={starsToDisplay[4]} size={24}/>
            </div>
            <div className="text-sm font-bold text-gray-400">
              {stars.length} Rating{stars.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard