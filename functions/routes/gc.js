const express = require("express");
const router = express.Router();
const { firebaseadmin } = require("../config");
const db = firebaseadmin.firestore();
router.get("/getgc", (req, res) => {
  // const dec = admin.firestore.FieldValue.increment(-1)
  console.log("getgc");
  res.send('getgc')
  // db.collection("wasteStats/KHAIRATHABAD/GOSHAMAHAL")
  //   .where("date", ">=", 1575158400)
  //   .where("date", "<=", 1577664000)
  //   .get()
  //   .then(result => {
  //     console.log("success query");
  //     let data = {
  //       segregated: 0,
  //       nonsegregated: 0,
  //       relocated: 0,
  //       denied: 0,
  //       doorclosed: 0
  //     };
  //     result.forEach((item, i) => {
  //       console.log(i);
  //       if (item.data()) {
  //         let obj = item.data();
  //         data.segregated += obj.segregated;
  //         data.nonsegregated += obj.nonsegregated;
  //         data.denied += obj.denied ? obj.denied : 0;
  //         data.relocated += obj.relocated ? obj.relocated : 0;
  //         data.doorclosed += obj.doorclosed ? obj.doorclosed : 0;
  //         console.log("aaaaa" + i);
  //       }
  //     });
  //     console.log("sending");
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.send(err);
  //   });
});
router.get("/increment", (req, res) => {
  res.send('inc')
  // const inc = admin.firestore.FieldValue.increment(1);
  // db.collection("wasteStats/CHARMINAR/CHANDRAYANGUTTA")
  //   .doc("1575138600-BARKAS")
  //   .set({ segregated: inc, ramesh: { segregated: inc } }, { merge: true })
  //   .then(result => {
  //     res.send("done");
  //   })
  //   .catch(err => res.send(err));
});
module.exports = router;
