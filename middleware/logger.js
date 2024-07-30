module.exports = {
  logEvent: (eventName) => {
    return (data) => {
      console.log(`${eventName}`, data);
    };
  },
  handleAuthFailure: (msg) => {
    console.error("Otentikasi gagal", msg);
  },
  handleDisconnection: (reason) => {
    console.log("Memutuskan koneksi", reason);
  },
};