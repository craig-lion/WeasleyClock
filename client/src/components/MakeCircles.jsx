import React from 'react';
const helper = require('./helper.js')

class SVGComponent extends React.Component {
    render() {

        return <svg {...this.props}>{this.props.children}</svg>;
    }
};

class Circle extends React.Component{
    render() {
        return <circle {...this.props}>{this.props.children}</circle>;
    }
};

const locations = ['Lets Chill', '@ Work', 'Self Care', 'Adulting', 'Goin Down to Funky Town', 'Breathing Hard', 'On the Move', 'Lets Rage']
const radianUnit = 2*Math.PI / locations.length;

const createDimensions = (sideLength, padding) => {
  const obj = {
    componentSide: (sideLength + padding * 2),
  }
  // console.log('obj.componentSide: ', obj.componentSide)
  return obj
}

const dimensions = createDimensions(250, 100)

const circle = {
  centerX: dimensions.componentSide/2,
  centerY: dimensions.componentSide/2,
  radius: 125
};

const makeLocations = (locations) => {
  const array = [];
  for (let i = 0; i < locations.length; i++) {
    let radian = radianUnit * i;
    let point = helper.getPointsOnCircle([circle.centerX, circle.centerY], circle.radius, radian);
    const location = (
        <text key={locations[i]} textAnchor='middle' x={point[0]} y={point[1]}>{locations[i]}</text>
    )
    array.push(location);
  }
  return array;
}

const placeArm = (location) => {
  let obj = {};
  // loop thru locations
  for (let i = 0; i < locations.length; i++) {
    // if location equals locations[i]
    if(location === locations[i]) {
      // use i to calculate radian and call helper
      let radian = radianUnit * i;
      let point = helper.getPointsOnCircle([circle.centerX, circle.centerY], circle.radius, radian);
      obj['x'] = point[0];
      obj['y'] = point[1];
    }
  }
  return obj;
}

const armLocation = placeArm('Adulting')

const allLocations = makeLocations(locations)
console.log(allLocations)

class MakeCircles extends React.Component {
  
  render() {
    return (
      <div>
        <SVGComponent height={dimensions.componentSide} width={dimensions.componentSide}>
          <Circle cx={circle.centerX} cy={circle.centerY} r={circle.radius} fill="none" stroke="#F0CE01" strokeWidth="2" />
          <text textAnchor="middle" x={circle.centerX} y={circle.centerY}>Appare Vestigium</text>
          {/* <circle cx="195" cy="236" r="2" fill="red"/> */}
          {allLocations}
          <line x1={circle.centerX} y1={circle.centerY} x2={armLocation.x} y2={armLocation.y} stroke="black" />
        </SVGComponent>
      </div>
    );
  }
};

export default MakeCircles