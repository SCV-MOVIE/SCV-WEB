import { styled } from '@root/stitches.config';
import { Typography } from './common';

interface Props {
  title: string;
}

function LinedTitle({ title }: Props) {
  return (
    <>
      <Typography type="h3">{title}</Typography>
      <Line />
    </>
  );
}

const Line = styled('div', {
  width: 60,
  height: 2,
  backgroundColor: '$coreBlue',
});

export default LinedTitle;
