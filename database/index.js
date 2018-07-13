const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/react-calendar');


const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  start: String,
  end: String
})

const Event = mongoose.model('Event', eventSchema);

module.exports.saveEvent = (event) => {
  return Event.create({
    title: event.title,
    date: event.date,
    start: event.start,
    end: event.end
  })
  .catch((err) => {
    console.log('Unable to add event to db', err);
  })
}

module.exports.removeEvent = () => {
  return Event.remove()
  .catch((err) => {
    console.log('Unable to remove event from db', err);
  })
}

module.exports.fetchEvents = () => {
  return Event.find({})
  .catch((err) => {
    console.log('Unable to fetch events from db', err);
  })
}