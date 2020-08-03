import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

const FriendsList = (props) => {
  const { handleLocations, friends } = props;

  const [allUsersList, setAllUsersList] = useState([]);
  const [friendsList, setFriendsList] = useState(friends);

  const addFriend = (e) => {
    const newFriends = [...friendsList, e.target.getAttribute('value')];

    axios.post('/api/updateFriends', { friends: newFriends });
    setFriendsList(newFriends);
  };
  const removeFriend = (e) => {
    const lessFriends = friendsList.filter((location) => location !== e.target.getAttribute('value'));
    axios.post('/api/updateFriends', { friends: lessFriends });
    setFriendsList(lessFriends);
  };

  const notFriends = allUsersList.filter((friend) => (!friendsList.includes(friend)));

  const AllUsers = () => (
    notFriends.map(
      (user) => {
        const id = `Friend-ele-${user}`;
        return (
          <li key={user}>
            <div
              id={id}
              className="friend"
              role="button"
              key={user}
              value={user}
              onClick={addFriend}
              onKeyPress={addFriend}
              tabIndex="-1"
            >
              {user}
            </div>
          </li>
        );
      },
    )
  );

  // need to figure out what should have tabIndex = 0

  const Friends = () => (
    friendsList.map(
      (user) => {
        const id = `Friend-ele-${user}`;
        return (
          <li key={user}>
            <div
              id={id}
              className="friend"
              key={user}
              value={user}
              onClick={removeFriend}
              role="button"
              tabIndex="-1"
              onKeyPress={addFriend}
            >
              {user}
            </div>
          </li>
        );
      },
    )
  );

  useEffect(() => {
    axios.get('/api/allUsers')
      .then((res) => {
        const makeArray = () => {
          const array = res.data.map(
            (obj) => (obj.userName),
          );
          return array;
        };
        const allUsers = makeArray(res.data);
        setAllUsersList(allUsers);
      })
      .catch((err) => { throw err; });
  }, []);

  return (
    <>
      <Div>
        <Label>Manage Your Wizard Order</Label>
      </Div>
      <Container>
        <Left>
          <p>All Wizards</p>
          <List id="allWiz">
            <AllUsers />
          </List>
        </Left>
        <Right>
          <p>Your Order</p>
          <List id="yourOrder">
            <Friends />
          </List>
        </Right>
      </Container>
      <Div>
        <Button id="changeFriends" type="submit" value="Manage Locations!" onClick={handleLocations} />
      </Div>
    </>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLocations: PropTypes.func.isRequired,
};

const Div = styled.div`
  padding:5px
`;

const Container = styled.div`
  display:flex;
  flex-direction:row;
  width:350px;
  height:150px;
`;

const Left = styled.div`
  height:auto;
  width:50%;
`;

const Right = styled.div`
  height:auto;
  width:50%;
`;

const List = styled.ul`
  list-style-type: none;
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

export default FriendsList;
