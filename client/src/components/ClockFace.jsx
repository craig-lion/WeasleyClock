import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const helper = require('./helper.js');


const ClockFace = (props) => {
  const { locations, currentLocation } = props;
  const radiansBetweenLocations = (2 * Math.PI) / locations.length;

  const makeLocations = () => {
    const array = [];
    for (let i = 0; i < locations.length; i += 1) {
      const radian = radiansBetweenLocations * i;
      const locationAnchor = helper.getPointOnCircle(radian);
      const location = (
        <Text fill="antiquewhite" className="text" key={locations[i]} textAnchor="middle" x={locationAnchor[0]} y={locationAnchor[1]}>{locations[i]}</Text>
      );
      array.push(location);
    }
    return array;
  };

  const allLocations = makeLocations();

  const placeArm = (location) => {
    let obj = {};
    // loop thru locations
    for (let i = 0; i < locations.length; i += 1) {
      // if location equals locations[i]
      if (location === locations[i]) {
        // use i to calculate radian and call helper
        const radian = radiansBetweenLocations * i;
        const point = helper.getPointOnCircle(radian);
        obj = {
          x: point[0],
          y: point[1],
        };
      }
    }
    return obj;
  };

  const Arm = () => {
    const armLocation = placeArm(currentLocation);
    return (
      <line
        x1={helper.circle.centerX}
        y1={helper.circle.centerY}
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
    <SVG overflow="auto" height={helper.dimensions.componentSide} width={helper.dimensions.componentSide}>
      <Arm />
      <Circle cx={helper.circle.centerX} cy={helper.circle.centerY} r={helper.circle.radius} fill="rgba(204, 204, 204, 0.25)" stroke="tan" strokeWidth="2" />
      {allLocations}
    </SVG>
  );
};

ClockFace.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentLocation: PropTypes.string,
};

ClockFace.defaultProps = {
  currentLocation: null,
};

const SVG = styled.svg`
  background: rgba(204, 204, 204, 0.15);
  border-radius: 50%;
  overflow: visible;
  white-space: nowrap;
  position:relative;
`;

const Circle = styled.circle`
  background: rgba(204, 204, 204, 0);
`;

const Text = styled.text`
  font-size:40px;
  font-weight:bold;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  z-index:100;
  position:absolute;
`;

export default ClockFace;
