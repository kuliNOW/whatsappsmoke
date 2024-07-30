const { fireEnv } = require('../config/firebaseConfig');
let db = fireEnv.database();
let userRef = db.ref("data");

const data = { 
  getAll() {
    return new Promise((resolve, reject) => {
      userRef.once("value", function (snap) {
        const snapshot = snap.val();
        const message = `
Data:
- asap ${snapshot.asap}
- kelembapan ${snapshot.kelembapan}%
- suhu ${snapshot.suhu}°C
- status ${snapshot.status}
- kondisi ${snapshot.kondisi}
- diupdate ${snapshot.diupdate}
        `;
        resolve(message);
      }, error => {
        reject(error);
      });
    });
  },
  getTime() {
    return new Promise((resolve, reject) => {
      userRef.once("value", function (snap) {
        const snapshot = snap.val();
        const message = `
Data:
- terakhir diupdate ${snapshot.diupdate}
        `;
        resolve(message);
      }, error => {
        reject(error);
      });
    });
  },
  getKelembapan() {
    return new Promise((resolve, reject) => {
      userRef.once("value", function (snap) {
        const snapshot = snap.val();
        const message = `
Data:
- kelembapan terupdate ${snapshot.kelembapan}%
        `;
        resolve(message);
      }, error => {
        reject(error);
      });
    });
  },
  getKondisi() {
    return new Promise((resolve, reject) => {
      userRef.once("value", function (snap) {
        const snapshot = snap.val();
        const message = `
Data:
- kondisi terupdate ${snapshot.kondisi}
        `;
        resolve(message);
      }, error => {
        reject(error);
      });
    });
  },
  getStatus() {
    return new Promise((resolve, reject) => {
      userRef.once("value", function (snap) {
        const snapshot = snap.val();
        const message = `
Data:
- status terupdate ${snapshot.status}
        `;
        resolve(message);
      }, error => {
        reject(error);
      });
    });
  },
  getSuhu() {
    return new Promise((resolve, reject) => {
      userRef.once("value", function (snap) {
        const snapshot = snap.val();
        const message = `
Data:
- suhu terupdate ${snapshot.suhu}°C
        `;
        resolve(message);
      }, error => {
        reject(error);
      });
    });
  },
};

module.exports = data;