//Require pulls from github repositories
var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(Tucker)|(tucker)|(King)|(king)|(punk)|(rock)|(apple)|(reddit)|(dark)|(souls)|(movie)/
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
    tuckQuoteBank = ["You don't own me",
                  "Did you guys know popcorn is synthetic?",
                  "You don't own me.",
                  "Build the wall!",
                  "CAN YOU DIG IT?!?",
                  "Do it.",
                  "When I was 3 months old, I planted my first apple tree. " +
                  "Its name was Pip.",
                  "I'm going to watch Assassin's Creed tonite if you ladies want to join",
                  "I placed a baby seaturtle in the Cook Out deep fryer",
                  "Meep meep",
                  "Don't go to Chuy's. It's a horrible place to dine.",
                  "Hey, brother",
                  "You won't",
                  "Thin Mint Day is my favorite day of the year!",
                  "Tuckstreet's back. Alright!",
                  "Breath of the Wild didn't live up to the hype.",
                  "http://www.huffingtonpost.com/entry/baby-sloth-photos-costa-rica_us_572d01d3e4b016f37895df3f"];

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
