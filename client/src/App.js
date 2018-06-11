import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IT WORKS</h1>
        </header>
        <a href="/auth/google" className="App-intro">
          Sign in with Google
        </a>
      </div>
    );
  }
}

export default App;
