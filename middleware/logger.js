const logEvent = (eventName) => {
  return (data) => {
    console.log(`${eventName}`, data);
  };
};

const handleAuthFailure = (msg) => {
  console.error("Otentikasi gagal:", msg);
};

const handleDisconnection = (reason) => {
  console.log("Memutuskan koneksi:", reason);
};

module.exports = {
  logEvent,
  handleAuthFailure,
  handleDisconnection
};