import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNav from './TopNav';
import axios from 'axios';
const helper = require('./helper.js');

const MainPage = () => {
  const [locations, setLocations] = useState(['Lets Chill', '@ Work', 'Self Care', 'Adulting', 'Goin Down to Funky Town', 'Breathing Hard', 'On the Move', 'Lets Rage']);
  const radianUnit = 2*Math.PI / locations.length;
  const [userName, setUserName] = useState('Harry');
  const [currentLocation, setCurrentLocation] = useState(()=> location[0]);

  const createDimensions = (sideLength, padding) => {
  const obj = {
    componentSide: (sideLength + padding * 2),
  }
  return obj
  }

const dimensions = createDimensions(150, 300)

const circle = {
  centerX: dimensions.componentSide/2,
  centerY: dimensions.componentSide/2,
  radius: 350
};

const makeLocations = (locations) => {
  const array = [];
  for (let i = 0; i < locations.length; i++) {
    let radian = radianUnit * i;
    let point = helper.getPointsOnCircle([circle.centerX, circle.centerY], circle.radius, radian);
    const location = (
        <Text fill='antiquewhite' className='text' key={locations[i]} textAnchor='middle' x={point[0]} y={point[1]}>{locations[i]}</Text>
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

useEffect(() => {
  axios.get('/api/users', {userName})
  .then((res) => {
    let oneUser = res.data;
    setLocations(oneUser.locations);
    setUserName(oneUser.userName);
    setCurrentLocation(oneUser.currentLocation)
  })
  .catch((err) => {throw err;})
},[]);

const Arm = () => {
  const armLocation = placeArm(currentLocation);
  return(
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
)}

const allLocations = makeLocations(locations)

    return (
        <>
          <TopNav 
            userName={userName} 
            setCurrentLocation={setCurrentLocation}
            setLocations={setLocations} 
            locations={locations} 
            currentLocation={currentLocation} 
            setCurrentLocation={setCurrentLocation}
          />
          <Bottom>
            <SVG overflow='auto' height={dimensions.componentSide} width={dimensions.componentSide}>
              <Arm />
              <Circle cx={circle.centerX} cy={circle.centerY} r={circle.radius} fill="rgba(204, 204, 204, 0.25)" stroke="tan" strokeWidth="2" />
              <Text fill='antiquewhite' textAnchor="middle" x={circle.centerX} y={circle.centerY}>Appare Vestigium</Text>
              {allLocations}
            </SVG>
          </Bottom>
        </>
    );
};

const Text = styled.text`
  font-size:30px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  z-index:100;
  position:absolute;
`

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  height:-webkit-fill-available;
  width:100vw;
  background-image: url('Burrow.jpg');
`

const SVG = styled.svg`
  background: rgba(204, 204, 204, 0.25);
  border-radius: 50%;
  overflow: visible;
  white-space: nowrap;
  position:relative;
`
const Circle = styled.circle`
  background: rgba(204, 204, 204, 0.5);
`

export default MainPage
