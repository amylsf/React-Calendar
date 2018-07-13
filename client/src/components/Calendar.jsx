import React, { Component } from 'react';
import moment from 'moment';
import Week from './Week.jsx';

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      month: moment()
    }

    this.getNextMonth = this.getNextMonth.bind(this);
    this.getPreviousMonth = this.getPreviousMonth.bind(this);
    this.getCurrentMonth = this.getCurrentMonth.bind(this);
    this.displayWeeks = this.displayWeeks.bind(this);
  }

  getNextMonth() {
    this.setState({
      month: this.state.month.add(1, 'month')
    })
  }

  getPreviousMonth() {
    this.setState({
      month: this.state.month.subtract(1, 'month')
    })
  }

  getCurrentMonth() {
    this.setState({
      month: moment()
    })
  }

  displayWeeks() {
    let weeks = [];
    let date = this.state.month.clone().startOf('month').day(0); //get date of the sunday of the first week of a month
    let generatedWeeks = false;
    let weekCount = 0;
    let currentMonth = date.month();
    
    while (!generatedWeeks) {
      weeks.push(date.clone().format('dd')); //[TO DO] add week component in place of this!!
      date.add(1, 'week'); //gets each sunday of the month
      weekCount++;
      generatedWeeks = weekCount > 1 && currentMonth !== date.month(); //stops generating new weeks when sunday falls in new month
    }
    return weeks;
  }

  render() {
    return (
      <div>
        <div>
          <div className="month">{this.state.month.format('MMMM YYYY')}</div>
          <button onClick={this.getPreviousMonth}>Previous</button>
          <button onClick={this.getCurrentMonth}>Today</button>
          <button onClick={this.getNextMonth}>Next</button>
        </div>
        <div className="day-names">
          <span className="day-name">Sun</span>
          <span className="day-name">Mon</span>
          <span className="day-name">Tue</span>
          <span className="day-name">Wed</span>
          <span className="day-name">Thu</span>
          <span className="day-name">Fri</span>
          <span className="day-name">Sat</span>
        </div>
        {this.displayWeeks()}
      </div>
    )
  }
}


export default Calendar;