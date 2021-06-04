const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");

app.get("/", (req,res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.get("/api/:date?", (req, res) => {
  if(req.params.date.includes("-")) {
    const input = req.params.date;
    console.log(input);
    res.json({
      unix: new Date(input).getTime(),
      utc: new Date(input).toUTCString()
    });
  } else {
    const input = new Date(parseInt(req.params.date)).getTime();
    const utcDate = new Date(input).toUTCString();
    console.log(utcDate); 
    res.json( {
      unix: input,
      utc: utcDate
    })
  }
})


app.listen(process.env.PORT || 5000, console.log("Started server"));