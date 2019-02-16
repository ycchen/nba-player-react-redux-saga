import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import Player from './components/Player'

class App extends Component {
  render() {
    return (
      <div>
        NBA Players App
        <Search />

        <Player />
      </div>
    );
  }
}

export default App;
