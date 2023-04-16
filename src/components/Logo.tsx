import styled from '@emotion/styled';
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

const Wrapper = styled.div`
  max-width: 100%;
  text-align: center;
`;

export default Logo;
