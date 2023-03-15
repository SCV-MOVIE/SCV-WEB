import Link from 'next/link';

import { FlexDiv, FlexNav, Logo, Typography } from './common';
import { styled } from '@root/stitches.config';

function NavBar() {
  return (
    <Wrapper align="center" justify="between">
      <Link href="/">
        <StyledLogo width={80} height={80} />
      </Link>
      <SubNavBar justify="end" gap="40">
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

const Wrapper = styled(FlexDiv, {
  width: '100%',
  height: '80px',
  maxHeight: '80px',
  position: 'fixed',
  margin: '0 auto',
  zIndex: '9999',
  paddingLeft: 40,

  '@bp2': {
    paddingLeft: 24,
  },
});

const StyledLogo = styled(Logo, {
  maxWidth: 300,
});

const SubNavBar = styled(FlexNav, {
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
