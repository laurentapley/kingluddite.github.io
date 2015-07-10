# PEACE
[TOC]

## WDI Project 1
* A two player game using HTML, Javascript and CSS

### Game Description
* PEACE is a card game involving two players. It is a
variation of the WAR card game but instead of the highest
card winning, the lowest card wins.
[Source](http://www.pagat.com/war/war.html)

### Rules
* The 52 card deck is evenly divided between the two players
  *(each player gets 26 cards)
* Suits are ignored in this game
* Players do not look at their card
* Cards rank as usual from low to high: 2 3 4 5 6 7 8 9 T J Q K A
* Each player plays the top card of their 26 card stack
* The players continue playing this way until 1 player has a full deck
  (56 cards). The player with all the cards is the winner of PEACE
* If a turn has each player with an equal valued card (tie), then you have PEACE
* When there is a tie, the following occurs *
  * The tied cards stay on the table and both players play the next card four
    cards of their pile face down (they are spelling the word P.E.A.C.E out
    loud) and then the fifth card face-up. The player who's card is lower wins
    and gets all the cards from the peace tie added to their pile.
    * If you don't have enough cards to complete the war, you lose.
* The game continues until one player has all the cards and wins.

### Technologies Used
* JavaScript and jQuery for the logic
* Sass to output the CSS for the game presentation
* Codekit for productivity (JSHINT) and auto browse refresh, and quick and
  painless minificiation of all js and css files. Images are also minified.
* Card Library for making working with cards (shuffling/dealing) a lot
  easier
* Custom Lodash library which was a dependency of the Card.js library
* Twitter Bootstrap for quick and easy styling while this game is in the
  development stage
* Bower - just because I wanted to play with installing things like jquery
    and normalize.css with it.
* SVG graphics - the cars are svgs so they can be easily resized without
  any pixelization
* Adobe Kuler for the color scheme

### Design Approach
* Minimalistic theme. Clean with lots of breathing room.

### Installation Instructions
```
$ git clone https://github.com/kingluddite/Peace.git
```
1. Clone to a folder on your computer
2. `$ cd peace`
3. View index.html in your browser.
4. Peace out.

### Planned Features
Once the basic logic is completed this will eventually be a game 2 players
can play in separate players. Users will log in and high scores will be kept.
This will be a mobile app for iPhone and Android and depending on I am feeling
wacky, I must may try to make this work on a Blackberry as well.
I envision a SPA (Single Page Application) using either the MEAN stack or
Meteor JS.



