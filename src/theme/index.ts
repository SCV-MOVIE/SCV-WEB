import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const colors = {
  // Gray Scale
  white: '#FFFFFF',
  offwhite: '#F8FAF9',
  gray100: '#E5E8EB',
  gray200: '#D1D6DB',
  gray300: '#8B95A1',
  gray400: '#4E5968',
  gray500: '#292929',
  black: '#181818',
  background: '#0D0D0D',

  // core color
  coreBlue: '#4285F4',
  coreRed: '#EA4335',
  coreYellow: '#FBBC04',
  coreGreen: '#0F9D58',

  // red color
  red100: '#FFEBEE',
  red200: '#FFCDD2',
  red300: '#EF9A9A',
  red400: '#E57373',
  red500: '#EF5350',
  red600: '#F44336',

  // gren color
  green100: '#E8F5E9',
  green200: '#C8E6C9',
  green300: '#A5D6A7',
  green400: '#81C784',
  green500: '#66BB6A',
  green600: '#4CAF50',

  // yellow color
  yellow100: '#FFF8E1',
  yellow200: '#FFECB3',
  yellow300: '#FFE082',
  yellow400: '#FFD54F',
  yellow500: '#FFCA28',
  yellow600: '#FFC107',

  // blue color
  blue100: '#E3F2FD',
  blue200: '#BBDEFB',
  blue300: '#90CAF9',
  blue400: '#64B5F6',
  blue500: '#42A5F5',
  blue600: '#2196F3',

  // oragne
  orange: '#FF6B00',
} as const;

const breakPoiints = {
  mobile: '768px',
  bp2: '1920px',
};

export const theme = extendTheme({
  colors,
  bp: breakPoiints,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        width: '100%',
        height: '100vh',
        margin: '0',
        padding: '0',
        overscrollBehaviorBlock: 'none',
      },
      a: {
        textDecration: 'none',
      },
      button: {
        outline: 'none',
        border: 'none',
      },
      'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video':
        {
          margin: 0,
          padding: 0,
          border: 0,
          fontSize: '100%',
          font: 'inherit',
          verticalAlign: 'baseline',
        },
    }),
  },
});
export type ThemeType = typeof theme;
