import React, { Component } from 'react';
import EventForm from './EventForm.jsx';
import axios from 'axios';

class Day extends Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      events: []
    }

    this.showEventForm = this.showEventForm.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios.get('/events', {
      params: {
        date: this.props.date
      }
    })
    .then(({data}) => {
      this.setState({
        events: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
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
        {this.state.events.length ? this.state.events.map((event) => {
          return (
            <div key={event._id} className="event-list">{event.title}</div>
          )
        })
        : null}
        <br/>
        <button onClick={this.showEventForm}>Add Event</button>
        {this.state.showForm ? <EventForm fetchEvents={this.fetchEvents} date={this.props.date} /> : null}
      </div>
    )
  }
}


export default Day;