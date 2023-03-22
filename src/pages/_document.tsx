import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssText, reset, globalCss } from '@root/stitches.config';

const globalStyles = globalCss({
  body: {
    width: '100%',
    height: '100vh',
    margin: 0,
    backgroundColor: '$background',
    overscrollBehaviorBlock: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      height: 0,
    },
    '& > #__next': {
      height: '100%',
    },
  },
});

const getCssAndReset = () => {
  const css = getCssText();
  reset();
  return css;
};

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: getCssAndReset() }} />
        </Head>
        <body style={{ ...globalStyles }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
