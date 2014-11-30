#! /usr/bin/env node

var mqtt = require('../');
var client = mqtt.createClient(1883, "localhost", { clean: true });

var sent = 0;
var interval = 5000;

function count() {
  console.log("sent/s", sent / interval * 1000);
  sent = 0;
}

setInterval(count, interval)

function publish() {
  sent++;
  client.publish("test", "payload", publish);
}

client.on("connect", publish);

client.on("error", function() {
  console.log("reconnect!");
  client.stream.end();
});
