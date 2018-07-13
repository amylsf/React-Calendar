import React, { Component } from 'react';
import Day from './Day.jsx';

class Week extends Component {
  constructor() {
    super()

    this.displayDays = this.displayDays.bind(this);
  }

  displayDays() {
    let days = [];
    let currentDay = this.props.date;

    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          key={currentDay.date()}
          currentDay={currentDay.date()}
          date={currentDay.format('MM-DD-YYYY')}
          dayNumber={currentDay.day()}
        />
      );
      currentDay.add(1, 'day');
    }
    return days;
  }

  render() {
    return (
      <div className="week">{this.displayDays()}</div>
    )
  }
}


export default Week;