import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapboxGl, { GeoJSONLayer, Feature } from "react-mapbox-gl";

//let geoJson = require('location.json');

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZGF2YWxwYXJnYWwiLCJhIjoiY2o1NXY4cWl0MGhidzMybnM0ZWZkMzV0MiJ9.v68iNZSriD0n0GcC73GrEw"
});

class App extends Component {
  constructor() {
    super();
    
  }
  render() {
    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={[106.85, -6.17]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>
        </Map>
      </div>
    );
  }
}

export default App;
