export function getMaxValue(thresholds) {
  const values = thresholds?.map(item => item.y);

  return [Math.max(...values)];
}

