const express = require("express");
const router = express.Router();
const { firebaseadmin } = require("../config");
const db = firebaseadmin.firestore();
router.get("/add", (req, res) => {
  console.time("a");
  for (i = 9501; i <= 10000; i++) {
    let myKeyRef = db.collection("customer").doc();
    batch.set(myKeyRef, {
      id: i,
      email: `abcd${i}@gmail.com`,
      password: `password${i}`,
      name: `abbas${i}`
    });
  }
  batch.commit().then(function() {
    console.timeEnd("a");
    res.send({
      fulfillmentText: `Success!!!`
    });
  });
});
module.exports = router;
