import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopNavDropDown from './TopNavDropDown';
import FriendsList from './FriendsList';

// const Styled = require('./Styles');

// tried to implement styles in separate file but isn't working bc says isn't "returning a string"

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
  } = props;
  const [text, setText] = useState('');
  const [manageFriends, setManageFriends] = useState(false);

  const handleSubmit = (e) => {
    let post = {};
    e.preventDefault();
    const updateDB = async () => {
      const newLocations = [...props.locations, text];
      props.setLocations(newLocations);
      props.setCurrentLocation(text);
      return newLocations;
    };
    updateDB()
      .then((locations) => {
        post = { locations, userName, currentLocation };
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
      .then((locations) => {
        post = { locations, userName, currentLocation: locations[0] };
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
    axios.get('/api/users')
      .then((res) => {
        const oneUser = res.data;
        setLocations(oneUser.locations);
        setCurrentLocation(oneUser.currentLocation);
        setSuppress(false);
      })
      .catch((err) => { throw err; });
  };

  if (suppress) {
    return (
      <TopNavOtherClockStyle>
        <Title>
          `You&#39;re a Wizard `
          {userName}
        </Title>
        <Button type="submit" value="Return to Your Clock!" onClick={returnToClock} />
      </TopNavOtherClockStyle>
    );
  }
  if (manageFriends === false) {
    return (
      <TopNavStyle>
        <Title>
          You#&39;re a Wizard
          {props.userName}
        </Title>
        <Button type="submit" value="Change Wizard!" onClick={props.logout} />
        <TopNavDropDown
          userName={props.userName}
          setCurrentLocation={props.setCurrentLocation}
          currentLocation={props.currentLocation}
          allLocations={props.locations}
        />
        <form onSubmit={handleSubmit}>
          <Div>
            <Label>Add A New Location</Label>
          </Div>
          <Text type="text" color="white" id="location" value={text} onChange={(e) => setText(e.target.value)} name="location" />
          <Div>
            <Button type="submit" value="Portus!" />
            <Button type="submit" value="Evanesco!" onClick={handleRemove} />
            <Div>
              <Button type="submit" value="Manage Wizard Order!" onClick={handleFriends} />
            </Div>
          </Div>
        </form>
      </TopNavStyle>
    );
  }

  return (
    <TopNavFriendStyle>
      <Title>
        You&#39;re a Wizard
        {userName}
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
  logout: PropTypes.func.isRequired,
  setSuppress: PropTypes.func.isRequired,
  suppress: PropTypes.bool.isRequired,
  setLocations: PropTypes.func.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  currentLocation: PropTypes.string.isRequired,
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Div = styled.div`
  padding:5px
`;

const TopNavStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-align: center;
  padding:5px;
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

const Text = styled.input`
  background-image: url('darkWood.jpg');
  border-radius:18px;
  border-color:antiqueWhite;
`;

const Label = styled.label`
  color:antiquewhite;
  font-size:12px;
`;

const Button = styled.input`
  color:AntiqueWhite;
  background-image: url('darkWood.jpg');
  opacity: 50%;
  border-radius:18px;
`;

const Title = styled.p`
  margin:0px;
  font-size:40px;
`;

export default TopNav;
