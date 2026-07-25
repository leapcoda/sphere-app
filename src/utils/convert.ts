import { postcssConfig } from '@/config';

export const px2vw = (px: number): string => {
  const { viewportWidth, unitPrecision } = postcssConfig;
  return `${(px * 100 / viewportWidth).toFixed(unitPrecision)}vw`;
};