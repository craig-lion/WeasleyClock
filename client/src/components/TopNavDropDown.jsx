import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const TopNavDropDown = (props) => {
  const {
    setCurrentLocation, userName, currentLocation, allLocations,
  } = props;

  const locations = allLocations.map((location) => {
    if (location === currentLocation) {
      return (
        <option key={location} value={location} selected>{location}</option>
      );
    }
    return (
      <option key={location} value={location}>{location}</option>
    );
  });

  const moveArm = (e) => {
    let post = {};
    setCurrentLocation(e.target.value);
    post = { userName, currentLocation: e.target.value };
    axios.post('/api/updateLocations', post);
  };

  return (
    <>
      <Label>Where are you?</Label>
      <Select id="locations" onChange={moveArm}>
        {locations}
      </Select>
    </>
  );
};

TopNavDropDown.propTypes = {
  setCurrentLocation: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  currentLocation: PropTypes.string.isRequired,
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Label = styled.label`
  color:antiquewhite;
`;

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
`;

export default TopNavDropDown;
