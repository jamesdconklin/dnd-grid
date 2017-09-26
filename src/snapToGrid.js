/*
  Helper for coercing placement to match grid lines.
  The maxing and mining prevents snapping off the grid.
*/

export function normalize(x, y, props) {
  console.log('in', x, y, props);
  const { width, height, interval, lineWidth } = props;
  const offset = Math.floor(lineWidth / 2);
  const normalX = Math.max(
    offset,
    Math.min(x, width - interval),
  );
  const normalY = Math.max(
    offset,
    Math.min(y, height - interval),
  );
  return [normalX, normalY];
}

export default function snapToGrid(x, y, props) {
  const { interval, lineWidth } = props;
  const offset = Math.floor(lineWidth / 2);
  const snappedX = Math.round(x / interval) * interval + offset;
  const snappedY = Math.round(y / interval) * interval + offset;
  return [snappedX, snappedY];
}
