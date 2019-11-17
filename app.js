require('dotenv').config();

/*
 * Reddit bot - Front End
 * Initialise libraries
 */
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const comment_gap = "\n\n&nbsp\;\n\n";
const bot_signature = '[b]: https://www.reddit.com/message/compose/?to=clue-bot\n\n'
                      + '[s]: https://www.reddit.com/r/2007scape_cluebot/comments/dxjmwu/suggestions_for_cluebot\n\n'
                      + '^(I\'m a bot *bleep bloop*) | [Report a bug][b] | [Leave a suggestion][s]';
const horizontal_rule = "\n***\n";

const hard_header = "\#\#\#Reward casket (hard)";
const table_header = "Item | Value\n----|:----:\n";

// Imported internal modules
const Roller = require('./src/roller');
const Builder = require('./src/builder');
const DB = require('./src/db_interface');
const ActivationWarning = require('./src/errors/activationWarning');

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

// comment stream for both 2007scape & 2007scape_cluebot
const streamOpts = {
  subreddit: '2007scape_cluebot+2007scape',
  results: 15
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
   * Recursive method to traverse tree and get the root
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

  const roll_encoding = roller.roll();

  getParent(comment)
    .then((result) => {
      console.log("Getting submission for parent id: " + result.id);
      return r.getSubmission(result.id).fetch();
    })
    .then(root => {
      console.log("comment ID: " + root.id);
      if (!activation_re.test(root.title)) { throw new ActivationWarning("clue-bot not enabled for root ID: " + comment.id); }
      console.log("clue-bot enabled for root ID: " + root.id);

      const query = db.queryBuilder(roll_encoding, level);
      return db.execute(query);
    })
    .then(rows => builder.processResults(rows, roller))
    .then(result => {
      var header = '';
      const match = re.exec(input);
      const requested_level = match[1].toLowerCase();
      if (requested_level !== "hard") { header = "\*Other clues coming soon! Here is a hard casket!\*  \n"; }
      header += hard_header;

      const reddit_reply = header
                            + horizontal_rule
                            + table_header
                            + result
                            + horizontal_rule
                            + bot_signature;

      return(comment.reply(reddit_reply).id);
    })
    .then((result_id) => {
      console.log("Successful reply to comment: "
                  + comment.id + " "
                  + "reply ID: "
                  + result_id);
    })
    .catch(err => {
      if (err instanceof ActivationWarning) { console.log(err.message); }
      else { console.error(err); }
    });
});
