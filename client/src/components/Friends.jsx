import React from 'react';
import styled from 'styled-components';

const Friends = (props) => {

  const dummyStrings = ['Kimmy', 'Titus', 'Jane', 'Tina'];

  const AllUsers =  () => (
      dummyStrings.map(
        friend => (
        <div className="friend" key={friend}>{friend}</div>
        )
      )
  ); 

  const MyOrder =  () => (
    dummyStrings.map(
      friend => (
      <div className="friend" key={friend}>{friend}</div>
      )
    )
); 

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
          <MyOrder />
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