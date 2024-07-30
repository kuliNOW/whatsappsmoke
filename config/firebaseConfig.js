require("./envConfig");
const { DATABASEURL, AUTHDOMAIN, ENV_DEV, ENV_BOT } = process.env;
const firebaseAdmin = require("firebase-admin");
let ServiceAccount = require("./secret.json");
let isempty = false;

const initFirebase = (env) => {
  for (const key in ServiceAccount) {
    if (ServiceAccount[key] === "") {
      isempty = true;
    }
  }
  
  if (isempty) {
    console.log("Mohon isi file secret.json dengan benar");
    process.exit(1);
  }

  const appEnv = env === ENV_DEV ? ENV_BOT : ENV_DEV;
  if (appEnv === ENV_DEV) {
    return firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(ServiceAccount),
        databaseURL: DATABASEURL,
        authDomain: AUTHDOMAIN,
      },
      appEnv
    );
  } else {
    return firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(ServiceAccount),
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