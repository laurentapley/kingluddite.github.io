console.log('loaded');
//console.log(cards.length);
//console.log(shuffle());

// icebox
// jquery load and organize scripts better
// organize and minify all code with codekit

// gameStarted should be false at the beginning
//   of the game

var gameStarted = false;
var p1Cards = 0;
var p2Cards = 0;
var p1Hand = [];
var p2Hand = [];

// grab the interface items and populate them with
//   the proper starting data
$('#p1Score').text(p1Cards);
$('#p2Score').text(p2Cards);
// initially hide the stop game button
$('#btnStop').hide();

var playHand = function() {
  // take the top card
  var playedCard = p1Hand.shift();
  // console.log($('#p1Pile').text());
  // remove all classes
  // which player requested a card
  if (this.id === "p1Deck") {
    // remove all classes and
    //  add card west classes plus the dynamic class
    $('#p1Pile').removeClass().addClass("card west " + playedCard);
  } else {
    $('#p2Pile').removeClass().addClass("card west " + playedCard);
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
