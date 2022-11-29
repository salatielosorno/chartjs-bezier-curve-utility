import { splineCurve } from 'chart.js/helpers';

export interface IPoint {
  x: number,
  y: number
}

/**
 * A number, or a string containing a number.
 * @typedef {{prev: IPoint, point: IPoint, next: IPoint}} ControlPoints 
 */
export interface ControlPoints {
  prev: IPoint, point: IPoint, next: IPoint
}

/**
 * A number, or a string containing a number.
 * @typedef {IPoint[]} Dataset
 */

/**
 * 
 * @param {Object} params - Dataset and X value
 * @param {Dataset} params.data - Dataset
 * @param {number} params.xPos - X value 
 * @returns {ControlPoints} Prev, Point and Next
 */
export function _getPointsToCalculateControlsPoints({ data, xPos }: { data: Array<IPoint>, xPos: number }): ControlPoints {
  let prev: any, point: any, next: any;

  if (xPos === data[0].x) {
    xPos += 1;
  }

  let nextItemIndex = data.findIndex((point: IPoint) => point.x >= xPos);

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
      return { prev, point, next };
    }
  }

  const prevIndex = nextItemIndex - 2;
  const prevItemIndex = prevIndex >= 0 ? prevIndex : 0;
  const currentItemIndex = nextItemIndex - 1;

  prev = data[prevItemIndex];
  point = data[currentItemIndex];
  next = data[nextItemIndex];

  return { prev, point, next } as ControlPoints;
}

export function _getT({ xPos, leftPointX, nextPointX, minXPos, maxXPos }: { xPos: number, leftPointX: number, nextPointX: number, minXPos: number, maxXPos: number }) {
  let t = 0;
  
  if (xPos === maxXPos)
  t = 1;
  
  if (xPos > leftPointX){
    const distance = nextPointX - leftPointX; /* We need to calculate the t which have values from 0 to 1 */
    t = (xPos - leftPointX) / distance; 
  }

  return t;
}

/**
 * @param {Object} params - Dataset, X and Tension value
 * @param {Dataset} params.data - Dataset
 * @param {number} params.xPos - X value
 * @param {number} params.tension - Tension https://www.chartjs.org/docs/3.9.1/charts/line.html#dataset-properties
 * @returns {number|undefined} Y value
 */
export function findYPositionAtX({ data, xPos, tension }: { data: Array<IPoint>, xPos: number, tension: number }): number | undefined {
  const {
    prev,
    point,
    next
  } = _getPointsToCalculateControlsPoints({ data, xPos: xPos });

  if (point && next) {
    const t = _getT({ xPos, leftPointX: point.x, nextPointX: next.x, minXPos: data[0].x, maxXPos: data[data.length - 1].x });
    const controlPoints = splineCurve(prev, point, next, tension);
    const { next: p1 } = controlPoints;

    const xPos2 = data[data.length - 1];
    const {
      prev: prev2,
      point: point2,
      next: next2
    } = _getPointsToCalculateControlsPoints({ data, xPos: xPos2.x });

    const controlPoints2 = splineCurve(prev2, point2, next2, tension);
    const { previous: p2 } = controlPoints2;

    const p0 = point;
    const p3 = next;

    const x =
      Math.pow(1 - t, 3) * p0.x +
      3 * Math.pow(1 - t, 2) * t * p1.x + 3 * Math.pow(t, 2) * (1 - t) * p2.x +
      Math.pow(t, 3) * p3.x;
    const y =
      Math.pow(1 - t, 3) * p0.y +
      3 * Math.pow(1 - t, 2) * t * p1.y + 3 * Math.pow(t, 2) * (1 - t) * p2.y +
      Math.pow(t, 3) * p3.y;

    return y;
  }
}
