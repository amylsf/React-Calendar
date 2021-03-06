const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 3000;
const { saveEvent, removeEvent, fetchEvents } = require('../database/index.js');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.get('/events', (req, res) => {
  fetchEvents(req.query.date)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(500).end('could not get events', err);
  })
})

app.post('/events', (req, res) => {
  saveEvent(req.body.event)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    res.status(500).end('could not save event', err);
  })
})

app.delete('/events', (req, res) => {
  removeEvent(req.query.eventId)
  .then(() => {
    res.status(200).end();
  })
  .catch((err) => {
    res.status(500).end('could not delete event', err);
  })
})