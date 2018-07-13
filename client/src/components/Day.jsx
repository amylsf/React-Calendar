import React, { Component } from 'react';
import EventForm from './EventForm.jsx';
import axios from 'axios';
import Modal from 'react-modal';

class Day extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      events: [],
      clickCount: 0
    }

    this.fetchEvents = this.fetchEvents.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
    Modal.setAppElement('body');
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

  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  handleDoubleClick() {
    this.setState({
      clickCount: this.state.clickCount += 1
    }, () => {
      if (this.state.clickCount === 2) {
        this.openModal();
      }
    })
  }

  render() {
    return (
      <div className="day" onClick={this.handleDoubleClick}>
        <span className="day-number">{this.props.currentDay}</span>
        {this.state.events.length ? this.state.events.map((event) => {
          return (
            <div key={event._id} className="event-list">{event.title}</div>
          )
        })
        : null}
        <br/>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} >
          <EventForm fetchEvents={this.fetchEvents} date={this.props.date} closeModal={this.closeModal} />
        </Modal>
      </div>
    )
  }
}


export default Day;