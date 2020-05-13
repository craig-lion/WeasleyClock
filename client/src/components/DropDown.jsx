import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const DropDown = (props) => {
  const locations = props.locations.map((location) => {
    if (location === props.currentLocation) {
      return (
        <option key={location} value={location} selected>{location}</option>
        )
    } else {
      return (
        <option key={location} value={location}>{location}</option>
        )
    }
})

  const moveArm = (e) => {
    console.log('e: ', e.target.value)
    let post = {};
    props.setCurrentLocation(e.target.value)
    post = { 'userName': props.userName, 'currentLocation': e.target.value },
    console.log('this is post in the then: ', post)
    axios.post('/api/updateLocations', post)
  }
  return (
    <>
      <Label>Where are you?</Label>
      <Select id="locations" onChange={moveArm}>
        {locations}
      </Select>
    </>
  )
}

const Label = styled.label`
  color:antiquewhite;
`

const Select = styled.select`
  color:antiquewhite;
  background-image: url('darkWood.jpg');
  opacity: 50%;
  border-radius:18px;
  text-align: center;
  text-align-last: center;
  -moz-text-align-last: center;
  font-family: 'Luminari';
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`
export default DropDown;