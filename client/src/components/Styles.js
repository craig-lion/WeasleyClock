import styled from 'styled-components';

const Div = styled.div`
  padding:5px
`;

const TopNavStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 100vw;
  background-image: url('darkWood.jpg');
  text-align: center;
  padding:5px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  `;

const Text = styled.input`
  background-image: url('darkWood.jpg');
  border-radius:18px;
  border-color:antiqueWhite;
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

module.exports = {
  Div, TopNavStyle, Text, Label, Button,
};
