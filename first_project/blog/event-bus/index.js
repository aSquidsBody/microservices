const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

// post event to other apps
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // posts
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((error) => {
    console.log(error.message);
  });

  // comments
  axios.post("http://comments-srv:4001/events", event).catch((error) => {
    console.log(error.message);
  });

  // query
  axios.post("http://query-srv:4002/events", event).catch((error) => {
    console.log(error.message);
  });

  // moderation
  axios.post("http://moderation-srv:4003/events", event).catch((error) => {
    console.log(error.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("(Event-bus) Listening on 4005");
});
