import React, { Component } from 'react';

import './App.css';
import Video from './Components/Video'

class Layout extends Component {

  render() {
    return (
      <div className="App">
        <h1>Dionysus</h1>
        <Video title="Mr Robot"/>
      </div>
    );
  }
}

export default Layout;
