import React from 'react';

import { styled } from '@root/stitches.config';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon?: React.ReactNode;
}

function Button({ children, icon, ...restProps }: React.PropsWithChildren<ButtonProps>) {
  return (
    <StyledButton {...restProps}>
      {icon && <IconBox>{icon}</IconBox>}
      {children}
    </StyledButton>
  );
}

const StyledButton = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

const IconBox = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& svg': {
    width: '16px',
    height: '16px',
    '& path': {
      fill: '$gray300',
    },
  },
});

export default Button;
