import { styled } from '@root/stitches.config';
import Image from 'next/image';

interface Props {
  width: Parameters<typeof Image>[0]['width'];
  height: Parameters<typeof Image>[0]['height'];
}

function Logo({ width, height }: Props) {
  return (
    <Wrapper>
      <Image src="/logo_square.png" alt="scv site logo" width={width} height={height} />
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  maxWidth: '100%',
});

export default Logo;
