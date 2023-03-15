import { HalfStar, Star } from '@root/public/icons';
import { Movie } from '../@types';
import { FlexDiv } from './common';

interface Props {
  rating: number;
}

function MovieRating({ rating }: Props) {
  return (
    <FlexDiv align="end">
      {[...Array(Math.floor(rating))].map((_, idx) => (
        <Star key={idx} />
      ))}
      {Math.round(rating % 1) && <HalfStar />}{' '}
    </FlexDiv>
  );
}

export default MovieRating;
