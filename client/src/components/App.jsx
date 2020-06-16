import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MainPage from './MainPage';
import Login from './Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserName, setLoginUserName] = useState('');

  useEffect(() => {
    axios.post('/api/login').then((res) => setIsLoggedIn(res.data));
  }, []);

  const logout = () => {
    axios.post('/api/logout').then((res) => setIsLoggedIn(res.data));
  };

  if (isLoggedIn) {
    return (
      <Centered>
        <Col>
          <MainPage
            logout={logout}
            currentUser={loginUserName}
            setLoginUserName={setLoginUserName}
          />
        </Col>
      </Centered>
    );
  }
  return (
    <Background>
      <Col>
        <Login setLoginUserName={setLoginUserName} setIsLoggedIn={setIsLoggedIn} />
      </Col>
    </Background>
  );
};

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Luminari';
  color: AntiqueWhite;
  background-image: url('darkWood.jpg');
`;

const Background = styled.div`
  background-image: url('darkWood.jpg');
  width:100wv;
  height: 100%;
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:100vw;
  background-image: url('darkWood.jpg');
`;

export default App;
