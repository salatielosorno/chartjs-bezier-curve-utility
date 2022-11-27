import { splineCurve } from 'chart.js/helpers';

export function _getPointsToCalculateControlsPoints({ data, xPos }: any) {
  let prev: any, point: any, next: any;

  if (xPos === data[0].x) {
    xPos += 1;
  }

  let nextItemIndex = data.findIndex((point: any) => point.x >= xPos);

  if (xPos === data[data.length - 1].x) {
    nextItemIndex = -1;
    xPos += 1;
  }

  if (nextItemIndex < 0) {
    if (data[data.length - 1].x < xPos) {
      const i = data.length - 1;
      const prevIndex = i - 1;
      const prevItemIndex = prevIndex >= 0 ? prevIndex : 0;

      prev = data[prevItemIndex];
      point = data[i];

      next = data[Math.min(i + 1, data.length - 1) % data.length];
      return { prev, point, next }
    }
  };

  const prevIndex = nextItemIndex - 2;
  const prevItemIndex = prevIndex >= 0 ? prevIndex : 0;
  const currentItemIndex = nextItemIndex - 1;

  prev = data[prevItemIndex];
  point = data[currentItemIndex];
  next = data[nextItemIndex];

  return { prev, point, next }
}

export function findYPositionAtX({ data, xAbsPos, tension }: any) {
  const { prev: p0, point: p1, next: p2 } = _getPointsToCalculateControlsPoints({ data, xPos: xAbsPos })

  if (p1 && p2) {
    const xDistance = p2.x - p1.x;
    const t =
      xAbsPos === data[0].x
        ? 0
        : xAbsPos === data[data.length - 1].x
          ? 1
          : (xAbsPos - p1.x) / xDistance; /* We need to calculate the t which have values from 0 to 1 */
    const controlPoints = splineCurve(p0, p1, p2, tension);
    const { previous: PCL, next: PCR } = controlPoints;

    const p3 = data[data.length - 1];
    const {prev: pi1, point: pi2, next: pi3} = _getPointsToCalculateControlsPoints({data,xPos: p3.x});

    const controlPoints2 = splineCurve(pi1, pi2, pi3, tension);
    const { previous: PCL2, next: PCR2 } = controlPoints2;

    const x =
      Math.pow(1 - t, 3) * p1.x +
      3 * (1 - t) * t * PCR.x * 3 * Math.pow(t, 2) * (1 - t) * PCL2.x +
      Math.pow(t, 3) * p2.x;
    const y =
      Math.pow(1 - t, 3) * p1.y +
      3 * (1 - t) * t * PCR.y * 3 * Math.pow(t, 2) * (1 - t) * PCL2.y +
      Math.pow(t, 3) * p2.y;

    return y;
  }
}
