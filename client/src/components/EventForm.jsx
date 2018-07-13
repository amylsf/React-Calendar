import React, { Component } from 'react';
import axios from 'axios';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start: '',
      end: ''
    }

    this.setEvent = this.setEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  setEvent(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addEvent(e) {
    e.preventDefault();
    console.log(this.props.date)
    axios.post('/events', {
      event: {
        title: this.state.title,
        date: this.props.date,
        start: this.state.start,
        end: this.state.end
      }
    })
    .then(() => {
      this.props.fetchEvents();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render() {
    return (
      <form>
        <label> Event Name:
          <input name="title" value={this.state.title} onChange={(e) => {this.setEvent(e)}} />
        </label>
        <br/>
        <label> Start Time:
          <input name="start" value={this.state.start} onChange={(e) => {this.setEvent(e)}} />
        </label>
        <br/>
        <label> End Time:
          <input name="end" value={this.state.end} onChange={(e) => {this.setEvent(e)}} />
        </label>
        <button onClick={(e) => {this.addEvent(e)}}>Add Event</button>
      </form>
    )
  }
}


export default EventForm;