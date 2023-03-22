import { css, styled } from '@root/stitches.config';
import { motion } from 'framer-motion';

const baseFlex = css({
  boxSizing: 'border-box',
  display: 'flex',
  flex: '1',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
    },
    align: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
    },
    wrap: {
      noWrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse',
      },
    },
    gap: {
      4: {
        gap: 4,
      },
      8: {
        gap: 8,
      },
      10: {
        gap: 10,
      },
      12: {
        gap: 12,
      },
      16: {
        gap: 16,
      },
      40: {
        gap: 40,
      },
      56: {
        gap: 56,
      },
      80: {
        gap: 80,
      },
    },
    flex: {
      auto: {
        flex: 'auto',
      },
      none: {
        flex: 'none',
      },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'start',
    justify: 'start',
    wrap: 'noWrap',
    flex: 'auto',
  },
});

export const FlexDiv = styled('div', baseFlex);
export const FlexNav = styled('nav', baseFlex);
export const FlexMotionDiv = styled(motion.div, baseFlex);
