// app.js - Kafkaesque horoscope service
var express = require('express');
app = express();
port = 8080;

const serviceName = 'Kafkaesque';
const css = 'color: black;';
var horoscopeText;

getHoroscope = function(req, res){
  console.log(`  Getting horoscope for ${req.params.sign}`);
  if (req.params.sign == 'aries')
    horoscopeText = 'You will be arrested today. You will never be told \
the nature of the charges against you. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'taurus')
    horoscopeText = 'You will feel your father\'s disapproval keenly today. \
Pretty much like every other day. Your life will be bleak and miserable.';
  else if (req.params.sign == 'gemini')
    horoscopeText = 'After tomorrow, let\'s just say you\'ll be wearing shoes \
six at a time. Shop accordingly. Your life will be bleak and miserable.';
  else if (req.params.sign == 'cancer')
    horoscopeText = 'You will write the person you love, telling them your \
relationship will never happen. They will never write back. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'leo')
    horoscopeText = 'The excitement of finding a new form of disappointment \
will fade quickly. Your life will be bleak and miserable.';
  else if (req.params.sign == 'virgo')
    horoscopeText = 'You will have a sudden insight that will bring you \
lasting peace and contentment. Just kidding. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'libra')
    horoscopeText = 'Your lawyer will assure you that this will all be \
over soon. He is correct, but not in a good way. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'scorpio')
    horoscopeText = 'What happens today won\'t be any more bearable if \
the stars tell you about it beforehand, so let\'s leave it at that. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'sagittarius')
    horoscopeText = 'Not everybody would keep pursuing an unobtainable goal, \
but you seem to have a real flair for it. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'capricorn')
    horoscopeText = 'You will start the day with a really good cappuccino. \
Like, seriously good. But it\'ll all be downhill from there. \
Your life will be bleak and miserable.';
  else if (req.params.sign == 'aquarius')
    horoscopeText = 'You don\'t have a dog, but even if you did, it \
wouldn\'t like you. Your life will be bleak and miserable.';
  else if (req.params.sign == 'pisces')
    horoscopeText = 'Your city will have an amazing zoo, but you\'ll never \
live to see it. Your life will be bleak and miserable.';

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
console.log(`Kafkaesque astrological service running on port ${port}...`);
