import React, { Component } from 'react';
import axios from 'axios';


class Event extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <div>{this.props.event.title}</div>
        <div>{this.props.event.date}</div>
        <div>{this.props.event.start} to {this.props.event.end}</div>
      </div>
    )
  }
}




export default Event;