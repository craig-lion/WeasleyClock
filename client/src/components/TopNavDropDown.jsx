import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TopNavDropDown = (props) => {
  const {
    setCurrentLocation, userName, currentLocation, allLocations,
  } = props;

  const locations = allLocations.map((location) => (
    <option key={location} value={location}>{location}</option>
  ));

  const moveArm = (e) => {
    let post = {};
    setCurrentLocation(e.target.value);
    post = { userName, currentLocation: e.target.value };
    axios.post('/api/updateLocations', post);
  };

  return (
    <TopNavDropDownStyle>
      <Label>Where are you?</Label>
      <Select id="locations" onChange={moveArm} defaultValue={currentLocation}>
        {locations}
      </Select>
    </TopNavDropDownStyle>
  );
};

TopNavDropDown.propTypes = {
  setCurrentLocation: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  currentLocation: PropTypes.string,
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TopNavDropDown.defaultProps = {
  currentLocation: null,
};

const Label = styled.label`
  color:antiquewhite;
  font-size:20px;
`;

const TopNavDropDownStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding:5px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
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
