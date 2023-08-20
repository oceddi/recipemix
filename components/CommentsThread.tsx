import { ReviewProps } from '@/types'
import Image from 'next/image';
import { Star } from '.';

const Comment = ({comment} : { comment: ReviewProps}) => {
  const starsToDisplay = new Array(5).fill(0);
  for (let i=0; i<5; i++) {
    if (comment.starCount > i) {
      starsToDisplay[i] = 1;
    }
  }
  const dt = new Date(comment.createDate);


  return (
    <div className="flex flex-col shadow p-5 gap-5 justify-between">
      <div className="flex flex-row gap-2">
        <div className="relative w-6 h-6">
          { comment.creator.image &&
            <Image 
              src={comment.creator.image}
              alt="icon"
              fill
              className="object-contain rounded-full"
            />
          }
        </div>
        <div className="font-semibold">{comment.creator.username}</div>
      </div>
      <div className="flex flex-row gap-5 justify-start gap-3">
        <div className="flex flex-row  star_review">
          <Star value={starsToDisplay[0]} size={24}/>
          <Star value={starsToDisplay[1]} size={24}/>
          <Star value={starsToDisplay[2]} size={24}/>
          <Star value={starsToDisplay[3]} size={24}/>
          <Star value={starsToDisplay[4]} size={24}/>
        </div>
        <div>
          {  (dt.getMonth() + 1) + "/" + dt.getDate() + "/" +  dt.getFullYear() }
        </div>
      </div>
      <div className="">{comment.review}</div>
    </div>
  );
}


const CommentsThread = ({ comments } : { comments : Array<ReviewProps>}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl mb-5">Reviews ({comments.length})</div>
      <div className="gap-5">
        {comments.map((comment, i) => (
          <div key={i} className="gap-5">
            <Comment comment={comment} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsThread