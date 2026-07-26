import { postcssConfig } from './src/config';

export default {
  plugins: {
    'postcss-px-conversion': {
      ...postcssConfig,
      unitType: 'px',
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      allowMediaQuery: false,
      replaceRules: true,
    },
  },
};