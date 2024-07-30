const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const scanEnv = require("scan-env");
const envFile = '.env';
const scanResult = scanEnv();
const envPath = path.resolve(__dirname, '..', envFile);
if (fs.existsSync(envPath)) {
  if (!scanResult) {
    console.error("Mohon isi environment variable dengan benar");
    process.exit(1);
  }
  dotenv.config({ path: envPath });
} else {
  console.error(`File ${envFile} tidak ditemukan!`);
  process.exit(1);
}