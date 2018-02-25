require('dotenv').config();


// Reddit bot - Front End

// Libraries

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const comment_gap = "\n\n&nbsp\;\n\n";
const bot_signature = comment_gap + '^^I\'m ^^a ^^bot.^bleep^bloop';
const horizontal_rule = "\n***\n";


// Imported internal modules
var Roller = require('./roller');
var Sanitiser = require('./sanitiser');
var Formatter = require('./formatter');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'clue-bot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'testingground4bots',
    results: 20
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {

    var re = new RegExp(/^clue-bot.roll\(((easy|medium|hard|elite|master))\);$/i);
    var input = comment.body;


    // Temporary status
    var status = true;

    if(re.test(input)){
    	var match = re.exec(input);
    	var level = match[1].toLowerCase();

    	if(level !== "hard"){
            status = false;
    	}

        level = 'hard';

        // Initiate roller instance
    	var roller = new Roller(level);

        // Roll and Sanitise data
    	Sanitiser(roller.roll()).then(function(data){

            // Format response
            var output = Formatter(data);

            if(status === false){
                output = "\*Other clues coming soon! Here is a hard casket!\*"
                        + horizontal_rule + output;
            }
            comment.reply(output + bot_signature);
        });
    }
});
