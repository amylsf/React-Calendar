import React, { Component } from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start: '',
      end: ''
    }
  }


  render() {
    return (
      <form>
        <label> Event Name:
          <input name="title" />
        </label>
        <br/>
        <label> Start Time:
          <input/>
        </label>
        <br/>
        <label> End Time:
          <input/>
        </label>
      </form>
    )
  }
}


export default EventForm;