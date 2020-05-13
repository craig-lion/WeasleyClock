import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DropDown from './DropDown';
const Styled = require('./Styles');

// tried to implement styles in a separate file but it isn't working because it says it isn't "returning a string"

const TopNav = (props) => {

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    let post = {};
    e.preventDefault();
    let updateDB = async () => {
      let newLocations = [...props.locations, text];
      console.log('new Locations: ', newLocations)
      props.setLocations(newLocations);
      props.setCurrentLocation(text)
      return newLocations
    }
    updateDB()
    .then((locations) => {
      post = { locations, 'userName': props.userName, 'currentLocation': props.currentLocation },
      console.log('this is post in the then: ', post)
      axios.post('/api/updateLocations', post)
    }
    )
    setText('');
  }

  const handleRemove = (e) => {
    let post = {};
    e.preventDefault();
    let updateDB = async () => {
      const removeLocation = () => {
        let array = [];
        for (let i = 0; i < props.locations.length; i++) {
          if (props.locations[i] === props.currentLocation) { continue; }
          else {array.push(props.locations[i])}
        }
        return array;
      };
      let newLocations = removeLocation()
      console.log('new locations array: ', newLocations)
      props.setLocations(newLocations);
      props.setCurrentLocation(newLocations[0])
      return newLocations
    }
    updateDB()
    .then((locations) => {

      post = { locations, 'userName': props.userName, 'currentLocation': locations[0]},
      console.log('this is post for Remove in the then: ', post)
      axios.post('/api/updateLocations', post)
    }
    )
  }

  return(
  <TopNavStyle>
  <Title>You're a Wizard {props.userName}</Title>
  <DropDown userName={props.userName} setCurrentLocation={props.setCurrentLocation} currentLocation={props.currentLocation} locations={props.locations} />
  <form onSubmit={handleSubmit}>
    <Div>
      <Label>Add A New Location</Label>
    </Div>
  <Text type="text" color='antiquewhite' id="location" value={text} onChange={e => setText(e.target.value)} name="location"></Text>
  <Div>
  <Button type="submit" value='Portus!'></Button>
  <Button type="submit" value='Evanesco!' onClick={handleRemove}></Button>
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