import React, {useState} from 'react';
import styled from 'styled-components';
import MainPage from './MainPage';
import Login from './Login'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn === false) {
    return (
      <Col>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </Col>
    )
  } else {
    return (
      <Centered>
        <Col>
          <MainPage />
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

export default App;