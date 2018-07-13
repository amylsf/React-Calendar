import React, { Component } from 'react';

class Day extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div className="day">{this.props.currentDay}</div>
    )
  }
}


export default Day;