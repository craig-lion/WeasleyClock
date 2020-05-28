import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Friends = (props) => {


  const [allUsersList, setAllUsersList] = useState(['']);
  const [friendsList, setFriendsList] = useState(props.friends);

  const addFriend = (e) => {
    let friends = [...friendsList, e.target.getAttribute('value')];
    axios.post('/api/updateFriends', { friends })
    setFriendsList(friends)
  }
  const removeFriend = (e) => {
    let friends = friendsList.filter(location => location !== e.target.getAttribute('value'));
    axios.post('/api/updateFriends', { friends })
    setFriendsList(friends)
  }
  

  const AllUsers =  () => {
    const removeFriends = () => {
      let array = []
      for (let i = 0; i < allUsersList.length; i++) {
        if (friendsList.includes(allUsersList[i])) { continue; }
        else { array.push(allUsersList[i]); }
      }
      return array
    }
    let notFriends = removeFriends(allUsersList)
    return (
      notFriends.map(
        user => (
        <li className="user" key={user} value={user} onClick={addFriend}>{user}</li>
        )
      )
  )}; 

  const Friends =  () => {
    
    return (
    friendsList.map(
      friend => (
      <li className="friend" key={friend} value={friend} onClick={removeFriend}>{friend}</li>
      )
    )
  )};
  
  useEffect(() => {
    axios.get('/api/allUsers')
    .then((res) => {
      let makeArray = () => {
        let array = res.data.map(
          (obj) => { return obj.userName; } 
        )
        return array
    } 
      let allUsers = makeArray(res.data);
      setAllUsersList(allUsers)
    })
    .catch((err) => {throw err;})
  }, []);

  return (
    <>
      <Div>
        <Label>Manage Your Wizard Order</Label>
      </Div>
      <Container>
        <Left>
          <p>All Wizard Names Go Here</p>
          <List>
            <AllUsers />
          </List>
        </Left>
        <Right>
          Wizards in Your Order Go Here
          <List>
            <Friends />
          </List>
        </Right>
      </Container>
      <Div>
        <Button type="submit" value='Manage Locations!' onClick={props.handleLocations}></Button>
      </Div>
    </>
  )
}

const Div = styled.div`
  padding:5px
`

const Container = styled.div`
  display:flex;
  flex-direction:row;
  width:350px;
  height:250px;
  border: 2px solid;
`

const Left = styled.div`
  border:2px solid red;
  height:auto;
  width:auto;
`

const Right = styled.div`
  border:2px solid green;
  height:auto;
  width:auto;
`

const List = styled.ul`
list-style-type: none;
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


export default Friends;