const express = require("express");
const fetch = require("node-fetch");
const { convert } = require("convert-svg-to-png");
const { v4 } = require("uuid");

const app = express();

app.get("/snapcode", (req, res) => {
  if (req.query.snap) {
    const url = `https://app.snapchat.com/web/deeplink/snapcode?username=${req.query.snap}&type=SVG`;
    const fileName = req.query.snap + "-" + v4() + ".png";
    fetch(url)
      .then((res) => res.text())
      .then((body) => {
        const png = await convert(body);
        res.download(png);
        
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: "Missing params" });
  }
});

app.listen(3000, () => {
  console.log("Starting server at 3000");
});
