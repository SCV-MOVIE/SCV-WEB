import styled from '@emotion/styled';
import Image from 'next/image';

interface Props{
  movie: {
    
  }
}

function MovieCard() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
`;

const MovieImage = styled(Image)`
  max-width: 100%;
`;

export default MovieCard;
