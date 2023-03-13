import { styled } from '@root/stitches.config';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'body4';
  color?: 'general' | 'red' | 'blue' | 'white' | 'black';
}

function Typography({
  type,
  children,
  color = 'general',
  ...restProps
}: React.PropsWithChildren<Props>) {
  return (
    <Wrapper type={type} color={color} {...restProps}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  fontWeight: '700',
  letterSpacing: '-0.015em',
  lineHeight: 1.4,
  variants: {
    type: {
      h1: {
        fontSize: '40px',
      },
      h2: {
        fontSize: '32px',
      },
      h3: {
        fontSize: '24px',
      },
      h4: {
        fontSize: '18px',
      },
      body1: {
        fontSize: '20px',
        letterSpacing: '-0.018em',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '16px',
        letterSpacing: '-0.018em',
        lineHeight: 1.6,
      },
      body3: {
        fontSize: '14px',
        letterSpacing: '-0.018em',
        lineHeight: 1.6,
      },
      body4: {
        fontSize: '12px',
        letterSpacing: '-0.018em',
        lineHeight: 1.6,
      },
    },
    color: {
      black: {
        color: '$black',
      },
      white: {
        color: '$white',
      },
      general: {
        color: '$gray100',
      },
      red: {
        color: '$coreRed',
      },
      blue: {
        color: '$coreBlue',
      },
    },
  },
});

export default Typography;
