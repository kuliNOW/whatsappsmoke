require('./envConfig');
const { fireEnv } = require('./firebaseConfig');
const bot = require("firebase-admin");
const client = require('./pesan'); 
const { NUMBER, WARNING_MESSAGE } = process.env;
let db = fireEnv.database();
let userRef = db.ref("data");

client.on("ready", () => {
  setInterval(() => {
    userRef.once("value", (snap) => {
      const snapshot = snap.val();
      console.log("Snapshot data:", snapshot); 
      if (snapshot.status !== "aman") {
        console.log("Status tidak aman, mengirim pesan ke +", NUMBER);
        const message = `${WARNING_MESSAGE}`;
        const number = `${NUMBER}@c.us`;
        sendMessage(number, message);
      } else {
        console.log("Status aman");
      }
    });
  }, 1000); 
});

const sendMessage = (number, message) => {
  client.isRegisteredUser(number).then((isRegistered) => {
    if (isRegistered) {
      client.sendMessage(number, message).then((response) => {
        console.log("Pesan berhasil dikirim:", response);
      }).catch((err) => {
        console.error("Pesan gagal dikirim:", err);
      });
    } else {
      console.error("Nomor tidak terdaftar:", number);
    }
  }).catch((err) => {
    console.error("Gagal cek registrasi:", err);
  });
};