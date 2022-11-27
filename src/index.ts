import { splineCurve } from 'chart.js/helpers';

export function _getPointsToCalculateControlsPoints({ data, xPos }: any) {
  let prev: any, point: any, next: any;

  if(xPos === data[0].x){
    xPos +=1;
  }

  let nextItemIndex = data.findIndex((point: any) => point.x >= xPos);

  if(xPos === data[data.length - 1].x) {
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
  const xs = data.map((item: any) => item.x);
  const ys = data.map((item: any) => item.y);

  /* console.info('xs >> ', xs);
  console.info('ys >> ', ys);
  console.log('xAbsPos >> ', xAbsPos); */

  const index = data.findIndex((point: any) => point.x >= xAbsPos);
  const p0 = data[index - 2] ?? { skip: true };
  const p1 = data[index - 1];
  const p2 = data[index];

  if (p1 && p2) {
    const xDistance = p2.x - p1.x;
    /* console.log('xDistance >> ', xDistance); */
    const t =
      (xAbsPos - p1.x) /
      xDistance; /* We need to calculate the t which have values from 0 to 1 */
    const controlPoints = splineCurve(p0, p1, p2, tension);
    const { previous: PCL, next: PCR } = controlPoints;

    const p3 = data[data.length - 1];

    const controlPoints2 = splineCurve(p1, p2, p3, tension);
    const { previous: PCL2, next: PCR2 } = controlPoints2;

    const x =
      Math.pow(1 - t, 3) * p1.x +
      3 * (1 - t) * t * PCR.x * 3 * Math.pow(t, 2) * (1 - t) * PCL2.x +
      Math.pow(t, 3) * p2.x;
    const y =
      Math.pow(1 - t, 3) * p1.y +
      3 * (1 - t) * t * PCR.y * 3 * Math.pow(t, 2) * (1 - t) * PCL2.y +
      Math.pow(t, 3) * p2.y;

    /* console.log('x >> ', x);
    console.log('y >> ', y); */

    return y;
  }
}

/* findYPositionBezierCurve({
  data: [
    { x: 0.3267323970794678, y: 0 },
    { x: 5.326732397079468, y: 5 },
    { x: 15.326732397079468, y: 1.5 },
    { x: 40.32673239707947, y: 1.5 }
  ],
  xAbsPos: 5.326732397079468,
  tension: 0.5
}); */
