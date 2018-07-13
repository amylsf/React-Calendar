import React, { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      month: moment()
    }

    this.getNextMonth = this.getNextMonth.bind(this);
    this.getPreviousMonth = this.getPreviousMonth.bind(this);
    this.getCurrentMonth = this.getCurrentMonth.bind(this);
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

  render() {
    return (
      <div>
        <div className="month">{this.state.month.format('MMMM YYYY')}</div>
        <button onClick={this.getPreviousMonth}>Previous</button>
        <button onClick={this.getCurrentMonth}>Today</button>
        <button onClick={this.getNextMonth}>Next</button>
      </div>
    )
  }
}


export default Calendar;