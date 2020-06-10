import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopNav from './TopNav';
import CenterpieceDropDown from './CenterpieceDropDown';
import ClockFace from './ClockFace';

const helper = require('./helper.js');

const MainPage = (props) => {
  const [locations, setLocations] = useState(['']);
  const [userName, setUserName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(() => locations[0]);
  const [friends, setFriends] = useState(['']);
  const [suppress, setSuppress] = useState(false);
  const { logout, setLoginUserName } = props;

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        const oneUser = res.data;
        setLocations(oneUser.locations);
        setUserName(oneUser.userName);
        setCurrentLocation(oneUser.currentLocation);
        setFriends(oneUser.friends);
      })
      .catch((err) => { throw err; });
  }, []);

  return (
    <>
      <TopNav
        userName={userName}
        setCurrentLocation={setCurrentLocation}
        setLocations={setLocations}
        locations={locations}
        currentLocation={currentLocation}
        friends={friends}
        logout={logout}
        suppress={suppress}
        setSuppress={setSuppress}
      />
      <Bottom>
        <ClockFace
          locations={locations}
          currentLocation={currentLocation}
        />
        <ClockToggle>
          <CenterpieceDropDown
            friends={friends}
            userName={userName}
            x={helper.circle.centerX}
            y={helper.circle.centerY}
            setSuppress={setSuppress}
            setLoginUserName={setLoginUserName}
            setLocations={setLocations}
            setCurrentLocation={setCurrentLocation}
          />
        </ClockToggle>
      </Bottom>
    </>
  );
};

MainPage.propTypes = {
  logout: PropTypes.func.isRequired,
  setLoginUserName: PropTypes.func.isRequired,
};

const ClockToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  height:100%;
  width:100vw;
  position:absolute;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width:100vw;
  background-image: url('Burrow.jpg');
  position:relative;
`;

export default MainPage;
