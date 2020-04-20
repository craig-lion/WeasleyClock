import React from 'react';
const helper = require('./helper.js')

class SVGComponent extends React.Component {
    render() {
        return <svg {...this.props}>{this.props.children}</svg>;
    }
};

class Circle extends React.Component{
    render() {
        return <circle {...this.props}>{this.props.children}</circle>;
    }
};

class MakeCircles extends React.Component {
  render() {
    const point = helper.getPointsOnCircle([130,130], 125, 45)
    console.log(point)
    return (
      <div>
        <SVGComponent height="260" width="260">
          <Circle cx="130" cy="130" r="125" fill="none" stroke="#F0CE01" strokeWidth="2" />
          <text textAnchor="middle" x="130" y="130">Circle Text</text>
          <text textAnchor="Hogwarts" x="195" y="236">Hogwarts</text>
          <line x1="130" y1="130" x2="195" y2="236" stroke="black" />
          <circle cx="195" cy="236" r="2" fill="red"/>
        </SVGComponent>
      </div>
    );
  }
};

export default MakeCircles