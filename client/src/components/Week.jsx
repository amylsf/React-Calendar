import React, { Component } from 'react';
import Day from './Day.jsx';
import { events } from '../data/eventData.js';

class Week extends Component {
  constructor() {
    super()

    this.displayDays = this.displayDays.bind(this);
  }

  displayDays() {
    let days = [];
    let currentDay = this.props.date;

    for (let i = 0; i < 7; i++) {
      let date = currentDay.format('MM-DD-YYYY');
      let todaysEvents = events.filter((event) => {
        return event.date === date;
      })
      days.push(
        <Day
          key={currentDay.date()}
          currentDay={currentDay.date()}
          date={date}
          dayNumber={currentDay.day()}
          todaysEvents={todaysEvents}
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