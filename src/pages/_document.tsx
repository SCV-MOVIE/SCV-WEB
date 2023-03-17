import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssText, reset, globalCss } from '@root/stitches.config';

const globalStyles = globalCss({
  body: {
    margin: 0,
    overscrollBehaviorBlock: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      height: 0,
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
          <style dangerouslySetInnerHTML={{ __html: getCssText() + getCssAndReset() }} />
        </Head>
        <body style={{ ...globalStyles }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
