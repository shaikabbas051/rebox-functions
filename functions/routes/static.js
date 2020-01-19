const express = require("express");
const router = express.Router();
const zones = require("../zones.json");
const moment = require("moment");
router.get("/places", (req, res) => {
    res.json(zones);
});
router.post("/date", (req, res) => {
    let d = req.body.date;
    var m = moment(d, 'ddd MMM D YYYY HH:mm:ss ZZ');
    m.set({ h: 0, m: 0, s: 0 });
    // let newdate = m.toDate().toString();
    // console.log(newdate);
    console.log(Math.floor(m.valueOf() / 1000));

    // console.log(newdate);
    // console.log(Date(newdate));
    res.send('aa')
})
module.exports = router;