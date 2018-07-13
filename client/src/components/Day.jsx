import React, { Component } from 'react';
import EventForm from './EventForm.jsx';
import Event from './Event.jsx';
import axios from 'axios';
import Modal from 'react-modal';

class Day extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      events: [],
      clickCount: 0,
      selectedEvent: ''
    }

    this.fetchEvents = this.fetchEvents.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.showEvent = this.showEvent.bind(this);
    this.clearClickCount = this.clearClickCount.bind(this);
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
      modalIsOpen: true,
      clickCount: 0
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedEvent: ''
    })
  }
  
  clearClickCount() {
    this.setState({
      clickCount: 0
    })
  }

  handleDoubleClick() {
    this.setState({
      clickCount: this.state.clickCount += 1
    }, () => {
      if (this.state.clickCount === 2) {
        this.openModal();
      } else {
        setTimeout(() => {
          this.clearClickCount();
        }, 500)
      }
    })
  }

  showEvent(event) {
    this.setState({
      selectedEvent: event
    }, () => {
      this.openModal();
    })
  }

  render() {
    const modalStyles = {
      content: {
        width: '30%',
        height: '30%',
        margin: 'auto'
      }
    }

    return (
      <div className={this.props.dayNumber === 0 || this.props.dayNumber === 6 ? "day weekend" : "day"} onClick={this.handleDoubleClick}>
        <span className="day-number">{this.props.currentDay}</span>
        {this.state.events.length ? this.state.events.map((event) => {
          return (
            <div key={event._id} className="event-list" onClick={() => {this.showEvent(event)}}>{event.title}</div>
          )
        })
        : null}
        <br/>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyles} >
          {this.state.selectedEvent !== '' ? <Event event={this.state.selectedEvent} closeModal={this.closeModal} fetchEvents={this.fetchEvents} /> :
          <EventForm fetchEvents={this.fetchEvents} date={this.props.date} closeModal={this.closeModal} />}
        </Modal>
      </div>
    )
  }
}


export default Day;