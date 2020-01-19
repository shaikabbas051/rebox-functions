const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const zones = require("../zones.json");
const { firebaseadmin } = require("../config");
const db = firebaseadmin.firestore();

function converttoepoch(date) {
  let getdate = new Date(date);
  let getlocaldate = moment(getdate, 'ddd MMM D YYYY HH:mm:ss ZZ').tz('Asia/Kolkata');
  getlocaldate.set({ h: 0, m: 0, s: 0 });
  let timestamp = Math.floor(getlocaldate.valueOf() / 1000);
  return timestamp;
}
function getdays(from, to) {
  let fromtime = new Date(from);
  let totime = new Date(to);
  const diffTime = Math.abs(fromtime - totime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}
router.post("/allwastestats", (req, res) => {
  db.collection("collectionLists")
    .doc("AllZones")
    .get()
    .then(snapshot => {
      let zoneslist = snapshot.data().listPath;
      let data = {
        segregated: 0,
        nonsegregated: 0,
        relocated: 0,
        denied: 0,
        doorclosed: 0
      };
      let count = 0;
      zoneslist.forEach((zones, i) => {
        db.collection(zones)
          .where("date", ">=", 1575158400)
          .where("date", "<=", 1577664000)
          .get()
          .then(zonesnap => {
            zonesnap.forEach(item => {
              if (item.data()) {
                let obj = item.data();
                data.segregated += obj.segregated ? obj.segregated : 0;
                data.nonsegregated += obj.nonsegregated ? obj.nonsegregated : 0;
                data.denied += obj.denied ? obj.denied : 0;
                data.relocated += obj.relocated ? obj.relocated : 0;
                data.doorclosed += obj.doorclosed ? obj.doorclosed : 0;
              }
            });
            if (count == zoneslist.length - 1) {
              res.send(data);
            }
            count += 1;
          })
          .catch(err => res.send(`${err} failed at ${i}`));
      });
    })
    .catch(err => res.send(err));
});
router.post("/zonewastestats", async (req, res) => {
  let fromtimestamp = converttoepoch(req.body.fromdate);
  let totimestamp = converttoepoch(req.body.todate);
  console.log(fromtimestamp);
  console.log(totimestamp);
  let diffDays = getdays(req.body.fromdate, req.body.todate);
  let zoneIndex = zones.findIndex(x => x.key === req.body.zone);
  let circles = zones[zoneIndex]["circle"].map(item => {
    return {
      label: item["label"],
      key: item["key"]
    }
  });
  Promise.all(
    circles.map(item => db.collection(`wasteStats/${req.body.zone}/${item.key}`).where("date", ">=", fromtimestamp).where("date", "<=", totimestamp).get())
  ).then(responsearray => {
    let aggregateddata = {
      segregated: 0,
      nonsegregated: 0,
      relocated: 0,
      denied: 0,
      doorclosed: 0
    };
    let tabledata = []
    responsearray.map((circledata, i) => {
      let circleresult = {};
      circledata.forEach(warddata => {
        let obj = warddata.data();
        aggregateddata.segregated += obj.segregated ? obj.segregated : 0;
        aggregateddata.nonsegregated += obj.nonsegregated ? obj.nonsegregated : 0;
        aggregateddata.denied += obj.denied ? obj.denied : 0;
        aggregateddata.relocated += obj.relocated ? obj.relocated : 0;
        aggregateddata.doorclosed += obj.doorclosed ? obj.doorclosed : 0;
        if (circleresult.segregated) {
          circleresult.segregated += obj.segregated ? obj.segregated : 0;
          circleresult.nonsegregated += obj.nonsegregated ? obj.nonsegregated : 0;
          circleresult.denied += obj.denied ? obj.denied : 0;
          circleresult.relocated += obj.relocated ? obj.relocated : 0;
          circleresult.doorclosed += obj.doorclosed ? obj.doorclosed : 0;
        } else {
          circleresult.segregated = obj.segregated ? obj.segregated : 0;
          circleresult.nonsegregated = obj.nonsegregated ? obj.nonsegregated : 0;
          circleresult.denied = obj.denied ? obj.denied : 0;
          circleresult.relocated = obj.relocated ? obj.relocated : 0;
          circleresult.doorclosed = obj.doorclosed ? obj.doorclosed : 0;
          circleresult.circle = circles[i]["label"];
          circleresult.zone = zones[zoneIndex]["label"];
        }
        console.log('single');
      })
      tabledata.push(circleresult);
    })
    aggregateddata.totalHH = 80;
    aggregateddata.covered = aggregateddata.segregated + aggregateddata.nonsegregated + aggregateddata.denied + aggregateddata.relocated + aggregateddata.doorclosed
    aggregateddata.notcovered = (aggregateddata.totalHH * diffDays) - aggregateddata.covered;
    let finaldata = {
      aggregateddata: aggregateddata,
      tabledata: tabledata
    }
    console.log('all');
    res.send(finaldata);
  }).catch(err => { console.group(err); res.send(err) });

});
router.post("/circlewastestats", (req, res) => {
  let fromtimestamp = converttoepoch(req.body.fromdate);
  let totimestamp = converttoepoch(req.body.todate);
  console.log(fromtimestamp);
  console.log(totimestamp);
  let diffDays = getdays(req.body.fromdate, req.body.todate);
  let data = {
    segregated: 0,
    nonsegregated: 0,
    relocated: 0,
    denied: 0,
    doorclosed: 0
  };
  let tabledata = {
  }
  // let count = 0;
  db.collection('wasteStats').doc(req.body.zone).collection(req.body.circle)
    .where("date", ">=", fromtimestamp)
    .where("date", "<=", totimestamp)
    .get()
    .then(circlesnap => {
      circlesnap.forEach(item => {
        if (item.data()) {
          let obj = item.data();
          data.segregated += obj.segregated ? obj.segregated : 0;
          data.nonsegregated += obj.nonsegregated ? obj.nonsegregated : 0;
          data.denied += obj.denied ? obj.denied : 0;
          data.relocated += obj.relocated ? obj.relocated : 0;
          data.doorclosed += obj.doorclosed ? obj.doorclosed : 0;
          //tabledata
          if (tabledata[obj.ward]) {
            tabledata[obj.ward].segregated += obj.segregated ? obj.segregated : 0;
            tabledata[obj.ward].nonsegregated += obj.nonsegregated ? obj.nonsegregated : 0;
            tabledata[obj.ward].denied += obj.denied ? obj.denied : 0;
            tabledata[obj.ward].relocated += obj.relocated ? obj.relocated : 0;
            tabledata[obj.ward].doorclosed += obj.doorclosed ? obj.doorclosed : 0;
          } else {
            tabledata[obj.ward] = {}
            tabledata[obj.ward].segregated = obj.segregated ? obj.segregated : 0;
            tabledata[obj.ward].nonsegregated = obj.nonsegregated ? obj.nonsegregated : 0;
            tabledata[obj.ward].denied = obj.denied ? obj.denied : 0;
            tabledata[obj.ward].relocated = obj.relocated ? obj.relocated : 0;
            tabledata[obj.ward].doorclosed = obj.doorclosed ? obj.doorclosed : 0;
            tabledata[obj.ward].circle = req.body.circle;
            tabledata[obj.ward].ward = obj.ward;
          }
        }
        // count = count + 1;
        console.log('single');
      });
      // if (count == circlesnap.size) {

      console.log('all');
      //calculate covered and not covered----remove the hardcorded totalHH
      data.totalHH = 80;
      data.covered = data.segregated + data.nonsegregated + data.denied + data.relocated + data.doorclosed
      data.notcovered = (data.totalHH * diffDays) - data.covered;
      //prepare data for table in UI
      let finaltabledata = Object.keys(tabledata).map(item => {
        return tabledata[item];
      })
      //final json to be passed
      let finaldata = {
        overalldata: data,
        tabledata: finaltabledata
      }
      res.send(finaldata);
      // }
    })
    .catch(err => res.send(`${err} failed`));
});
router.post("/wardwastestats", (req, res) => {
  let fromtimestamp = converttoepoch(req.body.fromdate);
  let totimestamp = converttoepoch(req.body.todate);
  console.log(fromtimestamp);
  console.log(totimestamp);
  let diffDays = getdays(req.body.fromdate, req.body.todate);
  let data = {
    segregated: 0,
    nonsegregated: 0,
    relocated: 0,
    denied: 0,
    doorclosed: 0,
  };
  db.collection('wasteStats').doc(req.body.zone).collection(req.body.circle)
    .where("date", ">=", fromtimestamp)
    .where("date", "<=", totimestamp)
    .where("ward", "==", req.body.ward)
    .get()
    .then(circlesnap => {
      // let count = 0;
      circlesnap.forEach(item => {
        if (item.data()) {
          let obj = item.data();
          data.segregated += obj.segregated ? obj.segregated : 0;
          data.nonsegregated += obj.nonsegregated ? obj.nonsegregated : 0;
          data.denied += obj.denied ? obj.denied : 0;
          data.relocated += obj.relocated ? obj.relocated : 0;
          data.doorclosed += obj.doorclosed ? obj.doorclosed : 0;
        }
        // count = count + 1;
        console.log('single')
      });
      // if (count == circlesnap.size) {
      console.log('all')
      data.totalHH = 80;
      data.covered = data.segregated + data.nonsegregated + data.denied + data.relocated + data.doorclosed
      data.notcovered = (data.totalHH * diffDays) - data.covered;
      res.send(data);
      // }

    })
    .catch(err => res.send(`${err} failed`));
});

module.exports = router;
