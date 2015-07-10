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
  // find if card1 is 3 letters long
  //  cards either have 3 or 2 characters
  //  if 3 chars you can strip out numbers
  //  if 2 chars they are high cards
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

var endGame = function() {
  'use strict';
  $('#endGame').modal('show');
};

/*==========  COMPARE CARDS  ==========*/
// grab both the cards to find out which is lower
var compareCards = function(card1, card2) {
  'use strict';
  // find out what the card values are
  card1Value = getCardValue(card1);
  card2Value = getCardValue(card2);

  // compare the values (lowest wins!)
  if (card1Value < card2Value) {
    $('#p1Result').removeClass().addClass('success').text('Winner');
    $('#p2Result').removeClass().addClass('error').text('Loser');
    // populates status with win message
    return 'Player 1';
  } else if (card2Value < card1Value) {
    // player 2 wins with lower value

    $('#p2Result').removeClass().addClass('success').text('Winner');
    $('#p1Result').removeClass().addClass('error').text('Loser');

    return 'Player 2';
  } else {
    return 'We have a tie';
  }
  // never get's here????
  // once you figure out what card value is greater
  //   set both card values to null for next card
  //   battle
  p1PlayedCard = null;
  p2PlayedCard = null;
};

var renderScore = function(p1HandLength, p2HandLength) {
  'use strict';
  $('#p1Score').text(p1HandLength);
  $('#p2Score').text(p2HandLength);
};

/*==========  Tie  ==========*/
var playTieHand = function(p1Hand, p2Hand) {
  'use strict';
  // for both players
  // grab 5 cards and test the outputs in temp arrays

  //
  // if (this.id === "p1Deck" && playerTurn === 'p1') {
  /*==========  Player 1  ==========*/
  // take the top 4 cards and add them to an array
  var p1TieCards = p1Hand.splice(0, 5);
  // append 5 cards to .player-one
  // a chuck of code that will add 5 cards
  //  the peace class is used to remove them easily when peace winner is determined
  //  the last card is dynamically added by being pulled from p2TieCards[4] index
  //  which is the last card in the sequence which will be used to determine the winner
  $('.player-one').append('<div class="peace card deck">West</div><div class="peace card deck">West</div><div class="peace card deck">West</div><div class="peace card deck ' +
    p1TieCards[4] + '\">West</div>');
  console.log('p2Hands has ' + p2Hand.length + 'before splice ');
  var p2TieCards = p2Hand.splice(0, 5);
  console.log('p2Hands has ' + p2Hand.length + 'after splice ');
  // append 5 cards to .player-one
  // a chuck of code that will add 5 cards
  //  the peace class is used to remove them easily when peace winner is determined
  //  the last card is dynamically added by being pulled from p2TieCards[4] index
  //  which is the last card in the sequence which will be used to determine the winner
  $('.player-two').append('<div class="peace card deck">West</div><div class="peace card deck">West</div><div class="peace card deck">West</div><div class="peace card deck ' +
    p2TieCards[4] + '\">West</div>');
  //$(".peace").slideUp(300).delay(800).fadeIn(400);

  var winner = findWinner(p1TieCards[4], p2TieCards[4], 'tie');
  console.log(('winner:' + winner));
  if (winner === 'Player 1') {
    // grab both players peace cards
    var p1NewCombinedTiePile = p1TieCards.concat(p2TieCards);
    // add them to p1's pile
    p1Hand = p1Hand.concat(p1NewCombinedTiePile);
    renderScore(p1Hand.length, p2Hand.length);
    $('div').remove('.peace');
  } else if (winner === 'Player 2') {
    // grab both players peace cards
    var p2NewCombinedTiePile = p2TieCards.concat(p1TieCards);
    // add them to p2's pile
    p2Hand = p2Hand.concat(p2NewCombinedTiePile);
    // only render score after player 2's turn
    // score should now represent the winner with 5 plus cards
    //  and the loser with 5 less cards
    // remove the peace cards
    $('div').remove('.peace');
    renderScore(p1Hand.length, p2Hand.length);
    //$('.player-two').remove('.peace');
  } else {
    playTieHand();
  }
};

/*==========  Play Hand  ==========*/
// when players click their cards, do this stuff
var playHand = function() {
  'use strict';

  // which player requested a card
  if (this.id === "p1Deck" && playerTurn === 'p1') {
    /*==========  Player 1  ==========*/
    // take the top card
    p1PlayedCard = p1Hand.shift();
    console.log(p1PlayedCard);
    // remove all classes and
    //  add card west classes plus the dynamic class
    $('#p1Pile').removeClass().addClass("card west " + p1PlayedCard);
    playerTurn = 'p2';
  } else if (this.id === "p2Deck" && playerTurn === 'p2') {
    /*==========  Player 2  ==========*/
    $('#p2Deck').on('click', playHand);
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
var findWinner = function(p1PlayedCard, p2PlayedCard, state) {
  'use strict';
  console.log('p1Hand' + p1Hand.length);
  if (p1Hand.length < 24 || p2Hand.length < 24) {
    //console.log('game over');
    endGame();
  }

  // when we have 2 cards to compare, call the compare fn
  if (p1PlayedCard !== null && p2PlayedCard !== null) {
    var winnerMessage;
    if (state !== 'tie') {
      winnerMessage = compareCards(p1PlayedCard, p2PlayedCard);
      $('.status').text(winnerMessage);
      // put the cards into the winners pile
      if (winnerMessage === 'Player 1') {
        console.log('p1 wins ' + 'p2Hand:' + p2Hand.length + ' p1Hand:' + p1Hand.length);
        p1Hand.push(p1PlayedCard, p2PlayedCard);
        // set both played hands to null
        p1PlayedCard = null;
        p2PlayedCard = null;
      } else if (winnerMessage === 'Player 2') {
        p2Hand.push(p1PlayedCard, p2PlayedCard);
        console.log('p2 wins ' + 'p2Hand:' + p2Hand.length + ' p1Hand:' + p1Hand.length);
        // set both played hands to null
        p1PlayedCard = null;
        p2PlayedCard = null;
      } else {
        // we have a tie
        // tie code here
        console.log('tie');
        playTieHand('tie');

      }
    } else {
      winnerMessage = compareCards(p1PlayedCard, p2PlayedCard);
      $('.status').text(winnerMessage);
      return winnerMessage;
    }

    // Update UI
    renderScore(p1Hand.length, p2Hand.length);
  }
};

// grab the player decks
// only if game is started


/*==========  Stop The Game  ==========*/
var stopGame = function() {
  'use strict';
  //console.log('cards: ' + cards);
  // set globals back to starting values
  // game is turned off (set to false)
  gameStarted = false;
  // player cards are set back to zero
  p1Cards = 0;
  p2Cards = 0;
  // player hands are emptied out
  p1Hand = [];
  p2Hand = [];
  // store what card was played from deck
  p1PlayedCard = null;
  p2PlayedCard = null;
  // store and compare card values to see who wins turn
  card1Value = undefined;
  card2Value = undefined;
  // enable both players to end game with truce at any time
  p1Truce = false;
  p2Truce = false;
  playerTurn = 'p1';


  // update UI
  // set scores back to 0
  $('#p1Score').text(p1Hand.length);
  $('#p2Score').text(p2Hand.length);
  $('.status').text('Game Over');
  $('#btnStop').hide();
  $('#btnStart').show();
  // remove event listeners
  $('#btnStop').off('click', stopGame);
  $('#p1Deck').off('click', playHand);
  $('#p2Deck').off('click', playHand);
  // remove winner/loser notification
  $('#p1Result').text('');
  $('#p2Result').text('');
  // remove all classes and add card outline to both
  //  players (just the way it was at the start of the
  //  game)
  $('#p1Pile').removeClass().addClass("card west outline");
  $('#p2Pile').removeClass().addClass("card west outline");

};

/*==========  Dealing Cards  ==========*/

var dealOutHand = function() {
  'use strict';
  console.log('gets here deal out');
  // UI - let the user know the cards are shuffled
  // at time effect?
  $('.status').fadeIn("slow", function() {
    $(this).text('Shuffling cards...');
  });
  // shuffle the deck
  //console.log(shuffle())
  var newHand = dealDeck();
  console.log(newHand);

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
  $('.status').fadeIn("slow", function() {
    $(this).text('Cards Dealt');
  });
};

/*==========  Start Game  ==========*/

var startGame = function(evt) {
  'use strict';

  // allow players to click on cards
  // if (gameStarted === false) {
  //   console.log('game is off');
  // }
  gameStarted = true;
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
