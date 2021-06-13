const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");

app.use(cors({ optionSucessStatus: 200 }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  let date_string = req.params.date;
  let date;
  let finalObj = {};
  if (!date_string) {
    finalObj.unix = new Date().getTime();
    finalObj.utc = new Date().toUTCString();
  } else if (parseInt(date_string) < 10000) {
    date = new Date(date_string);
    finalObj.unix = new Date(date).getTime();
    finalObj.utc = new Date(date).toUTCString();
  } else {
    date = new Date(Number(date_string));
    const utcDate = new Date(date).toUTCString();
    const unixDate = new Date(date).getTime();
    finalObj.unix = unixDate;
    finalObj.utc = utcDate;
  }
  if (!finalObj.unix) {
    res.json({ error: "Invalid Date" });
  }
  res.json(finalObj);
});

app.listen(process.env.PORT || 5000, console.log("Started server"));
