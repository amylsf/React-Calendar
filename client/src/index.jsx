import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';

class App extends Component {

  render() {
    return (
      <Calendar/>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));