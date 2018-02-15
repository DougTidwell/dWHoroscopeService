// app.js - Optimistic horoscope service
var express = require('express');
app = express();
port = 8080;

const serviceName = 'Optimistic';
const css = 'color: green;';
var horoscopeText;

getHoroscope = function(req, res){
  console.log(`  Getting horoscope for ${req.params.sign}`);
  if (req.params.sign == 'aries')
    horoscopeText = 'The stars suggest you talk to your friends and \
loved ones today.';
  else if (req.params.sign == 'taurus')
    horoscopeText = 'The stars say it\'s time for a vacation!';
  else if (req.params.sign == 'gemini')
    horoscopeText = 'The stars say you should put your irrational fears \
behind you and make the most of the day!';
  else if (req.params.sign == 'cancer')
    horoscopeText = 'The stars say something hilarious will happen to you \
today. Laugh hard!';
  else if (req.params.sign == 'leo')
    horoscopeText = 'The stars say your enemies will forgive you today.';
  else if (req.params.sign == 'virgo')
    horoscopeText = 'The stars say something will weigh heavily on your mind. \
Stay positive!';
  else if (req.params.sign == 'libra')
    horoscopeText = 'The stars say to stand up for yourself - today is \
no time to back down. You can do this!';
  else if (req.params.sign == 'scorpio')
    horoscopeText = 'The stars say you should be grateful for all the \
wonderful friends in your life. ';
  else if (req.params.sign == 'sagittarius')
    horoscopeText = 'The stars say a financial windfall could be yours today.';
  else if (req.params.sign == 'capricorn')
    horoscopeText = 'The stars say you should treat yourself to a lavish \
dinner tonight. You\'ve earned it!';
  else if (req.params.sign == 'aquarius')
    horoscopeText = 'The stars say you should make a generous, unexpected \
gift to someone you barely know today.';
  else if (req.params.sign == 'pisces')
    horoscopeText = 'The stars say to approach a confrontation with \
kid gloves and everything will be fine. ';

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
console.log(`Optimistic astrological service running on port ${port}...`);
