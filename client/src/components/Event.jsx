import React, { Component } from 'react';
import axios from 'axios';


class Event extends Component {
  constructor(props) {
    super(props);

    this.removeEvent = this.removeEvent.bind(this);
  }

  removeEvent() {
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
      <div>
        <div>{this.props.event.title}</div>
        <div>{this.props.event.date}</div>
        <div>{this.props.event.start} to {this.props.event.end}</div>
        <button onClick={this.removeEvent}>Delete Event</button>
      </div>
    )
  }
}




export default Event;