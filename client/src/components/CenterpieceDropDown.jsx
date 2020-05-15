import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const CenterpieceDropDown = (props) => {
  console.log('this is friends prop: ', props.friends)
  const clocks = props.friends.map((friend) => {
      console.log('this is a friend in drop: ', friend)
        return (
          <Option key={friend} width="20px" value={friend} >{friend}</Option>
          )
  })

  const changeClock = (e) => {
    console.log('yeah buddy')
    let userName = e.target.value
    console.log('this is userName in DorpDown: ', userName)
    axios.get('/api/users', {params:{userName}})
    .then((res) => {
    let oneUser = res.data;
    console.log('this is oneUser: ', oneUser)
    props.setLocations(oneUser.locations);
    props.setCurrentLocation(oneUser.currentLocation)
    props.setSuppress(true)
  })
  .catch(err => {throw err;})
  }
  return (
    <DropDownStyle>
      <Label>Viewing {props.userName}'s Clock</Label>
      <Select id="clocks" onChange={changeClock}>
      {clocks}
      </Select>
    </DropDownStyle>
  )
}

const Label = styled.label`
  color:antiquewhite;
`
const DropDownStyle = styled.div`
  align-items:center;
  position: absolute;
  width: 300px;
  height:150px;
  border-radius:18px;
  color:antiquewhite;
  // opacity: 50%;
  border-radius:18px;
  text-align: center;
  text-align-last: center;
  font-size:30px;
  -moz-text-align-last: center;
  font-family: 'Luminari';
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`

const Option = styled.option`
  width: 100%;
  
`

const Select = styled.select`
  color:antiquewhite;
  background: rgba(0,0,0,0.15);
  border-radius:18px;
  font-size:12px;
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