# Chart.js Bezier Curve Utility

[![npm](https://img.shields.io/npm/v/chartjs-bezier-curve-utility?color=green&style=flat-square)](https://www.npmjs.com/package/chartjs-bezier-curve-utility)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Motivation
Sometimes you may need to calculate the value of Y for a given X value. Chart.js uses Bezier curve under the hood to create its smooth curves. Each point you give Chart.js, it gets the control points needed to create the curve. On account of getting the control points that Chart.js calculates, we just call its internal function to retrieve the control point that Chart.js already calculates.

Why do we need to know the control points? To calculate the cubic bezier curve we need 4 points, point p0, p1, p2 and p3.

![cubic bezier curve](/public/assets/image/cubic-bezier-curve-thumbnail.png)

The formula to calculate the bezier is:

![cubic bezier formula](/public/assets/image/cubic-bezier-formula.png)

## Install

To install run the command:

```bash
npm i chartjs-bezier-curve-utility
```

## Usage

```javascript
const data = [...] // [{ x0, y0 }, { x1, y1 }, { xn, yn } ...];
const xPost = 10; // X value
const tension = 0.5; // https://www.chartjs.org/docs/3.9.1/charts/line.html#dataset-properties

const y = findYPositionAtX({ data, xPos, tension }); // Y value at X
```

## License
[![NPM](https://img.shields.io/npm/l/pagination-utility?color=red&style=flat-square)](/LICENSE)