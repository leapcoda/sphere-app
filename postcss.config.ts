import { postcssConfig } from './src/config';

export default {
  plugins: {
    'postcss-px-conversion': {
      unitType: 'px',
      viewportWidth: postcssConfig.viewportWidth,
      unitPrecision: postcssConfig.unitPrecision,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      allowMediaQuery: false,
      replaceRules: true,
    },
  },
};