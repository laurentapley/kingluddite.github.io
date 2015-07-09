//console.log('main.js loaded');

/*==========  Icebox  ==========*/

// restart game has bugs cards need to be rest to outline
// jquery load and organize scripts better
// organize and minify all code with codekit
// when you click on the card before game starts it should not do anything
//  and currently it does

/*==========  global variables  ==========*/

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
// enable both players to end game with truce at any time
var p1Truce = false;
var p2Truce = false;
var playerTurn = 'p1';

/*==========  User Interface  ==========*/

// grab the interface items and populate them with
//   the proper starting data
$('#p1Score').text(p1Cards);
$('#p2Score').text(p2Cards);
// initially hide the stop game button
$('#btnStop').hide();
/*==========  Get Card Value  ==========*/
var getCardValue = function(card) {
  'use strict';
  var cardValue;
  if (card.length === 3) {
    // in D10 grabs the string '10' and convert it to a number
    cardValue = parseInt(card.substr(1, 3)); // gets number
    return cardValue;
    // console.log(typeof cardValue);
  } else if (card.indexOf('J') !== -1) {
    cardValue = 11; // Jacks are 11
    return cardValue;
  } else if (card.indexOf('Q') !== -1) {
    cardValue = 12; // Queens are 12
    return cardValue;
  } else if (card.indexOf('K') !== -1) {
    cardValue = 13; // Kings are 13
    return cardValue;
  } else if (card.indexOf('A') !== -1) {
    cardValue = 14; // Aces are 14
    return cardValue;
  }
};
/*==========  COMPARE CARDS  ==========*/

// grab both the cards to find out which is lower
var compareCards = function(card1, card2) {
  'use strict';
  //console.log('c1:' + card1 + 'c2:' + card2);
  // find if card1 is 3 letters long
  /*==========  Player 1's Card  ==========*/
  card1Value = getCardValue(card1);
  card2Value = getCardValue(card2);
  // if (card1.length === 3) {
  //   // in D10 grabs the string '10' and convert it to a number
  //   card1Value = parseInt(card1.substr(1, 3)); // gets number
  //   // console.log(typeof card1Value);
  // } else if (card1.indexOf('J') !== -1) {
  //   card1Value = 11; // Jacks are 11
  // } else if (card1.indexOf('Q') !== -1) {
  //   card1Value = 12; // Queens are 12
  // } else if (card1.indexOf('K') !== -1) {
  //   card1Value = 13; // Kings are 13
  // } else if (card1.indexOf('A') !== -1) {
  //   card1Value = 14; // Aces are 14
  // }

  /*==========  Player 2's Card  ==========*/

  // if (card2.length === 3) {
  //   // in D10 grabs the string '10' and convert it to a number
  //   card2Value = parseInt(card2.substr(1, 3)); // gets number
  //   // console.log(typeof card1Value);
  // } else if (card2.indexOf('J') !== -1) {
  //   card2Value = 11; // Jacks are 11
  // } else if (card2.indexOf('Q') !== -1) {
  //   card2Value = 12; // Queens are 12
  // } else if (card2.indexOf('K') !== -1) {
  //   card2Value = 13; // Kings are 13
  // } else if (card2.indexOf('A') !== -1) {
  //   card2Value = 14; // Aces are 14
  // }
  // now that you have the 2 values find out which is greater and return
  // the winner

  if (card1Value < card2Value) {
    // player 1 wins with lower value

    $('#p1Result').addClass('success').text('Winner');
    $('#p2Result').addClass('error').text('Loser');

    // populates status with win message
    return 'Player 1';
  } else if (card2Value < card1Value) {
    // player 2 wins with lower value

    $('#p2Result').addClass('success').text('Winner');
    $('#p1Result').addClass('error').text('Loser');

    return 'Player 2';
  } else {
    return 'We have a tie';
  }

  // once you figure out what card value is greater
  //   set both card values to null for next card
  //   battle
  p1PlayedCard = null;
  p2PlayedCard = null;
};

/*==========  Tie  ==========*/
var playTieHand = function(state) {
  'use strict';

  // for both players
  // grab 5 cards and test the outputs in temp arrays

  // which player requested a card
  // if (this.id === "p1Deck" && playerTurn === 'p1') {
  /*==========  Player 1  ==========*/
  // take the top 4 cards and add them to an array
  var p1TieCards = p1Hand.splice(0, 5);
  console.log(p1TieCards);
  // append 5 cards to .player-one
  $('.player-one').append('<div class="card deck">West</div><div class="card deck">West</div><div class="card deck">West</div><div class="card deck dA" >West</div>');

  var p2TieCards = p2Hand.splice(0, 5);
  $('.player-two').append('<div class="card deck">West</div><div class="card deck">West</div><div class="card deck">West</div><div class="card deck dA" >West</div>');
  console.log(p2TieCards);

  // remove all classes
  // remove all classes and
  //  add card west classes plus the dynamic class
  $('#p1Pile').removeClass().addClass("card west " + p1PlayedCard);
  playerTurn = 'p2';
  // } else if (this.id === "p2Deck" && playerTurn === 'p2') {
  /*==========  Player 2  ==========*/
  p2PlayedCard = p2Hand.shift();
  $('#p2Pile').removeClass().addClass("card west " + p2PlayedCard);
  playerTurn = 'p1';
  // } else {
  // return false;
  // }
};

/*==========  Play Hand  ==========*/
// when players click their cards, do this stuff
var playHand = function() {
  'use strict';
  console.log(playerTurn);

  // which player requested a card
  if (this.id === "p1Deck" && playerTurn === 'p1') {
    /*==========  Player 1  ==========*/
    // take the top card
    p1PlayedCard = p1Hand.shift();
    // console.log($('#p1Pile').text());
    // remove all classes
    // remove all classes and
    //  add card west classes plus the dynamic class
    $('#p1Pile').removeClass().addClass("card west " + p1PlayedCard);
    playerTurn = 'p2';
  } else if (this.id === "p2Deck" && playerTurn === 'p2') {
    /*==========  Player 2  ==========*/
    p2PlayedCard = p2Hand.shift();
    $('#p2Pile').removeClass().addClass("card west " + p2PlayedCard);
    playerTurn = 'p1';
    // only look for winner after player 2's turn
    findWinner(p1PlayedCard, p2PlayedCard);
  } else {
    return false;
  }
};

/*==========  Find a winner  ==========*/
var findWinner = function(p1PlayedCard, p2PlayedCard) {
  'use strict';
  // when we have 2 cards to compare, call the compare fn
  if (p1PlayedCard !== null && p2PlayedCard !== null) {
    var winnerMessage = compareCards(p1PlayedCard, p2PlayedCard);
    $('.status').text(winnerMessage);
    // put the cards into the winners pile
    if (winnerMessage === 'Player 1') {
      console.log('p1 wins');
      p1Hand.push(p1PlayedCard, p2PlayedCard);
      // set both played hands to null
      p1PlayedCard = null;
      p2PlayedCard = null;
    } else if (winnerMessage === 'Player 2') {
      p2Hand.push(p1PlayedCard, p2PlayedCard);
      console.log('p2 wins');
      // set both played hands to null
      p1PlayedCard = null;
      p2PlayedCard = null;
    } else {
      // we have a tie
      // tie code here
      console.log('tie');
      playTieHand('tie');
    }

    // Update UI
    // remove the card from the losers pile (not needed)
    $('#p1Score').text(p1Hand.length);
    $('#p2Score').text(p2Hand.length);
  }
};


// grab the player decks
// only if game is started

/*==========  Stop The Game  ==========*/

var stopGame = function() {
  'use strict';
  // set globals back to starting values
  // game is turned off (set to false)
  gameStarted = false;
  // player cards are set back to zero
  p1Cards = 0;
  p2Cards = 0;
  // player hands are emptied out
  p1Hand = [];
  p2Hand = [];
  playerTurn = 'p1';

  // update UI
  $('#p1Score').text(p1Hand.length);
  $('#p2Score').text(p2Hand.length);
  $('.status').text('Game Over');
  $('#btnStop').hide();
  $('#btnStart').show();
};

/*==========  Dealing Cards  ==========*/

var dealOutHand = function() {
  'use strict';
  // UI - let the user know the cards are shuffled
  // at time effect?
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

/*==========  Start Game  ==========*/

var startGame = function(evt) {
  'use strict';
  gameStarted = true;
  // allow players to click on cards
  $('#p1Deck').on('click', playHand);
  $('#p2Deck').on('click', playHand);
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



// alternate giving pushing each card into
//  each players hand (player array object)
// populate the interface with length of array
// each should be equal to 26

// basic function but would like to grab twitter
//  bootstrap and use modals to pop up with
/// player(1 or 2) has requested a truce. Would
// you like to accept or deny? and you can click
// accept or screw that I want to play
// if the truce is accepted a nice peace quote appear
// and then fades into Would you like to play again
// or would you you like to listen to a peace song?
// play again plays the game again
// peace song option plays give peace a chance
var declareTruce = function() {
  'use strict';
  // console.log(this);
  $('.status').text($(this).text());
};
// begin game
var btnStart = $('#btnStart').on('click', startGame);

// btns to enable either player to end the game
//  by declaring a truce.
var btnP1Truce = $('.p1-truce').on('click', declareTruce);
var btnP2Truce = $('.p2-truce').on('click', declareTruce);
