import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNav from './TopNav';
import CenterpieceDropDown from './CenterpieceDropDown';
import axios from 'axios';
const helper = require('./helper.js');

const MainPage = (props) => {
  const [locations, setLocations] = useState(['']);
  const radiansBetweenLocations = 2*Math.PI / locations.length;
  const [userName, setUserName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(()=> location[0]);
  const [friends, setFriends] = useState(['']);
  const [suppress, setSuppress] = useState(false);



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

useEffect( () => {
    axios.get('/api/users')
  .then((res) => {
    let oneUser = res.data;
    setLocations(oneUser.locations);
    setUserName(oneUser.userName);
    setCurrentLocation(oneUser.currentLocation)
    setFriends(oneUser.friends)
  })
  .catch(err => {throw err;})
},[]);



const Centerpiece = () => {
  return (
  <DropDownStyle>
  <Text fill='antiquewhite' textAnchor="middle">
    Appare Vestigium
  </Text>
  </DropDownStyle>
  )}


    return (
        <>
          <TopNav 
            userName={userName} 
            setCurrentLocation={setCurrentLocation}
            setLocations={setLocations} 
            locations={locations} 
            currentLocation={currentLocation} 
            setCurrentLocation={setCurrentLocation}
            friends={friends}
            logout={props.logout}
            suppress={suppress}
            setSuppress={setSuppress}
          />
          {/* Refactor This Code */}
          <Bottom>
            <ClockFace
              locations={locations}
              currentLocation={currentLocation}
            />
            <SVG overflow='auto' height={dimensions.componentSide} width={dimensions.componentSide}>
              <Arm />
              <Circle cx={circle.centerX} cy={circle.centerY} r={circle.radius} fill="rgba(204, 204, 204, 0.25)" stroke="tan" strokeWidth="2" />
              {allLocations}
            </SVG>
            <ClockToggle>
              <CenterpieceDropDown
                  friends={friends}
                  userName={userName}
                  x={circle.centerX}
                  y={circle.centerY}
                  setSuppress={setSuppress}
                  setLoginUserName={props.setLoginUserName}
                  setLocations={setLocations}
                  setCurrentLocation={setCurrentLocation}
                />
            </ClockToggle>
          </Bottom>
        </>
    );
};

const DropDownStyle = styled.div`
position: absolute;
width: 150px;
height:150px;
border:2px solid green;
`
const ClockToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  height:100%;
  width:100vw;
  position:absolute;
`

const Text = styled.text`
  font-size:30px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  z-index:100;
  position:absolute;
`

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width:100vw;
  background-image: url('Burrow.jpg');
  position:relative;
`

const SVG = styled.svg`
  background: rgba(204, 204, 204, 0.15);
  border-radius: 50%;
  overflow: visible;
  white-space: nowrap;
  position:relative;
`
const Circle = styled.circle`
  background: rgba(204, 204, 204, 0);
`

export default MainPage
