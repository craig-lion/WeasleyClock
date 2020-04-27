import React from 'react';


const DropDown = (props) => {
  console.log('props', props)
  const locations = props.locations.map((location) => 
    <option font='luminari 24px' key={location} value={location}>{location}</option>
  )

  const moveArm = (e) => {
    console.log('e: ', e.target.value)
    props.setCurrentLocation(e.target.value)
  }
  return (
    <>
      <label>Where are you?</label>
      <select id="locations" onChange={moveArm}>
        {locations}
      </select>
    </>
  )
}

export default DropDown;