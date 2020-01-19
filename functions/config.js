const functions = require("firebase-functions");
const firebaseadmin = require("firebase-admin");
firebaseadmin.initializeApp(functions.config().firebase);
module.exports = {
    firebaseadmin
}