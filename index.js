// where your node app starts

// init project
//instalisasi proyek
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// microservice stamp
app.get("/api/:date?", (req,res)=>{
  //mengambil parameter tanggal(date) dari URL
  const dateParam = req.params.date;
  let date;

  //jika tidak ada parameter tanggal gunakan tanggal sekarang
  if(!dateParam){
    date = new Date();
  }else{
    //Jika tidak ada parameter, coba pasring sbg tanggal
    if(isNaN(dateParam)){
      date = new Date(dateParam);

    }else{
      date = new Date(parseInt(dateParam))
    }
  }

  //jika tgl tdk valid
  if(isNaN(date)){
    return res.json({error: "Invalid Date" });
  }

  //kirim response dengan format yang diminta
  res.json({
    unix: date.getTime(), //waktu dalam milidetik
    utc: date.toUTCString()//waktu utc
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});