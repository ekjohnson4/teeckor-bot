//Require pulls from github repositories
var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(Tucker)|(dark)|(souls)/
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
    tuckQuoteBank = ["Chuy's is better than Taco Mama.",
                  "Tuckstreet's back. Alright!",
                  "Supah Mario Bruddas 2! Game of tha year!",
                  "I'm going to start hosting seminars on personalizing Tinder profiles.",
                  "The new Titans trailer was #great.",
                  "Andrew Garfield was the best Spidey.",
                  "Imma let y'all finish, but Kubrick is a chump and Michael Bay made the best film of all time."];

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
