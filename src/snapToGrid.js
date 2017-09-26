/*
  Helpers for coercing placement to match grid lines.
*/

export function normalize(x, y, props) {
  const { width, height, interval, lineWidth } = props;
  const offsetX = x % interval;
  const offsetY = y % interval;
  let normalX = x;
  let normalY = y;
  if (x >= width) {
    normalX = Math.max(
      0,
      Math.min(x, width - interval)
    ) + offsetX;
  }
  if (y >= height) {
    normalY = Math.max(
      0,
      Math.min(y, height - interval)
    ) + offsetY;
  }
  return [normalX, normalY];
}

export default function snapToGrid(x, y, props) {
  const { interval, lineWidth } = props;
  const offset = Math.floor(lineWidth / 2);
  const snappedX = Math.round(x / interval) * interval + offset;
  const snappedY = Math.round(y / interval) * interval + offset;
  return [snappedX, snappedY];
}
