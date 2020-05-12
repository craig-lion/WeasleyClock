import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Login = (props) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    let query = {userName, password};
    axios.post('/api/login', query)
    .then((result) => {
      if(result.data === false) {alert('Login Failed')}
      props.setIsLoggedIn(result.data);
    })
    setUserName('');
    setPassword('');
  }

  const handleNewUser = (e) => {
    e.preventDefault();
    let query = {userName, password};
    axios.post('/api/addUser', query)
    .then((result) => {
      // console.log('this is result: ', result)
      props.setIsLoggedIn(true);
    })
    setUserName('');
    setPassword('');
  }

  return (
    <LoginStyle>
    <Title> New Wiz WhoDis?</Title>
    <form>
    <Div>
      <Label>What is your Wizard Name?</Label>
    </Div>
  <Text type="text" color='antiquewhite' id="userName" value={userName} onChange={e => setUserName(e.target.value)} name="userName"></Text>
  <Div>
      <Label>What is your Secret Spell?</Label>
    </Div>
  <Text type="text" color='antiquewhite' id="password" value={password} onChange={e => setPassword(e.target.value)} name="password"></Text>
  <Div>
  <Button type="submit" value="Y'all Know Who I Am" onClick={handleSubmit}></Button>
    <Button type="submit" value="New Wiz" onClick={handleNewUser}></Button>
  </Div>
  </form>
  </LoginStyle>
  )
}

const Title = styled.p`
  margin:0px;
  font-size:100px;
`

const Div = styled.div`
  padding:5px
`

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  `

const Text = styled.input`
  background-image: url('darkWood.jpg');
  border-radius:18px;
  border-color:antiqueWhite;
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

export default Login;