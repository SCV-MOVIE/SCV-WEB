import Link from 'next/link';

import { Logo, Typography } from './common';
import { styled } from '@root/stitches.config';

function NavBar() {
  return (
    <Wrapper>
      <Link href="/">
        <StyledLogo width={80} height={80} />
      </Link>
      <SubNavBar>
        <Link href="/login">
          <Typography type="body3" color="white">
            Login
          </Typography>
        </Link>
        <Link href="/login">
          <Typography type="body3" color="white">
            Login
          </Typography>
        </Link>
        <Link href="/login">
          <Typography type="body3" color="white">
            Login
          </Typography>
        </Link>
        <Link href="/login">
          <Typography type="body3" color="white">
            Login
          </Typography>
        </Link>
      </SubNavBar>
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  width: '100%',
  height: '80px',
  maxHeight: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  margin: '0 auto',
  zIndex: '9999',
  paddingLeft: 40,
});

const StyledLogo = styled(Logo, {
  maxWidth: 300,
});

const SubNavBar = styled('nav', {
  display: 'flex',
  justifyContent: 'end',
  gap: 40,
  flex: 1,
  paddingRight: 140,

  '& > a': {
    textDecoration: 'none',
  },
  '& > a:hover': {
    color: '$red',
  },

  '@bp2': {
    paddingRight: 80,
  },
});

export default NavBar;
