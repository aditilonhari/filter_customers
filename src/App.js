import React, { Component } from 'react';
import './App.css';
import CustomersContainer from './components/CustomersContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1> Filter Customers </h1>
        </div>
        <CustomersContainer />
      </div>
    );
  }
}

export default App;
