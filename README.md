# Clue-bot  
A simple oldschool runescape clue-simulator in the form of a subreddit bot!  
This repo will be the one maintained, as it was migrated over from https://github.com/JavaLeg/reddit-bots/tree/master/clue-bot since Heroku would not let me deploy a repository with more than one app on it.  


### Overview  
Written in Node.js and deployed on Heroku (free tier). There will be a lot of things wrong with my app in terms of structuring and specifically the async/callback stuff that I'm completely new to.  

I used `Snoowrap` and `Snoostorm` for the front-end of the Reddit bot which was very straightforward and easy to use. The back-end however, was definitely a lot trickier and trying to get the HTTP requests with `request` in an async manner (`q` promises) ate a lot of time.  

Currently all the clue items are stored in program memory, and I did have a look at MongoDB being a viable solution to deploy on Heroku via MLab though that will be in the future as the free-tier does not support many add-ons.  

FREE-TIER also means that the bot will only be running 18 hours a day.


### Usage  
You can try it out in the [2007scape](https://www.reddit.com/r/2007scape/) subreddit.  

Invoke the bot on a specific level:

`clue-bot(hard);`  
`clue-bot(easy);`



