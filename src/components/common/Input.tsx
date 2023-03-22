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
      <div style={{ width: '100%' }}>
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
  outline: 'none',
  appearance: 'none',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  borderRadius: '$small',

  '&:focus': {
    border: '1px solid $coreBlue',
  },
  variants: {
    status: {
      success: {
        border: '1px solid $coreGreen',
      },
      fail: {
        border: '1px solid $coreRed',
        color: '$coreRed',
      },
      default: {
        border: '1px solid $gray400',
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
