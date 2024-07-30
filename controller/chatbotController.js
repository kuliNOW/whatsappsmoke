const { client, handleMsg } = require("../services/pesan");
const {
  logEvent,
  qrnotif,
  handleAuthFailure,
  handleDisconnection
} = require("../middleware/logger");

const { showQR } = require('../view/qrCode');

client.on("qr", (qr) => {
  qrnotif();
  showQR(qr);
});

client.on("authenticated", logEvent("Otentikasi berhasil"));

client.on("auth_failure", handleAuthFailure);

client.on("ready", logEvent("Siap digunakan"));

client.on("message", (message) => {
  handleMsg(message);
});

client.on("disconnected", handleDisconnection);

module.exports = {
  run: () => client.initialize()
};