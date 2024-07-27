const { client, handleMsg } = require("../app/pesan");

client.on("qr", (qr) => {
  require("../view/qrCode").showQR(qr);
});

client.on("authenticated", (session) => {
  console.log("Otentikasi berhasil");
});

client.on("auth_failure", (msg) => {
  console.error("Otentikasi gagal", msg);
});

client.on("ready", () => {
  console.log("Siap digunakan");
});

client.on("message", (message) => {
  handleMsg(message);
});

client.on("disconnected", (reason) => {
  console.log("Memutuskan koneksi", reason);
});

module.exports = {
  run: () => client.initialize(),
};
