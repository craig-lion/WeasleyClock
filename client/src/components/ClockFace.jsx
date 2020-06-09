import React from 'react';
import PropTypes from 'prop-types';

const helper = require('./helper.js');


const ClockFace = (props) => {
  const { locations } = props;
  const createDimensions = (sideLength, padding) => {
    const obj = {
      componentSide: (sideLength + padding * 2),
    };
    return obj;
  };

  const dimensions = createDimensions(150, 300);

  const circle = {
    centerX: dimensions.componentSide / 2,
    centerY: dimensions.componentSide / 2,
    radius: 350,
  };

  const makeLocations = () => {
    const array = [];
    for (let i = 0; i < locations.length; i++) {
      let radian = radiansBetweenLocations * i;
      let point = helper.getPointOnCircle([circle.centerX, circle.centerY], circle.radius, radian);
      const location = (
          <Text fill='antiquewhite' className='text' key={locations[i]} textAnchor='middle' x={point[0]} y={point[1]}>{locations[i]}</Text>
      )
      array.push(location);
    }
    return array;
  }

  const allLocations = makeLocations();

  const placeArm = (location) => {
    let obj = {};
    // loop thru locations
    for (let i = 0; i < locations.length; i++) {
      // if location equals locations[i]
      if(location === locations[i]) {
        // use i to calculate radian and call helper
        let radian = radiansBetweenLocations * i;
        let point = helper.getPointOnCircle([circle.centerX, circle.centerY], circle.radius, radian);
        obj['x'] = point[0];
        obj['y'] = point[1];
      }
    }
    return obj;
  }

  const Arm = () => {
    const armLocation = placeArm(props.currentLocation);
    return (
      <line
        x1={circle.centerX}
        y1={circle.centerY}
        x2={armLocation.x}
        y2={armLocation.y}
        style={{
          stroke: 'cadetblue',
          strokeWidth: 10,
          strokeLinecap: 'round',
        }}
      />
    );
  };

  return (
    <SVG overflow='auto' height={dimensions.componentSide} width={dimensions.componentSide}>
      <Arm />
      <Circle cx={circle.centerX} cy={circle.centerY} r={circle.radius} fill="rgba(204, 204, 204, 0.25)" stroke="tan" strokeWidth="2" />
      {allLocations}
    </SVG>
  );
};

ClockFace.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentLocation: PropTypes.string.isRequired,
}