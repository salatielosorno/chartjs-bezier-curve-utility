import { findYPositionAtX, _getPointsToCalculateControlsPoints } from ".."

describe('chartjs-bezier-curve-utility', () => {
    test('find y at x when t is equal to 0', () => {
      const data: any = [
        { x: 0, y: 0 },
        { x: 5, y: 5 },
        { x: 15, y: 1.5 },
        { x: 40, y: 1.5 }
      ];
      const xAbsPos = 0;
      const tension = 0.5;

      const y = findYPositionAtX({ data, xAbsPos, tension });

      expect(y).toMatchSnapshot();
    });

    test('find y at x when t is equal to 40', () => {
      const data: any = [
        { x: 0, y: 0 },
        { x: 5, y: 5 },
        { x: 15, y: 1.5 },
        { x: 40, y: 1.5 }
      ];
      const xAbsPos = 40;
      const tension = 0.5;

      const y = findYPositionAtX({ data, xAbsPos, tension });

      expect(y).toMatchSnapshot();
    });
    
    test('find y at x when t is equal to 5', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xAbsPos = 5;
        const tension = 0.5;

        const y = findYPositionAtX({ data, xAbsPos, tension });

        expect(y).toMatchSnapshot()
    })

    test('find y at x when t is equal to 15', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xAbsPos = 15;
        const tension = 0.5;

        const y = findYPositionAtX({ data, xAbsPos, tension });

        expect(y).toMatchSnapshot()
    })

    test('find y at x when t is equal to 11', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xAbsPos = 11;
        const tension = 0.5;

        const y = findYPositionAtX({ data, xAbsPos, tension });

        expect(y).toMatchSnapshot()
    })

    test('find y at x when t is equal to 5.326732397079468', () => {
        const data: any = [
            { x: 0.3267323970794678, y: 0 },
            { x: 5.326732397079468, y: 5 },
            { x: 15.326732397079468, y: 1.5 },
            { x: 40.32673239707947, y: 1.5 }
        ];
        const xAbsPos = 5.326732397079468;
        const tension = 0.5;

        const y = findYPositionAtX({ data, xAbsPos, tension });

        expect(y).toMatchSnapshot()
    })

    test('get prev, current and next points -> x = 16', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xPos = 16;

        const result = _getPointsToCalculateControlsPoints({data, xPos});

        expect(result).toMatchSnapshot()
    })

    test('get prev, current and next points -> x = 1', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xPos = 1;

        const result = _getPointsToCalculateControlsPoints({data, xPos});

        expect(result).toMatchSnapshot()
    })

    test('get prev, current and next points -> x = 41', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xPos = 41;

        const result = _getPointsToCalculateControlsPoints({data, xPos});

        expect(result).toMatchSnapshot()
    })

    test('get prev, current and next points -> x = 0', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xPos = 0;

        const result = _getPointsToCalculateControlsPoints({data, xPos});

        expect(result).toMatchSnapshot()
    })

    test('get prev, current and next points -> x = 15', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xPos = 15;

        const result = _getPointsToCalculateControlsPoints({data, xPos});

        expect(result).toMatchSnapshot()
    })

    test('get prev, current and next points -> x = 40', () => {
        const data: any = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 15, y: 1.5 },
            { x: 40, y: 1.5 }
        ];
        const xPos = 40;

        const result = _getPointsToCalculateControlsPoints({data, xPos});

        expect(result).toMatchSnapshot()
    })
})