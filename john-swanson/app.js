// app.js - John Swanson horoscope service - horoscope written by the
// brilliant John Swanson of developerWorks fame.
var express = require('express');
app = express();
port = 8080;

const serviceName = 'John Swanson';
const css = 'color: blue;';
var horoscopeText;

getHoroscope = function(req, res){
  console.log(`  Getting horoscope for ${req.params.sign}`);
  if (req.params.sign != 'gemini')
    horoscopeText = 'The stars say to avoid Geminis at all costs today.';
  else
    horoscopeText = 'The stars say you will feel lonely and abandoned today.';

  res.set({'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers':
           'Origin, X-Requested-With, Content-Type, Accept',
           'Cache-Control': 'no-cache, no-store, must-revalidate'})
     .json({'serviceName': serviceName,
            'horoscopeText': horoscopeText,
            'css': css});
};

app.route('/horoscope/:sign')
  .get(getHoroscope);

app.listen(port);
console.log(`John Swanson astrological service running on port ${port}...`);
