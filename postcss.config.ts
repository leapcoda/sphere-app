export default {
  plugins: {
    'postcss-px-conversion': {
      unitType: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      allowMediaQuery: false,
      replaceRules: true,
    },
  },
};