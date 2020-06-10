import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const CenterpieceDropDown = (props) => {
  const {
    friends, setLocations, setCurrentLocation, setSuppress, userName,
  } = props;

  const clocks = friends.map((friend) => (
    <Option key={friend} width="20px" value={friend}>{friend}</Option>
  ));

  const changeClock = (e) => {
    axios.get('/api/users', { params: { userName: e.target.value } })
      .then((res) => {
        const oneUser = res.data;
        setLocations(oneUser.locations);
        setCurrentLocation(oneUser.currentLocation);
        setSuppress(true);
      })
      .catch((err) => { throw err; });
  };
  return (
    <DropDownStyle>
      <Label>
        Viewing
        {userName}
      </Label>
      <Select id="clocks" onChange={changeClock}>
        {clocks}
      </Select>
    </DropDownStyle>
  );
};

CenterpieceDropDown.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  setLocations: PropTypes.func.isRequired,
  setSuppress: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

const Label = styled.label`
  color:antiquewhite;
`;

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
`;

const Option = styled.option`
  width: 100%;
`;

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
`;

export default CenterpieceDropDown;
