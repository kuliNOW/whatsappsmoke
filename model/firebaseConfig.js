require("./envConfig");
const { DATABASEURL, AUTHDOMAIN, ENV_DEV, ENV_BOT } = process.env;
const firebaseAdmin = require("firebase-admin");
let key = require("../key/secret.json");

const initFirebase = (env) => {
  const appEnv = env === ENV_DEV ? ENV_BOT : ENV_DEV;
  if (appEnv === ENV_DEV) {
    return firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(key),
        databaseURL: DATABASEURL,
        authDomain: AUTHDOMAIN,
      },
      appEnv
    );
  } else {
    return firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(key),
        databaseURL: DATABASEURL,
        authDomain: AUTHDOMAIN,
      },
      appEnv
    );
  }
};

const env = process.env.NODE_ENV;

module.exports = {
  fireEnv: initFirebase(env),
};