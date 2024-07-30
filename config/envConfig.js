const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envFile = '.env';
const envPath = path.resolve(__dirname, '..', envFile);
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error(`File ${envFile} tidak ditemukan!`);
  process.exit(1);
}