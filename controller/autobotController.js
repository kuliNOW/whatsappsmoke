const { initializeClient } = require('../services/notif');

const startBot = () => {
  initializeClient();
};

module.exports = {
  startBot,
};