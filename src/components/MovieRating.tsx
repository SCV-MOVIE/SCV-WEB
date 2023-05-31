import { Tag } from '@chakra-ui/react';
import type { TagProps } from '@chakra-ui/react';
import { Movie } from '../@types';
import React from 'react';

interface Props {
  size: TagProps['size'];
  rating: Movie['rating'];
}

function MovieRating({ rating }: Props) {
  const colorScheme = React.useMemo(() => {
    switch (rating) {
      case 'All':
        return 'teal';
      case '12+':
        return 'yellow';
      case '15+':
        return 'green';
      case '18+':
        return 'red';
      default:
        return 'teal';
    }
  }, [rating]);

  return <Tag colorScheme={colorScheme}>{rating}</Tag>;
}

export default MovieRating;
