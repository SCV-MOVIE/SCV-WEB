import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssText, globalCss } from '@root/stitches.config';
import { NavBar } from '../components';

const globalStyles = globalCss({
  body: { margin: 0, backgroundColor: '$background' },
});

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body style={{ ...globalStyles }}>
          <NavBar />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
