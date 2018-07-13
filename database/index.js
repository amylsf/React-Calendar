const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/react-calendar');

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  start: String,
  startTime: String,
  end: String,
  endTime: String
})

const Event = mongoose.model('Event', eventSchema);

module.exports.saveEvent = (event) => {
  return Event.create({
    title: event.title,
    date: event.date,
    start: event.start,
    startTime: event.startTime,
    end: event.end,
    endTime: event.endTime
  })
  .catch((err) => {
    console.log('Unable to add event to db', err);
  })
}

module.exports.removeEvent = (eventId) => {
  return Event.remove({_id: eventId})
  .catch((err) => {
    console.log('Unable to remove event from db', err);
  })
}

module.exports.fetchEvents = (date) => {
  return Event.find({
    date: date
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log('Unable to fetch events from db', err);
  })
}