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

const getPointOnCircle = (origin, radius, radian) => {
  const array = [];
  const x = (radius * Math.cos(radian) + origin[0]);
  const y = (radius * Math.sin(radian) + origin[1]);
  array.push(x,y);
  return array;
}

exports.getPointOnCircle = getPointOnCircle;