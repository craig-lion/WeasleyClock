import React, { useState } from 'react';
import styled from 'styled-components';
import DropDown from './DropDown';

const TopNav = (props) => {

let [textInput, setTextInput] = useState('');

const handleChange = (e) => {
  setTextInput(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault();

  console.log('locations before', props.locations)
  props.locations.push(textInput)
  props.setLocations(props.locations)
  console.log('locations after', props.locations)
  console.log('its all happening', textInput)
}

  return(
  <TopNavStyle>
  <Title>You're a Wizard {props.userName}</Title>
  <DropDown setCurrentLocation={props.setCurrentLocation} locations={props.locations} />
  <form onSubmit={handleSubmit}>
    <Div>
      <Label>Add A New Location</Label>
    </Div>
  <Text type="text" color='antiquewhite' id="location" value={textInput} onChange={handleChange} name="location"></Text>
  <Div>
  <Button type="submit" value='Portus!'></Button>
  </Div>
  </form>
  </TopNavStyle>
  )
}

const Div = styled.div`
  padding:5px
`

const TopNavStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 175px;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-align: center;
  padding:5px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  `

const Text = styled.input`
  background-image: url('darkWood.jpg');
  border-radius:18px;
  border-color:antiqueWhite;
`

const Label = styled.label`
  color:antiquewhite;
  font-size:12px;
`

const Button = styled.input`
  color:AntiqueWhite;
  background-image: url('darkWood.jpg');
  opacity: 50%;
  border-radius:18px;
`

const Title = styled.p`
  margin:0px;
  font-size:40px;
`

export default TopNav;