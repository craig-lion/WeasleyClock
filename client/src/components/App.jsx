import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MainPage from './MainPage';
import Login from './Login'
import axios from 'axios';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserName, setLoginUserName] = useState('');

  useEffect(() => {
    axios.get('/api/login').then(res => setIsLoggedIn(res.data))
  }, [])

  const logout = () => {
    axios.delete('/api/logout').then(res => setIsLoggedIn(res.data))
  }

  if (isLoggedIn === false) {
    return (
      <Col>
        <Login setLoginUserName={setLoginUserName} setIsLoggedIn={setIsLoggedIn} />
      </Col>
    )
  } else {
    return (
      <Centered>
        <Div>
        <Button type="submit" value='Change Wizard!' onClick={logout}></Button>
        </Div>
        <Col>
          <MainPage logout={logout} currentUser={loginUserName} setLoginUserName={setLoginUserName} />
        </Col>
      </Centered>
    )
  }
}

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Luminari';
  color: AntiqueWhite;
`
const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Button = styled.input`
  color:AntiqueWhite;
  background-image: url('darkWood.jpg');
  opacity: 50%;
  border-radius:18px;
`

const Div = styled.div`
  padding:5px
`

export default App;