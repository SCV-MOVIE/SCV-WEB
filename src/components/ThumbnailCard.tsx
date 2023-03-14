import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { Typography } from './common';
import { styled } from '@root/stitches.config';
import { Play, Star, HalfStar } from '@root/public/icons';

type FontLargeSize = {
  title: 'h1';
  description: 'body1';
};
type FontSmallSize = {
  title: 'h3';
  description: 'body3';
};
type FontSize = FontLargeSize | FontSmallSize;

interface Props {
  src: string;
  size?: 'small' | 'large';
  alt?: string;
  info: {
    title: string;
    date: string;
    genre: string[];
    star: number;
  };
}

function ThumbnailCard({ src, info, size = 'small', alt = 'movie-thumbnail' }: Props) {
  const [isHover, setIsHover] = React.useState(false);
  const fontSizes = React.useMemo<FontSize>(
    () =>
      size === 'small'
        ? {
            description: 'body3',
            title: 'h3',
          }
        : {
            description: 'body1',
            title: 'h1',
          },
    [size],
  );

  const handleMouseHover = React.useCallback(() => {
    setIsHover((prev) => !prev);
  }, []);

  return (
    <Wrapper size={size} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
      <ThumbnailImage fill alt={alt} src={src} />
      <AnimatePresence>
        {isHover && (
          <OverlayLayout
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
          >
            <PlayIcon size={size} />
            <StarSection>
              {[...Array(Math.floor(info.star))].map((_, idx) => (
                <Star key={idx} />
              ))}
              {Math.round(info.star % 1) && <HalfStar />}{' '}
            </StarSection>
            <motion.div>
              <Typography type={fontSizes.title} color="white">
                {info.title}
              </Typography>
              <Typography type={fontSizes.description} color="white">
                {info.date}
              </Typography>
              <Typography type={fontSizes.description} color="white">
                {info.genre.map((genre) => genre).join(', ')}
              </Typography>
            </motion.div>
          </OverlayLayout>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '$large',
  overflow: 'hidden',
  cursor: 'pointer',

  variants: {
    size: {
      small: {
        minWidth: 240,
        height: 320,
      },
      large: {
        width: 380,
        height: 512,
      },
    },
  },

  '&:hover': {
    img: {
      scale: 1.1,
      opacity: 0.5,
    },
  },
});

const ThumbnailImage = styled(Image, {
  borderRadius: '$large',
  transition: 'all 0.2s ease',
  zIndex: 95,
  backfaceVisibility: 'hidden',
});

const OverlayLayout = styled(motion.div, {
  width: '100%',
  height: '100%',
  paddingLeft: 24,
  paddingBottom: 32,
  zIndex: 99,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative',
});

const StarSection = styled('section', {
  display: 'flex',
});

const PlayIcon = styled(Play, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  variants: {
    size: {
      small: {
        width: 64,
        height: 64,
      },
      large: {
        width: 120,
        height: 120,
      },
    },
  },
});

export default ThumbnailCard;
