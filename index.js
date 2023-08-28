var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

//serving static files
app.use(express.static('public'));

//routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let responseObj = {};
app.get('/api/timestamp/:input', function (req, res)  {
  let input = req.params.input;
  if (input.includes('-')){
    responseObj['unix'] = new Date(input).getTime();
    responseObj['utc'] = new Date(input).toUTCString();
  } else {
    input = parseInt(input)
    responseObj['unix'] = new Date(input).getTime();
  }

  if (!responseObj['unix'] || !responseObj['utc']){
    res.json({error: 'Invalid Date'})
  }  
  res.json(responseObj);
});


app.get('/api/timestamp', function (req, res) {
  responseObj['unix'] = new Date().getTime()
  responseObj['utc'] = new Date().toUTCString()

  res.json(responseObj)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
