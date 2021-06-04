const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");

app.get("/", (req,res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.get("/api/:date?", (req, res) => {
  let finalObj = {}
  if(req.params.date.includes("-")) {
    const input = req.params.date;
    finalObj.unix = new Date(input).getTime(),
    finalObj.utc = new Date(input).toUTCString()
  } else {
      const input = new Date(parseInt(req.params.date)).getTime();
      const utcDate = new Date(input).toUTCString();
      finalObj.unix = input,
      finalObj.utc = utcDate
    }

  if(!finalObj.unix) {
    res.json({ error : "Invalid Date" });
  }
  res.json(finalObj);
});


app.listen(process.env.PORT || 5000, console.log("Started server"));