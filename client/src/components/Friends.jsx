import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Friends = (props) => {


  const [allUsersList, setAllUsersList] = useState(['Kimmy', 'Titus', 'Jane', 'Tina']);
  const [friendsList, setFriendsList] = useState(['Harry', 'Ron', 'Hermionie']);


  const AllUsers =  () => (
      allUsersList.map(
        user => (
        <div className="user" key={user}>{user}</div>
        )
      )
  ); 

  const Friends =  () => (
    friendsList.map(
      friend => (
      <div className="friend" key={friend}>{friend}</div>
      )
    )
  );
  
  useEffect(() => {
    axios.get('/api/allUsers')
    .then((res) => {
      let allUsers = res.data;
      console.log('this is res in Friends: ', allUsers)
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
          All Wizard Names Go Here
          <AllUsers />
        </Left>
        <Right>
          Wizards in Your Order Go Here
          <Friends />
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