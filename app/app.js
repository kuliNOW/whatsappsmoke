require("../model/envConfig");
const express = require("express");
const { run } = require("../controller/chatbotController");
const events = require("events");
const app = express();
const { PORT_DEV, ENV_DEV } = process.env;
process.env.NODE_ENV = ENV_DEV;
process.env.PORT = PORT_DEV;
let env = process.env.NODE_ENV;
let port = process.env.PORT;
events.EventEmitter.defaultMaxListeners = 20;

run();

app.listen(port, () => {
  console.log(`Server berjalan pada:\n- Environment: ${env}\n- Port: ${port}`);
});