import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const CenterpieceDropDown = (props) => {
  const clocks = props.friends.map((friend) => {
      return (
        <Select id="clocks" onChange={changeClock}>{friend}</Select> 
      )
  })

  const changeClock = (e) => {
    console.log('yeah buddy')
  //   axios.get('/api/users')
  //   .then((res) => {
  //   let oneUser = res.data;
  //   console.log('this is oneUser: ', oneUser)
  //   props.setLocations(oneUser.locations);
  //   props.setCurrentLocation(oneUser.currentLocation)
  //   props.setSurpress(true)
  // })
  // .catch(err => {throw err;})
  }
  return (

    <DropDownStyle>
      <Label>Viewing {props.userName}'s Clock</Label>
      {clocks}
    </DropDownStyle>
  )
}

const Label = styled.label`
  color:antiquewhite;
`
const DropDownStyle = styled.div`
position: absolute;
width: 150px;
height:150px;
border:2px solid green;
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
const Text = styled.text`
  font-size:30px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  z-index:100;
  position:absolute;
`

export default CenterpieceDropDown;