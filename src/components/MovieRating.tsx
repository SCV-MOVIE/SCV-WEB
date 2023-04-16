import { HStack } from '@chakra-ui/react';
import { HalfStar, Star } from '@root/public/icons';

interface Props {
  rating: number;
}

function MovieRating({ rating }: Props) {
  return (
    <HStack spacing={0}>
      {[...Array(Math.floor(rating))].map((_, idx) => (
        <Star key={idx} />
      ))}
      {Math.round(rating % 1) && <HalfStar />}{' '}
    </HStack>
  );
}

export default MovieRating;
