import React, { Component } from 'react';
import EventForm from './EventForm.jsx';

class Day extends Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }

    this.showEventForm = this.showEventForm.bind(this);
  }

  showEventForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  render() {
    return (
      <div className="day">
        <span className="day-number">{this.props.currentDay}</span>
        <br/>
        <button onClick={this.showEventForm}>Add Event</button>
        {this.state.showForm ? <EventForm /> : null}
      </div>
    )
  }
}


export default Day;