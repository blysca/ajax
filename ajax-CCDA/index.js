const express = require('express'),
  app = express(),
  request = require('request'),
  url = 'https://api.coinmarketcap.com/v1/ticker/';
app.use(express.static(__dirname + '/public/'));

app.get('/load', function (req, res) {
  request(url, function (error, response, body) {
    let holder = [],
      data = JSON.parse(body);

    for (let i = 0; i < data.length; i++) {
      holder.push(data[i].id);
    }

    res.json(holder);
  });
});

app.get('/price/:cur', function (req, res) {
  console.log('req.params', req.params);
  let curValue = (req.params.cur) ? req.params.cur : 'USD';
  request(url + '?convert=' + curValue + '/', function (error, rep, body) {
    res.json(body);
  });
})

app.listen(3000)