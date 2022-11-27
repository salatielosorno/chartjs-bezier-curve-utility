import { splineCurve } from 'chart.js/helpers';

export function findYPositionAtX({ data, xAbsPos, tension }: any) {
  const xs = data.map((item: any) => item.x);
  const ys = data.map((item: any) => item.y);

  console.info('xs >> ', xs);
  console.info('ys >> ', ys);
  console.log('xAbsPos >> ', xAbsPos);

  const index = data.findIndex((point: any) => point.x >= xAbsPos);
  console.log('length ', data.length);
  const p0 = data[index - 2] ?? { skip: true };
  const p1 = data[index - 1];
  const p2 = data[index];
  console.log('p0 >> ', p0);
  console.log('p1 >> ', p1);
  console.log('p2 >> ', p2);

  if (p1 && p2) {
    const xDistance = p2.x - p1.x;
    console.log('xDistance >> ', xDistance);
    const t =
      (xAbsPos - p1.x) /
      xDistance; /* We need to calculate the t which have values from 0 to 1 */
    console.log('t >> ', t);

    // while (t <= 1) {
    //  console.log('t >> ', t)
    const controlPoints = splineCurve(p0, p1, p2, tension);
    const { previous: PCL, next: PCR } = controlPoints;

    console.log('previos >> ', JSON.stringify(PCL));
    console.log('next >> ', JSON.stringify(PCR));

    // = (1 - t)^2 * p0 + 2t(1 - t) * p1 + t^2 * p2
    //const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * PCR.x + t * t * p2.x;
    //const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * PCR.y + t * t * p2.y;

    const p3 = data[data.length - 1];

    console.log('p3 >> ', p3);
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

    console.log('x >> ', x);
    console.log('y >> ', y);

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
