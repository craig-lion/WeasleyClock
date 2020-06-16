/*
You have the hypotenuse and the angle
And you’re trying to figure out the lengths of the other two sides
So you can use sin and cos to figure out the x and y offset from the center of the circle
Sin(angle) = opposite / hypotenuse
Solve for opposite (which will be the y offset)
Cos(angle) = adjacent / hypotenuse
Solve for adjacent which will be the x offset

For a circle with origin (j, k) and radius r:

x(t) = r cos(t) + j
y(t) = r sin(t) + k

where you need to run this equation for t taking values within
 the range from 0 to 360, then you will get your x and y each on the boundary of the circle.
*/


const createDimensions = (sideLength, padding) => {
  const obj = {
    componentSide: (sideLength + padding * 2),
  };
  return obj;
};

const dimensions = createDimensions(125, 300);

const circle = {
  centerX: dimensions.componentSide / 2,
  centerY: dimensions.componentSide / 2,
  radius: 350,
};

const getPointOnCircle = (radian) => {
  const array = [];
  const x = (circle.radius * Math.cos(radian) + circle.centerX);
  const y = (circle.radius * Math.sin(radian) + circle.centerY);
  array.push(x, y);
  return array;
};

module.exports = { getPointOnCircle, circle, dimensions };
