const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const cors = require("cors");
const CallRecord = require("./models/callRecord.js");

require("dotenv").config();

const app = express();
app.use(
  express.json({
    limit: "2mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());

const client = connectDB();
console.log(client, "ok");
//-------------------------------------end Points-----------------------
app.get("/", async (req, res) => {
  res.send("OK");
});


app.get("/callrecord", (req, res) => {
  CallRecord.find({})
    .then((resp) => {
      // console.log(resp);
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    });
});

app.post("/findRecord", async (req, res) => {
  // console.log(req.body.query)
  try {
    const result = await CallRecord
      .where("callDateFrom")
      .eq(req.body.query.callDateFrom)
      .where("callDateTo")
      .eq(req.body.query.callDateTo)
      .where("phoneNumber")
      .eq(req.body.query.phoneNumber)
      .where("campaignId")
      .eq(req.body.query.campaignId)
      .where("agentId")
      .eq(req.body.query.agentId)
      .where("volunteerNumber")
      .eq(req.body.query.volunteerNumber)

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    if (res.status(500))
      res.status(500).json({ error: true, message: "Internal Server Error" });
    else if (res.status(404))
      res.status(500).json({ error: true, message: "404 error ----" });
  }
});



// ---------------------------------------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

