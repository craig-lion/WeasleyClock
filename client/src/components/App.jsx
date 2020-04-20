import React from 'react';
import MakeCircles from './MakeCircles'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>You're a Wizard Harry</h1>
        <MakeCircles />
      </div>
    )
  }
}

export default App;