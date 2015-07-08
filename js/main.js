console.log('loaded');
//console.log(cards.length);
//console.log(shuffle());

// icebox
// jquery load and organize scripts better
// organize and minify all code with codekit

// gameStarted should be false at the beginning
//   of the game

var gameStarted = false;
// scores (how many cards each player has)
var p1Cards = 0;
var p2Cards = 0;
// after shuffling deal 1 card to each player
var p1Hand = [];
var p2Hand = [];
// store what card was played from deck
var p1PlayedCard = null;
var p2PlayedCard = null;
// store and compare card values to see who wins turn
var card1Value;
var card2Value;

// grab the interface items and populate them with
//   the proper starting data
$('#p1Score').text(p1Cards);
$('#p2Score').text(p2Cards);
// initially hide the stop game button
$('#btnStop').hide();

var compareCards = function(card1, card2) {
  'use strict';
  console.log('c1:' + card1 + 'c2:' + card2);
  // find if card1 is 3 letters long
  if (card1.length === 3) {
    // in D10 grabs the string '10' and convert it to a number
    card1Value = parseInt(card1.substr(1, 3)); // gets number
    // console.log(typeof card1Value);
  } else {
    card1Value = 10; // gets number
  }
  if (card2.length === 3) {
    // in D10 grabs the string '10' and convert it to a number
    card2Value = parseInt(card2.substr(1, 3)); // gets number
    // console.log(typeof card1Value);
  } else {
    card2Value = 10; // gets number
  }
  // now that you have the 2 values find out which is greater and return
  // the winner
  if (card1Value > card2Value) {
    p1Cards = p1Cards + 2;
    p2Cards = p2Cards - 2;
    return 'Player 1 Wins';
  } else if (card2Value > card1Value) {
    p1Cards = p1Cards - 2;
    p2Cards = p2Cards + 2;
    return 'Player 2 Wins';
  }

  // once you figure out what card value is greater
  //   set both card values to null for next card
  //   battle
  p1PlayedCard = null;
  p2PlayedCard = null;
};

var playHand = function() {
  'use strict';
  // which player requested a card
  if (this.id === "p1Deck") {
    // take the top card
    p1PlayedCard = p1Hand.shift();
    // console.log($('#p1Pile').text());
    // remove all classes
    // remove all classes and
    //  add card west classes plus the dynamic class
    $('#p1Pile').removeClass().addClass("card west " + p1PlayedCard);
  } else {
    p2PlayedCard = p1Hand.shift();
    $('#p2Pile').removeClass().addClass("card west " + p2PlayedCard);
  }
  // when we have 2 cards to compare, call the compare fn
  if (p1PlayedCard !== null && p2PlayedCard !== null) {
    compareCards(p1PlayedCard, p2PlayedCard);
  }
};

// grab the player decks
$('#p1Deck').on('click', playHand);
$('#p2Deck').on('click', playHand);

// stop the game
var stopGame = function() {
  'use strict';
  // set globals back to starting values
  gameStarted = false;
  p1Cards = 0;
  p2Cards = 0;
  p1Hand = [];
  p2Hand = [];
  $('#p1Score').text(p1Hand.length);
  $('#p2Score').text(p2Hand.length);

  $('.status').text('Game Over');
  $('#btnStop').hide();
  $('#btnStart').show();
};

var dealOutHand = function() {
  'use strict';
  $('.status').text('Shuffling cards...');
  // shuffle the deck
  var newHand = shuffle();

  // loop through the deck
  // 26 is hardcoded to represent half the deck
  for (var i = 0; i < 26; i++) {
    // push a card into players hand
    // while simultaneously removing the card
    // from the new Hand
    p1Hand.push(newHand.pop());
    p2Hand.push(newHand.pop());
  }
  // update the player card counts
  $('#p1Score').text(p1Hand.length);
  $('#p2Score').text(p2Hand.length);
  $('.status').text('Cards Dealt');
};
var startGame = function(evt) {
  'use strict';
  $('.status').text('Game Started');
  $('#btnStart').hide();
  $('#btnStop').show();

  // event listeners
  $('#btnStop').on('click', stopGame);
  // test out all cards
  //console.log(cards);
  // set up a delay to mimick real game
  //setTimeout(dealOutHand, 3000);
  dealOutHand();
};


// begin game
// gameStarted = true;
// shuffle cards

// take one card at a time from the shuffled
//  deck
// alternate giving pushing each card into
//  each players hand (player array object)
// populate the interface with length of array
// each should be equal to 26

// begin game
var btnStart = $('#btnStart').on('click', startGame);
