const { Client, LocalAuth } = require("whatsapp-web.js");
const path = require("path");
const shell = require("shelljs");
const { NUMBER, WARNING_MESSAGE } = require("../config/envConfig");
const { fireEnv } = require("../model/firebaseConfig");
const sessDir = "config/session";
const newsessDir = "config/botsession";
const defaultSes = path.resolve(__dirname, "..", sessDir);
const sessionCfg = path.resolve(__dirname, "..", newsessDir);

if (shell.test("-d", defaultSes)) {
  shell.rm("-rf", sessionCfg);
  shell.cp("-r", defaultSes, sessionCfg);
  console.log("Berhasil membuat botsession");
} else {
  console.error("Folder session belum ada");
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
  client.initialize();
  client.on("ready", () => {
    setInterval(() => {
      let db = fireEnv.database();
      let userRef = db.ref("data");

      userRef.once("value", (snap) => {
        const snapshot = snap.val();
        console.log(snapshot.status);
        if (snapshot.status !== "aman") {
          console.log("Status tidak aman, mengirim pesan ke +", NUMBER);
          const message = `${WARNING_MESSAGE}`;
          const number = `${NUMBER}@c.us`;
          sendMessage(number, message);
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

module.exports = {
  initializeClient,
};