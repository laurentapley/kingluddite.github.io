console.log("loaded");var gameStarted=!1,p1Cards=0,p2Cards=0,p1Hand=[],p2Hand=[];$("#p1Score").text(p1Cards),$("#p2Score").text(p2Cards),$("#btnStop").hide();var playHand=function(){var t=p1Hand.shift();"p1Deck"===this.id?$("#p1Pile").removeClass().addClass("card west "+t):$("#p2Pile").removeClass().addClass("card west "+t)};$("#p1Deck").on("click",playHand),$("#p2Deck").on("click",playHand);var stopGame=function(){"use strict";gameStarted=!1,p1Cards=0,p2Cards=0,p1Hand=[],p2Hand=[],$("#p1Score").text(p1Hand.length),$("#p2Score").text(p2Hand.length),$(".status").text("Game Over"),$("#btnStop").hide(),$("#btnStart").show()},dealOutHand=function(){"use strict";$(".status").text("Shuffling cards...");for(var t=shuffle(),a=0;26>a;a++)p1Hand.push(t.pop()),p2Hand.push(t.pop());$("#p1Score").text(p1Hand.length),$("#p2Score").text(p2Hand.length),$(".status").text("Cards Dealt")},startGame=function(t){"use strict";$(".status").text("Game Started"),$("#btnStart").hide(),$("#btnStop").show(),$("#btnStop").on("click",stopGame),dealOutHand()},btnStart=$("#btnStart").on("click",startGame);