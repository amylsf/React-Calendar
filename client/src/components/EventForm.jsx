import React, { Component } from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start: '',
      end: ''
    }

    this.setEvent = this.setEvent.bind(this);
  }

  setEvent(e) {
    this.setState({
      [e.target.name]: e.target.value
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
      </form>
    )
  }
}


export default EventForm;