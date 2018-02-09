import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Video from './Components/Video'

class Layout extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Dionysus</h1>
          <Route path="/:show/:season/:episode" component={Video}/>
        </div>
      </Router>
    )
  }
}
export default Layout;
