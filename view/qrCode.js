const qrcode = require("qrcode-terminal");

const showQR = (qr) => {
    qrcode.generate(qr, { small: true });
};

module.exports = { showQR };