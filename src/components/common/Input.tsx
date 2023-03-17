import React from 'react';
import { styled } from 'stitches.config';

// interface with all input props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'success' | 'fail';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, status, ...props }, ref) => {
    return (
      <div>
        {label && <Label htmlFor={type}>{label}</Label>}
        <StyledInput
          id={type}
          ref={ref}
          type={type}
          aria-invalid={status === 'default' ? undefined : status === 'fail' ? true : false}
          status={status}
          {...props}
        />
      </div>
    );
  },
);

const StyledInput = styled('input', {
  boxSizing: 'border-box',
  padding: '1rem',
  width: '100%',
  height: '32px',
  '&:focus': {
    border: '2px solid $coreBlue',
  },
  variants: {
    status: {
      success: {
        border: '2px solid $coreGreen',
      },
      fail: {
        border: '2px solid $coreRed',
        color: '$coreRed',
      },
      default: {
        border: '2px solid $gray400',
      },
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

const Label = styled('label', {
  display: 'inline-block',
  marginBottom: 8,
  color: '$white',
});

Input.displayName = 'Input';

export default Input;
