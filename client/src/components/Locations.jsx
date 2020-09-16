import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Locations = (props) => {
  const {
    handleSubmit, text, setText, handleRemove,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Div>
        <Label>Add A New Location</Label>
      </Div>
      <Text type="text" color="white" id="location" value={text} onChange={(e) => setText(e.target.value)} name="location" />
      <Div>
        <Button id="addLocation" type="submit" value="Portus!" onClick={handleSubmit} />
        <Button id="removeLocation" type="submit" value="Evanesco!" onClick={handleRemove} />
      </Div>
    </form>
  );
};

Locations.propTypes = {
  text: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

const Div = styled.div`
  padding:5px
`;

const Text = styled.input`
  background-image: url('darkWood.jpg');
  border-radius:18px;
  color:antiqueWhite;
  border-color:antiqueWhite;
`;

const Label = styled.label`
  color:antiquewhite;
  font-size:18px;
`;

const Button = styled.input`
  color:AntiqueWhite;
  background-image: url('darkWood.jpg');
  opacity: 50%;
  border-radius:18px;
  font-size:15px;
  font-family:Luminari;
`;

export default Locations;
