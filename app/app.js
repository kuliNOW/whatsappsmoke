const express = require('express');
const app = express();
const corss = require('../header/cors');
require('../model/envConfig');
const { PORT } = process.env;
const { run } = require('../controller/BotController');
const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; 
const path = require("path");
const fs = require('node:fs');
const folder = "model/session";
const sessionCfg = path.resolve(__dirname, folder);
try {
  if (fs.existsSync(sessionCfg)) {
    fs.rm(sessionCfg, { recursive: true }, err => {
      if (err) {
        throw err;
      }
      console.log(`Folder session berhasil dihapus`);
    });
  }
} catch (err) {
  console.error(`Gagal menghapus folder session`);
}

run();
app.use(corss);
app.listen(PORT, () => {
    console.log(`Server berjalan pada port: ${PORT}`);
});