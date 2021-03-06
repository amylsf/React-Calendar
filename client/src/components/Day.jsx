import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import EventForm from './EventForm.jsx';
import Event from './Event.jsx';

class Day extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      events: [],
      clickCount: 0,
      selectedEvent: '',
      isDefaultEvent: false
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

  //opens the popup modal that holds the event info 
  openModal() {
    this.setState({
      modalIsOpen: true,
      clickCount: 0
    })
  }

  //closes the popup modal that holds the event info 
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

  //opens an event form when you double click on a day
  handleDoubleClick() {
    this.setState({
      clickCount: this.state.clickCount += 1
    }, () => {
      if (this.state.clickCount === 2) {
        this.openModal();
      } else {
        setTimeout(() => { //resets the click count if you wait too long between clicks
          this.clearClickCount();
        }, 500)
      }
    })
  }

  //shows event details for an event upon click
  showEvent(event, isDefaultEvent) {
    this.setState({
      selectedEvent: event,
      isDefaultEvent: isDefaultEvent
    }, () => {
      this.openModal();
    })
  }

  render() {
    const modalStyles = {
      content: {
        width: '30%',
        height: '20%',
        margin: 'auto',
        backgroundColor: '#F8F8F8'
      }
    }

    //NOTE: if i had additional time, i would put the below events together in one array and sort them in time order
    return (
      <div className={this.props.dayNumber === 0 || this.props.dayNumber === 6 ? "day weekend" : "day"} onClick={this.handleDoubleClick}>
        <span className="day-number">{this.props.currentDay}</span>
        {this.props.todaysEvents.length ? this.props.todaysEvents.map((event, i) => {
          return (
            <div key={i} className="event-list default" onClick={() => {this.showEvent(event, true)}}>{event.title}</div>
          )
        }) : null}
        {this.state.events.length ? this.state.events.map((event) => {
          return (
            <div key={event._id} className="event-list" onClick={() => {this.showEvent(event, false)}}>{event.title}</div>
          )
        })
        : null}
        <br/>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyles} >
          {this.state.selectedEvent !== '' ? <Event event={this.state.selectedEvent} closeModal={this.closeModal} fetchEvents={this.fetchEvents} isDefaultEvent={this.state.isDefaultEvent}/> :
          <EventForm fetchEvents={this.fetchEvents} date={this.props.date} closeModal={this.closeModal} />}
        </Modal>
      </div>
    )
  }
}


export default Day;