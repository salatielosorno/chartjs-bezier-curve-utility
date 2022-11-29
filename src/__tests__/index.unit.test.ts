import { findYPositionAtX, _getPointsToCalculateControlsPoints, _getT } from '..';

describe('chartjs-bezier-curve-utility', () => {
  test('get t value for x = 0', () => {
    const xPos = 0;
    const leftPointX = 0;
    const nextPointX = 0;
    const minXPos = 0;
    const maxXPos = 15;
    const t = _getT({ xPos, leftPointX, nextPointX, minXPos, maxXPos });

    expect(t).toMatchSnapshot();
  });

  test('get t value for x = 15', () => {
    const xPos = 15;
    const leftPointX = 15;
    const nextPointX = 15;
    const minXPos = 0;
    const maxXPos = 15;
    const t = _getT({ xPos, leftPointX, nextPointX, minXPos, maxXPos });

    expect(t).toMatchSnapshot();
  });

  test('get t value for x = 7.5', () => {
    const xPos = 7.5;
    const leftPointX = 0;
    const nextPointX = 15;
    const minXPos = 0;
    const maxXPos = 15;
    const t = _getT({ xPos, leftPointX, nextPointX, minXPos, maxXPos });

    expect(t).toMatchSnapshot();
  });

  test('find y at x when t is equal to 0, tension 0', () => {
    const data: any = [
      { x: 0, y: 2 },
      { x: 2, y: 0 }
    ];
    const xPos = 0;
    const tension = 0;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 1, tension 0', () => {
    const data: any = [
      { x: 0, y: 2 },
      { x: 2, y: 0 }
    ];
    const xPos = 2;
    const tension = 0;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 0', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 0;
    const tension = 0.5;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 40', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 40;
    const tension = 0.5;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 5', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 5;
    const tension = 0.5;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 15', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 15;
    const tension = 0.5;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 11', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 11;
    const tension = 0.5;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('find y at x when t is equal to 5.326732397079468', () => {
    const data: any = [
      { x: 0.3267323970794678, y: 0 },
      { x: 5.326732397079468, y: 5 },
      { x: 15.326732397079468, y: 1.5 },
      { x: 40.32673239707947, y: 1.5 }
    ];
    const xPos = 5.326732397079468;
    const tension = 0.5;

    const y = findYPositionAtX({ data, xPos, tension });

    expect(y).toMatchSnapshot();
  });

  test('get prev, current and next points -> x = 16', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 16;

    const result = _getPointsToCalculateControlsPoints({ data, xPos });

    expect(result).toMatchSnapshot();
  });

  test('get prev, current and next points -> x = 1', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 1;

    const result = _getPointsToCalculateControlsPoints({ data, xPos });

    expect(result).toMatchSnapshot();
  });

  test('get prev, current and next points -> x = 41', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 41;

    const result = _getPointsToCalculateControlsPoints({ data, xPos });

    expect(result).toMatchSnapshot();
  });

  test('get prev, current and next points -> x = 0', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 0;

    const result = _getPointsToCalculateControlsPoints({ data, xPos });

    expect(result).toMatchSnapshot();
  });

  test('get prev, current and next points -> x = 15', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 15;

    const result = _getPointsToCalculateControlsPoints({ data, xPos });

    expect(result).toMatchSnapshot();
  });

  test('get prev, current and next points -> x = 40', () => {
    const data: any = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 15, y: 1.5 },
      { x: 40, y: 1.5 }
    ];
    const xPos = 40;

    const result = _getPointsToCalculateControlsPoints({ data, xPos });

    expect(result).toMatchSnapshot();
  });
});
