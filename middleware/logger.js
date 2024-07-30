const logEvent = (eventName) => {
  return (data) => {
    console.log(`${eventName}`);
  }
};

const qrnotif = () => {
  console.log("Generate QR code");
};

const handleAuthFailure = (msg) => {
  console.error("Otentikasi gagal:", msg);
};

const handleDisconnection = (reason) => {
  console.log("Memutuskan koneksi:", reason);
  process.exit(1);
};

module.exports = {
  logEvent,
  qrnotif,
  handleAuthFailure,
  handleDisconnection
};