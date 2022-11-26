function distanceBetweenPoints(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
    // Props to Rob Spencer at scaled innovation for his post on splining between points 
    // http://scaledinnovation.com/analytics/splines/aboutSplines.html 

    // This function must also respect "skipped" points 

    const previous = firstPoint.skip ? middlePoint : firstPoint;
    const current = middlePoint;
    const next = afterPoint.skip ? middlePoint : afterPoint;
    const d01 = distanceBetweenPoints(current, previous);
    const d12 = distanceBetweenPoints(next, current);

    let s01 = d01 / (d01 + d12);
    let s12 = d12 / (d01 + d12);

    // If all points are the same, s01 & s02 will be inf 
    s01 = isNaN(s01) ? 0 : s01;
    s12 = isNaN(s12) ? 0 : s12;

    const fa = t * s01; // scaling factor for triangle Ta 
    const fb = t * s12;

    return {
        previous: {
            x: current.x - fa * (next.x - previous.x),
            y: current.y - fa * (next.y - previous.y)
        },
        next: {
            x: current.x + fb * (next.x - previous.x),
            y: current.y + fb * (next.y - previous.y)
        }
    };
}
function findYPositionBezierCurve({ data, xAbsPos, tension }) {
    const xs = data.map((item) => item.x);
    const ys = data.map((item) => item.y);

    console.info('xs >> ', xs)
    console.info('ys >> ', ys)
    console.log('xAbsPos >> ', xAbsPos)

    const index = data.findIndex((o) => o.x >= xAbsPos);
    console.log('length ', data.length)
    const p0 = data[index - 2] ?? { skip: true };
    const p1 = data[index - 1];
    const p2 = data[index];
    console.log('p0 >> ', p0)
    console.log('p1 >> ', p1)
    console.log('p2 >> ', p2)

    if (p1 && p2) {
        const xDistance = p2.x - p1.x;
        console.log('xDistance >> ', xDistance);
        let t = (xAbsPos - p1.x) / xDistance; /* We need to calculate the t which have values from 0 to 1 */
        console.log('t >> ', t)

       // while (t <= 1) {
        //  console.log('t >> ', t)
            const controlPoints = splineCurve(p0, p1, p2, tension);
            const { previous: PCL, next: PCR } = controlPoints;

            console.log('previos >> ', JSON.stringify(PCL))
            console.log('next >> ', JSON.stringify(PCR))

            // = (1 - t)^2 * p0 + 2t(1 - t) * p1 + t^2 * p2
            //const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * PCR.x + t * t * p2.x;
            //const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * PCR.y + t * t * p2.y;

            const p3 = data[data.length -  1];

            console.log('p3 >> ', p3)
            const controlPoints2 = splineCurve(p1, p2, p3, tension);
            const { previous: PCL2, next: PCR2 } = controlPoints2;

            x = Math.pow((1 - t), 3) * p1.x + 3 * (1 - t) * t * PCR.x * 3 * (Math.pow(t, 2)) * (1 - t) * PCL2.x + Math.pow(t, 3) * p2.x;
            y = Math.pow((1 - t), 3) * p1.y + 3 * (1 - t) * t * PCR.y * 3 * (Math.pow(t, 2)) * (1 - t) * PCL2.y + Math.pow(t, 3) * p2.y;
            
            console.log('x >> ', x)
            console.log('y >> ', y)
        //    t += 0.0001
        //    console.log('t += .01 >> ', y)

            // 11.40783405303955 given by chart

            //10.411895591263953 -> 10.412956168500596
            /* if(x > 11.40783405303955 - .99){//11.08083405303955){
                console.log('tf ', t)
                break;
            } */
        //}
        //return y 21.408 x
    }
}

findYPositionBezierCurve({
    data: [
        { x: 0.3267323970794678, y: 0 },
        { x: 5.326732397079468, y: 5 },
        { x: 15.326732397079468, y: 1.5 },
        { x: 40.32673239707947, y: 1.5 }
    ],
    xAbsPos: 5.326732397079468,
    tension: 0.5
})