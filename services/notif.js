const { Client, LocalAuth } = require("whatsapp-web.js");
const { NUMBER, WARNING_MESSAGE } = require("../config/envConfig");
const { fireEnv } = require("../config/firebaseConfig");
const { botsessionChecker } = require("./session");
const sessionCfg = botsessionChecker();

if (!sessionCfg) {
  console.error("Folder session tidak ditemukan!");
  process.exit(1);
}

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: sessionCfg,
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

const initializeClient = () => {
  client.on("ready", () => {
    setInterval(() => {
      let db = fireEnv.database();
      let userRef = db.ref("data");

      userRef.once("value", (snap) => {
        const snapshot = snap.val();
        if (snapshot.status !== "aman") {
          console.log("Status tidak aman, mengirim pesan ke +", NUMBER);
          const message = `${WARNING_MESSAGE}`;
          const number = `${NUMBER}@c.us`;
          sendMessage(number, message);
        } else {
          console.log(snapshot.status);
        }
      });
    }, 1000);
  });
};

const sendMessage = (number, message) => {
  client
    .isRegisteredUser(number)
    .then((isRegistered) => {
      if (isRegistered) {
        client
          .sendMessage(number, message)
          .then((response) => {
            console.log("Pesan berhasil dikirim:", response);
          })
          .catch((err) => {
            console.error("Pesan gagal dikirim:", err);
          });
      } else {
        console.error("Nomor tidak terdaftar:", number);
      }
    })
    .catch((err) => {
      console.error("Gagal cek registrasi:", err);
    });
};

module.exports = { client, initializeClient };