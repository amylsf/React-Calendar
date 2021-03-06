import React, { Component } from 'react';
import axios from 'axios';


class Event extends Component {
  constructor(props) {
    super(props);

    this.removeEvent = this.removeEvent.bind(this);
  }

  removeEvent(e) {
    e.preventDefault();
    axios.delete('/events', {
      params: {
        eventId: this.props.event._id
      }
    })
    .then(() => {
      this.props.fetchEvents();
      this.props.closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="event-details">
        <div className="title">{this.props.event.title}</div>
        <div>{this.props.event.date}</div>
        <div>{this.props.event.start} {this.props.event.startTime} to {this.props.event.end} {this.props.event.endTime}</div>
        {this.props.isDefaultEvent ? null : <button className="form-button" onClick={(e) => {this.removeEvent(e)}}>Delete Event</button>}
      </div>
    )
  }
}




export default Event;