// app.js - Ominous horoscope service
var express = require('express');
app = express();
port = 8080;

const serviceName = 'Ominous';
const css = 'color: red;';
var horoscopeText;

getHoroscope = function(req, res){
  console.log(`  Getting horoscope for ${req.params.sign}`);
  if (req.params.sign == 'aries')
    horoscopeText = 'The stars won\'t say exactly what will happen today, \
but they suggest you say goodbye to your friends and loved ones.';
  else if (req.params.sign == 'taurus')
    horoscopeText = 'The stars suggest you leave town until \
the whole thing blows over.';
  else if (req.params.sign == 'gemini')
    horoscopeText = 'The stars stand corrected: turns out your \
irrational fears are completely justified.';
  else if (req.params.sign == 'cancer')
    horoscopeText = 'The stars say something hilarious will happen to you \
today. Keep in mind that the stars have a really mean sense of humor.';
  else if (req.params.sign == 'leo')
    horoscopeText = 'The stars say your enemies will forgive you today. \
They\'ll still press charges, but it won\'t be anything personal.';
  else if (req.params.sign == 'virgo')
    horoscopeText = 'The stars say a steamroller figures prominently \
in your future. You shouldn\'t worry, as long as you drive a \
steamroller for a living.';
  else if (req.params.sign == 'libra')
    horoscopeText = 'The stars say to stand up for yourself - today \
is no time to back down. They recommend standing up to \
someone small and unarmed.';
  else if (req.params.sign == 'scorpio')
    horoscopeText = 'The stars say you should be grateful for all the \
wonderful friends in your life. All your friends are imaginary, \
so that\'s probably not a big deal.';
  else if (req.params.sign == 'sagittarius')
    horoscopeText = 'The stars say a financial windfall could be yours \
today. The stars also rolled their eyes and said, "Yeah, right."';
  else if (req.params.sign == 'capricorn')
    horoscopeText = 'The stars say you should treat yourself to a lavish \
dinner tonight. Their exact words: "As if it were your last meal."';
  else if (req.params.sign == 'aquarius')
    horoscopeText = 'The stars say you should make a generous, \
unexpected gift to someone you barely know today. It probably won\'t \
get you out of hot water with Human Resources, but it couldn\'t hurt.';
  else if (req.params.sign == 'pisces')
    horoscopeText = 'The stars say to approach a confrontation with \
kid gloves and everything will be fine...for your opponent, who\'s \
wearing brass knuckles. ';

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
