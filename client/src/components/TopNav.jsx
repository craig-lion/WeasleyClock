import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopNavDropDown from './TopNavDropDown';
import FriendsList from './FriendsList';
import Locations from './Locations';

const TopNav = (props) => {
  const {
    friends,
    logout,
    userName,
    suppress,
    setCurrentLocation,
    setLocations,
    currentLocation,
    setSuppress,
    locations,
  } = props;
  const [text, setText] = useState('');
  const [manageFriends, setManageFriends] = useState(false);

  const handleSubmit = (e) => {
    let post = {};
    e.preventDefault();
    const updateDB = async () => {
      const newLocations = [...props.locations, text];
      setLocations(newLocations);
      setCurrentLocation(text);
      return newLocations;
    };
    updateDB()
      .then((newLocations) => {
        post = { locations: newLocations, userName, currentLocation };
        axios.post('/api/updateLocations', post);
      });
    setText('');
  };

  const handleRemove = (e) => {
    let post = {};
    e.preventDefault();
    const updateDB = async () => {
      const removeLocation = () => {
        const array = [];
        for (let i = 0; i < props.locations.length; i += 1) {
          if (props.locations[i] !== props.currentLocation) { array.push(props.locations[i]); }
        }
        return array;
      };
      const newLocations = removeLocation();
      setLocations(newLocations);
      setCurrentLocation(newLocations[0]);
      return newLocations;
    };
    updateDB()
      .then((newLocations) => {
        post = { locations: newLocations, userName, currentLocation: locations[0] };
        axios.post('/api/updateLocations', post);
      });
  };

  const handleFriends = (e) => {
    e.preventDefault();
    setManageFriends(true);
  };

  const handleLocations = (e) => {
    e.preventDefault();
    setManageFriends(false);
  };

  const returnToClock = () => {
    axios.get('/api/userInfo')
      .then((res) => {
        const oneUser = res.data;
        setLocations(oneUser.locations);
        setCurrentLocation(oneUser.currentLocation);
        setSuppress(false);
      })
      .catch((err) => { throw err; });
  };

  const title = `You're a Wizard ${userName}`;

  if (suppress) {
    return (
      <TopNavOtherClockStyle>
        <Title>
          {title}
        </Title>
        <Button type="submit" value="Return to Your Clock!" onClick={returnToClock} />
      </TopNavOtherClockStyle>
    );
  }
  if (manageFriends === false) {
    return (
      <>
        <Title>
          {title}
        </Title>
        <Button type="submit" value="Manage Wizard Order!" onClick={handleFriends} />
        <Button type="submit" value="Change Wizard!" onClick={logout} />
        <TopNavStyle>
          <TopNavDropDown
            userName={userName}
            setCurrentLocation={setCurrentLocation}
            currentLocation={currentLocation}
            allLocations={locations}
          />
          <Locations
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
            handleRemove={handleRemove}
            handleFriends={handleFriends}
          />
        </TopNavStyle>
      </>
    );
  }

  return (
    <TopNavFriendStyle>
      <Title>
        {title}
      </Title>
      <Button type="submit" value="Change Wizard!" onClick={logout} />
      <FriendsList
        friends={friends}
        handleLocations={handleLocations}
        userName={userName}
      />
    </TopNavFriendStyle>
  );
};

TopNav.propTypes = {
  currentLocation: PropTypes.string,
  logout: PropTypes.func.isRequired,
  setSuppress: PropTypes.func.isRequired,
  suppress: PropTypes.bool.isRequired,
  setLocations: PropTypes.func.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TopNav.defaultProps = {
  currentLocation: null,
};

const TopNavStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  `;

const TopNavFriendStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 375px;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-align: center;
  padding:5px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  `;

const TopNavOtherClockStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-align: center;
  padding:5px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  // position:absolute;
  `;

const Button = styled.input`
  color:AntiqueWhite;
  background-image: url('darkWood.jpg');
  opacity: 50%;
  border-radius:18px;
  font-size:15px;
  font-family:Luminari;
`;

const Title = styled.p`
  margin:0px;
  font-size:60px;
`;

export default TopNav;
