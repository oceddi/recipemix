import { CustomButton, Star } from '.'
import { ReviewSubmitProps } from '@/types'

const NewReviewForm = ({
  review,
  setReview,
  stars,
  setStars,
  submitting,
  handleSubmit
} : ReviewSubmitProps ) => {

  const handleStarClick = ( index: number ) => {
    const nextStars = stars.slice();

    for (let i=4; i>=0; i--) {
      if (i > index && stars[i]) {
        nextStars[i] = 0;
      } else if (i <= index && !stars[i]) {
        nextStars[i] = 1;
      }
    }
    setStars(nextStars);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">Leave a Review:</h2>
        <div className="flex flex-row gap-2">
          <Star value={stars[0]} size={32} onClick={() => handleStarClick(0)}/>
          <Star value={stars[1]} size={32} onClick={() => handleStarClick(1)}/>
          <Star value={stars[2]} size={32} onClick={() => handleStarClick(2)}/>
          <Star value={stars[3]} size={32} onClick={() => handleStarClick(3)}/>
          <Star value={stars[4]} size={32} onClick={() => handleStarClick(4)}/>
        </div>

        <div className="">
          <textarea 
            value={review}
            onChange={(e)=>{setReview(e.target.value)}}
            rows={3}
            className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <CustomButton
            title="Add Review"
            btnType="submit"
            containerStyles="main_button text-white rounded-full"
            disabled={submitting}
          />
        </div>
      </div>
    </form>
  )
}

export default NewReviewForm