import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { css, Global } from '@emotion/react';

const globalStyles = css`
  a {
    text-decoration: none;
  }

  button {
    outline: none;
    border: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }

  body {
    &::-webkit-scrollbar {
      width: 0;
    }

    &::-webkit-scrollbar-thumb {
      height: 0;
    }

    & > #__next {
      height: 100%;
    }
  }
`;

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <Global styles={globalStyles} />
        <Main />
        <NextScript />
      </Html>
    );
  }
}
