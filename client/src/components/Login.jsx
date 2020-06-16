import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Login = (props) => {
  const { setLoginUserName, setIsLoggedIn } = props;
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { userName, password };
    axios.post('/api/login', query)
      .then((result) => {
        if (result.data === false) {
          alert('Login Failed');
        } else {
          setLoginUserName(userName);
          setIsLoggedIn(true);
        }
      });
    setUserName('');
    setPassword('');
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    const query = { userName, password };
    axios.post('/api/addUser', query)
      .then(() => {
        setIsLoggedIn(true);
      });
    setUserName('');
    setPassword('');
  };

  return (
    <LoginStyle>
      <Title> New Wiz WhoDis?</Title>
      <form>
        <Div>
          <Label>What is your Wizard Name?</Label>
        </Div>
        <Text type="text" color="red" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} name="userName" />
        <Div>
          <Label>What is your Secret Spell?</Label>
        </Div>
        <Text type="text" color="antiquewhite" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
        <Div>
          <Button type="submit" id="knownUser" value="Known Wizard" onClick={handleSubmit} />
        </Div>
        <Div>
          <Button type="submit" id="newUser" value="New Wizard" onClick={handleNewUser} />
        </Div>
      </form>
    </LoginStyle>
  );
};

Login.propTypes = {
  setLoginUserName: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

const Title = styled.p`
  margin:0px;
  font-size:100px;
`;

const Div = styled.div`
  padding:5px
  text-align: center;
  text-align-last: center;
  font-size:30px;
  -moz-text-align-last: center;
  font-family: 'Luminari';
`;

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  `;

const Text = styled.input`
  background-image: url('darkWood.jpg');
  border-radius:18px;
  border-color:antiqueWhite;
  text-align: center;
  text-align-last: center;
  -moz-text-align-last: center;
  font-family: 'Luminari';
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

export default Login;
