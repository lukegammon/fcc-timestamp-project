const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");

app.get("/api/:date", (req, res) => {
  if(req.params.date.includes("-")) {
    [year, month, day] = req.params.date.split("-");
    console.log(year,month,day);
    const utcDate = new Date(year, month, day).toUTCString();
    console.log(utcDate);
    res.send({
      unix: Date.parse(utcDate),
      utc: utcDate
    });
  } else {
    const utcDate = new Date(parseInt(req.params.date)).toUTCString();
    res.send( {
      unix: req.params.date,
      utc: utcDate
    })
  }
})


app.listen(process.env.PORT || 5000, console.log("Started server"));