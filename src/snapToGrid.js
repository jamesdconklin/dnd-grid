export default function snapToGrid(x, y, dim) {
  const snappedX = Math.round(x / dim) * dim;
  const snappedY = Math.round(y / dim) * dim;

  return [snappedX, snappedY];
}
