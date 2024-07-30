const { client, handleMsg } = require("../app/pesan");
const {
  logEvent,
  handleAuthFailure,
  handleDisconnection,
} = require("../middleware/logger");

client.on("qr", (qr) => {
  qrCode.showQR(qr);
});

client.on("authenticated", logEvent("Otentikasi berhasil"));

client.on("auth_failure", handleAuthFailure);

client.on("ready", logEvent("Siap digunakan"));

client.on("message", (message) => {
  handleMsg(message);
});

client.on("disconnected", handleDisconnection);

module.exports = {
  run: () => client.initialize(),
};