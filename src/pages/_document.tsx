import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssText, globalCss } from '@root/stitches.config';

const globalStyles = globalCss({
  body: { margin: 0 },
});

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body style={{ ...globalStyles }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
