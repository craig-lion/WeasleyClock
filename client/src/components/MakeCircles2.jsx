import React, { useState } from 'react';
import styled from 'styled-components';
import DropDown from './DropDown';
const helper = require('./helper.js');

const MakeCircles = () => {
const [locations, setLocations] = useState(['Lets Chill','going to mexico', '@ Work', 'Self Care', 'Adulting', 'Goin Down to Funky Town', 'Breathing Hard', 'On the Move', 'Lets Rage']);
const radianUnit = 2*Math.PI / locations.length;

const createDimensions = (sideLength, padding) => {
  const obj = {
    componentSide: (sideLength + padding * 2),
  }
  return obj
}

const dimensions = createDimensions(350, 200)

const circle = {
  centerX: dimensions.componentSide/2,
  centerY: dimensions.componentSide/2,
  radius: 250
};

const makeLocations = (locations) => {
  const array = [];
  for (let i = 0; i < locations.length; i++) {
    let radian = radianUnit * i;
    let point = helper.getPointsOnCircle([circle.centerX, circle.centerY], circle.radius, radian);
    const location = (
        <text fill='tan' class='text' key={locations[i]} textAnchor='middle' x={point[0]} y={point[1]}>{locations[i]}</text>
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


const [currentLocation, setCurrentLocation] = useState('Adulting');

const Arm = () => {
  const armLocation = placeArm(currentLocation);
  return(
  <line x1={circle.centerX} y1={circle.centerY} x2={armLocation.x} y2={armLocation.y} stroke="black" />
)}

const allLocations = makeLocations(locations)
console.log(allLocations)

    return (
        <>
          <TopNav>
          <Title>You're a Wizard Harry</Title>
          <DropDown setCurrentLocation={setCurrentLocation} locations={locations} />
          </TopNav>
          <Bottom>
            {/* <Clock> */}
            <SVG overflow='auto' height={dimensions.componentSide} width={dimensions.componentSide}>
              <Circle cx={circle.centerX} cy={circle.centerY} r={circle.radius} fill="beige" stroke="#F0CE01" strokeWidth="2" />
              <text textAnchor="middle" x={circle.centerX} y={circle.centerY}>Appare Vestigium</text>
              {allLocations}
              <Arm />
            </SVG>
            {/* </Clock> */}
          </Bottom>
        </>
    );
};

const TopNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  width: 100vw;
  background: saddlebrown;
`

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  height:-webkit-fill-available;
  width:100vw;
  backgroundImage: url('./Burrow.jpg');
`
const Clock = styled.div`
  background: yellow;
`

const Title = styled.h1`
  margin:0;
`

const SVG = styled.svg`
  background:#FAEBD7;
  border-radius: 50%;
  overflow:auto;
`
const Circle = styled.circle`
  background:#F5F5DC;
`
export default MakeCircles
