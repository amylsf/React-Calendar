import React, { Component } from 'react';

class Week extends Component {
  constructor() {
    super()

    this.displayDays = this.displayDays.bind(this);
  }

  displayDays() {
    let days = [];
    let currentDay = this.props.date;

    for (let i = 0; i < 7; i++) {
      days.push(currentDay.clone().date());
      currentDay.add(1, 'day');
    }
    return days;
  }

  render() {
    return (
      <div>{this.displayDays()}</div>
    )
  }
}


export default Week;