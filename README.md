# clue-bot
A simple oldschool runescape clue reward simulator in the form of a subreddit bot!


### Usage
Enable clue-bot to listen to threads by adding the `$cb` keyword to the title:

![Activation](misc/activate.png?raw=true)  


Simply comment the specific invokation call and the bot will reply after a few seconds (remember to refresh the page)  
You can try it out in the official community subreddit [2007scape](https://www.reddit.com/r/2007scape/) or the testing grounds [2007scape_cluebot](https://www.reddit.com/r/2007scape_cluebot/).



Invoke the bot on a specific level:

`clue-bot(hard);`  
`clue-bot(easy);`


### WIP
Only hard clues are implemented so far. It took some time to find a decent item-to-ID for usage with the GE API, and even then it was outdated.
The items_ID.JSON file is in the repository and was most likely made around mid-2016 and the game has obviously progressed a lot since then so some things will have to be manually added.


#### Examples

![Example roll](misc/eg.jpg?raw=true)  
![Example roll 2](misc/eg2.jpg?raw=true)
