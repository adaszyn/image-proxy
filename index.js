const express = require("express");
const request = require("request");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const { payee, amount } = req.query;
  const requestSettings = {
    url: "https://mpc.getswish.net/qrg-swish/api/v1/prefilled",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    encoding: null,
    body: JSON.stringify({
      payee: {
        value: String(payee),
        editable: false
      },
      amount: {
        value: String(amount),
        editable: false
      },
      format: "jpg",
      size: 400
    })
  };

  request(requestSettings, function(error, response, body) {
    res.set("Content-Type", "image/jpeg");
    res.send(body);
  });
});

app.listen(port, () => console.log(`Image proxy listening on port ${port}!`));
