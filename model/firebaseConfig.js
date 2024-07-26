require('./envConfig');
const { DATABASEURL, AUTHDOMAIN, ENV1, ENV2 } = process.env;
const firebaseAdmin = require('firebase-admin');
let key = require("../key/secret.json");

const devMode = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(key),
    databaseURL: DATABASEURL,
    authDomain: AUTHDOMAIN
}, ENV1);

const botMode = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(key),
    databaseURL: DATABASEURL,
    authDomain: AUTHDOMAIN
}, ENV2);

const env = process.env.NODE_ENV || ENV2;
module.exports = {
    fireEnv: env === ENV1 ? devMode : botMode
};