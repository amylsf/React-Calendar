import React, { Component } from 'react';
import axios from 'axios';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start: '12:00',
      end: '12:30',
      startTime: 'AM',
      endTime: 'AM'
    }

    this.setEvent = this.setEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.generateTimes = this.generateTimes.bind(this);
  }

  setEvent(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addEvent(e) {
    e.preventDefault();
    axios.post('/events', {
      event: {
        title: this.state.title,
        date: this.props.date,
        start: this.state.start,
        startTime: this.state.startTime,
        end: this.state.end,
        endTime: this.state.endTime
      }
    })
    .then(() => {
      this.props.closeModal();
      this.props.fetchEvents();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //generate time options for dropdown form
  generateTimes() {
    let times = ['12:00', '12:30'];
    for (let i = 1; i <= 11; i++) {
      if (i <= 9) {
        times.push(`0${i}:00`, `0${i}:30`);
      } else {
        times.push(`${i}:00`, `${i}:30`);
      }
    }
    return times;
  }

  render() {
    return (
      <form>
        <label> Event Name: 
          <input className="input" name="title" value={this.state.title} onChange={(e) => {this.setEvent(e)}} maxLength={20} required="required" />
        </label>
        <br/>
        <label> Start Time: 
          <select className="input" name="start" value={this.state.start} onChange={(e)=>{this.setEvent(e)}}>
            {this.generateTimes().map((time, i) => {
              return (
                <option value={time} key={i}>{time}</option>
              )
            })}
          </select>
          <select name="startTime" value={this.state.startTime} onChange={(e)=>{this.setEvent(e)}}>
            <option value={'AM'}>AM</option>
            <option value={'PM'}>PM</option>
          </select>
        </label>
        <br/>
        <label> End Time: 
          <select className="input" name="end" value={this.state.end} onChange={(e)=>{this.setEvent(e)}}>
            {this.generateTimes().map((time, i) => {
              return (
                <option name="end" value={time} key={i}>{time}</option>
              )
            })}
          </select>
          <select name="endTime" value={this.state.endTime} onChange={(e)=>{this.setEvent(e)}}>
            <option value={'AM'}>AM</option>
            <option value={'PM'}>PM</option>
          </select>
        </label>
        <br/>
        <button className="form-button" onClick={(e) => {this.addEvent(e)}}>Add Event</button>
      </form>
    )
  }
}


export default EventForm;