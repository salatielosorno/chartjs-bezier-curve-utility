import { findYPositionAtX } from ".."

describe('chartjs-bezier-curve-utility', () => {
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
})