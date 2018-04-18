//Require pulls from github repositories
var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(Tucker)|(King)|(punk)|(rock)|(dark)|(souls)/
      botRegexb = /(shut up)|(Shut up)|(SHUT UP)/;

  //Tuck-messages
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(true);
    this.res.end();
  //Cool faces
  }else if(request.text && botRegexb.test(request.text)) {
    this.res.writeHead(200);
    postMessage(false);
    this.res.end();
  }else {
    console.log("You don't own me");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(flag) {
  var botResponse, options, body, botReq, tuckQuoteBank;

  if(flag==true){
    tuckQuoteBank = ["I can't believe it's not popcorn!",
                  "I'm going to watch The Spongebob Movie tonite if you ladies want to join",
                  "Chuy's is better than Taco Mama.",
                  "You won't.",
                  "Thin Mint Day is my favorite day of the year!",
                  "Tuckstreet's back. Alright!",
                  "Mario Odyssey is no Super Mario Bruddas 2.",
                  "Waka waka.",
                  "By god, that new Fall Out Boy record is ecstasy",
                  "*Toad noises",
                  "We have lots of Cardi B at Oz.",
                  "Bustin' makes me feel good.",
                  "Kubrick is a chump and Michael Bay made the best film of all time."];

    var tuckQuote = tuckQuoteBank[Math.floor(Math.random() * tuckQuoteBank.length)];

    botResponse = tuckQuote;
  }

  else if(flag==false){
    botResponse = cool();
  }

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
  console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
