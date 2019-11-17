require('dotenv').config();

/*
 * Reddit bot - Front End
 * Initialise libraries
 */
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const comment_gap = "\n\n&nbsp\;\n\n";
const bot_signature = '[n]: https://www.reddit.com/message/compose/?to=clue-bot\n\n ^(I\'m a bot *bleep bloop*) | [Report a bug][n]';
const horizontal_rule = "\n***\n";

// TODO make this dynamic when other levels implemented
const hard_header = "\#\#\#Reward casket (hard)";
const table_header = "Item | Value\n----|:----:\n";

// Imported internal modules
const Roller = require('./src/roller');
const Builder = require('./src/builder');
const DB = require('./src/db_interface');

// TODO - Initialise database interface instance
// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
  userAgent: 'clue-bot',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});
console.log("Initialising snoowrap instance");
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
  subreddit: '2007scape_cluebot',
  results: 5
};

// Initialise some instances
const db = new DB();
console.log("Connected to DB.");

const roller = new Roller();
const builder = new Builder();

// Only clue level atm
const level = 'hard';

// Capture
const re = new RegExp(/^clue-bot.roll\(((easy|medium|hard|elite|master))\);$/i);
const parent_re = new RegExp(/^t3_\w+$/i);
const activation_re = new RegExp(/^.*?\$cb.*?$/i);

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

function getParent(comment) {
  /**
   * Recursive method to get the root
   * @param comment comment object
   */
  if (parent_re.test(comment.id) || !comment.parent_id) { return comment; }

  return new Promise((resolve, reject) => {
    r.getComment(comment.parent_id).refresh().then((result) => {
      if (!result) { reject(result); }
      resolve(getParent(result));
    });
  });
}


// On comment, perform the roll
comments.on('comment', (comment) => {
  const input = comment.body;
  if(!re.test(input)) { return; }

  // Check post title has cluebot enabled
  getParent(comment).then((result) => {
    console.log("Getting submission for parent id: " + result.id);
    r.getSubmission(result.id).title.then((submission_title) => {

      if (!activation_re.test(submission_title)) { return; }
      console.log("clue-bot enabled for post: " + result.id);

      const match = re.exec(input);
      const requested_level = match[1].toLowerCase();
      const status = (requested_level === "hard");

      // Roll!
      const roll_encoding = roller.roll();
      const query = db.queryBuilder(roll_encoding, level);

      db.execute(query).then((rows) => {
        builder.processResults(rows, roller).then((result) => {
          var header = '';
          if (!status) { header = "\*Other clues coming soon! Here is a hard casket!\*  \n"; }
          header += hard_header;

          const reddit_reply = header
                               + horizontal_rule
                               + table_header
                               + result
                               + horizontal_rule
                               + bot_signature;

          console.log(reddit_reply);
          comment.reply(reddit_reply);
        }).catch(error => console.error(error.message));
      });
    });
  }).catch(error => console.error(error));
});
