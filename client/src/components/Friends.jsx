import React from 'react';
import styled from 'styled-components';

const Friends = (props) => {
  return (
    <>
      <Div>
        <Label>Manage Your Wizard Order</Label>
      </Div>

      <Div>
        <Button type="submit" value='Manage Locations!' onClick={props.handleLocations}></Button>
      </Div>
    </>
  )
}

const Div = styled.div`
  padding:5px
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