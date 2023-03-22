import { styled } from '@root/stitches.config';
import { FlexDiv, Logo, Typography } from './common';

function Bottom({ ...restProps }) {
  return (
    <Wrapper align="center" justify="center" {...restProps}>
      <Logo width={100} height={100} />
      <Infomation direction="column" gap={12} flex="none">
        <Typography type="body4">서울시립대학교 데이터베이스 설계</Typography>
        <Typography type="body4">2018920039 이상민, 2017920049 이명재, 20189200 임재욱</Typography>
        <Typography type="body4">영화 예매 사이트 구현</Typography>
      </Infomation>
    </Wrapper>
  );
}

const Wrapper = styled(FlexDiv, {
  width: '100%',
  height: '100px',
  textAlign: 'center',
  position: 'relative',
  paddingBottom: 80,
});

const Infomation = styled(FlexDiv, {});

export default Bottom;
