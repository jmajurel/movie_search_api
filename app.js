var express = require('express');
var request = require('request');

var app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

var data = {};

app.get('/', (req, res) => {
  res.render("home", {results: data});
});

app.get('/result', (req, res) => {

  var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + req.query.movie_name;
  request(url, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.redirect('home');
    } else {
      console.log("Something went wrong with the API req"); 
    }
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
