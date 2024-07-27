const { Client, LocalAuth } = require("whatsapp-web.js");
const db = require("../model/data");
const path = require("path");
const sessionCfg = path.join(__dirname, "session");

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: sessionCfg,
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
let reply;

const handleMsg = async (message) => {
  const command = message.body.toLowerCase();
  switch (command) {
    case "cek_all": {
      try {
        reply = await db.getAll();
      } catch (error) {
        reply = "Terjadi kesalahan saat semua mengambil data.";
      }
      break;
    }
    case "cek_lastupdate": {
      try {
        reply = await db.getTime();
      } catch (error) {
        reply = "Terjadi kesalahan saat mengambil update terakhir.";
      }
      break;
    }
    case "cek_kelembapan": {
      try {
        reply = await db.getKelembapan();
      } catch (error) {
        reply = "Terjadi kesalahan saat mengambil kelembapan terakhir.";
      }
      break;
    }
    case "cek_kondisi": {
      try {
        reply = await db.getKondisi();
      } catch (error) {
        reply = "Terjadi kesalahan saat mengambil kondisi terakhir.";
      }
      break;
    }
    case "cek_status": {
      try {
        reply = await db.getStatus();
      } catch (error) {
        reply = "Terjadi kesalahan saat mengambil status terakhir.";
      }
      break;
    }
    case "cek_suhu": {
      try {
        reply = await db.getSuhu();
      } catch (error) {
        reply = "Terjadi kesalahan saat mengambil suhu terakhir.";
      }
      break;
    }
    default:
      const bantuan = `
Silahkan gunakan perintah berikut:
- cek_all - cek status semua sensor terbaru
- cek_kelembapan - cek kelembapan terbaru
- cek_suhu - cek suhu terbaru
- cek_status - cek status terbaru
- cek_kondisi - cek kondisi terbaru
- cek_lastupdate - cek update jam dan tanggal terbaru
        `;
      reply = bantuan;
      break;
  }
  message.reply(reply);
  console.log("Mengirim pesan ke", message.from);
};

module.exports = { client, handleMsg };