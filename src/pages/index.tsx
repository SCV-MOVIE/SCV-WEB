import Head from 'next/head';

import { ThumbnailCard } from '@/components';
import { styled } from '@root/stitches.config';

const movieInfo = {
  title: 'Joker',
  date: '2021',
  star: 4.5,
  genre: ['Drama', 'Comedy', 'Adventure'],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next Apps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <FeatureSection>
          <MovieCard src="/thumbnail.jpeg" info={movieInfo} />
          <MovieCard src="/thumbnail.jpeg" info={movieInfo} />
          <MovieCard src="/thumbnail.jpeg" info={movieInfo} />
          <MovieCard src="/thumbnail.jpeg" info={movieInfo} />
          <MovieCard src="/thumbnail.jpeg" info={movieInfo} />
        </FeatureSection>
        <FeatureSection>
          <MovieCard src="/thumbnail.jpeg" size="large" info={movieInfo} />
          <MovieCard src="/thumbnail.jpeg" size="large" info={movieInfo} />
          <MovieCard src="/thumbnail.jpeg" size="large" info={movieInfo} />
        </FeatureSection>
      </div>
    </>
  );
}

const FeatureSection = styled('div', {
  width: '100%',
  display: 'flex',
  gap: 56,
});

const MovieCard = styled(ThumbnailCard, {
  objectFit: 'cover',
});
