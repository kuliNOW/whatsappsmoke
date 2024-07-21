const format = require("string-template")
const admin=require('firebase-admin');
var serviceAccount = require("../data/secret.json");
const locale = process.env.LOCALE || "data"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

var db=admin.database();
var data=db.ref("data");

data.once("value", (snap) => {
    const jsonData = JSON.stringify(snap.val());
    fs.writeFile(locale + "json", jsonData, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Data dari Firebas berhasil disimpan ke " + locale + ".json");
        }
    });
});

const f = (text, data = {}) => {
    const template = require("../data/" + locale + ".json")
    return format(template[text] || text, data)
}

module.exports = f