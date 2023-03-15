import { styled } from '@root/stitches.config';
import Image from 'next/image';

import { Movie } from '../@types';
import { FlexDiv, Typography } from './common';
import MovieRating from './MovieRating';

interface Props {
  movie: Movie;
}

function MainMovieThumbnail({ movie }: Props) {
  return (
    <Wrapper align="end">
      <MovieDescription direction="column" gap={8} justify="center">
        <Typography type="h1" color="white">
          {movie.title}
        </Typography>
        <MovieRating rating={movie.rating} />
        <Typography type="h4" color="blue">
          Overview
        </Typography>
        <FlexDiv gap={4}>
          <Typography type="body4" color="white">
            Genres:
          </Typography>
          {movie.genres.map((genre) => (
            <Typography type="body4" key={genre}>
              {genre}
            </Typography>
          ))}
        </FlexDiv>
        <Typography type="body4" style={{ whiteSpace: 'pre-line' }}>
          {movie.description}
        </Typography>
      </MovieDescription>
      <MainThumbnail fill src="/movie.jpeg" alt="main-movie thumbnail" />
    </Wrapper>
  );
}

const Wrapper = styled(FlexDiv, {
  width: '100%',
  height: '100vh',
  position: 'relative',
  top: -80,
  zIndex: 100,
});

const MainThumbnail = styled(Image, {
  zIndex: 50,
  opacity: 0.6,
});

const MovieDescription = styled(FlexDiv, {
  position: 'relative',
  zIndex: 100,
  paddingInline: 40,
  paddingBottom: 176,

  '@bp2': {
    paddingInline: 24,
  },
});

export default MainMovieThumbnail;
