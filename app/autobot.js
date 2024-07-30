require('../config/envConfig');
const express = require("express");
const app = express();
const { startBot, initializeClient } = require("../controller/autobotController");
const { PORT_BOT, ENV_BOT } = process.env;
process.env.NODE_ENV = ENV_BOT;
process.env.PORT = PORT_BOT;
let env = process.env.NODE_ENV;
let port = process.env.PORT;

startBot();
initializeClient;

app.listen(port, () => {
  console.log(`Server berjalan pada:\n- Environment: ${env}\n- Port: ${port}`);
});