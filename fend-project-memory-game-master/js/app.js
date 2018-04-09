/*
 * Create a list that holds all of your cards
 */
var cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
            "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube",
            "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
            "fa fa-bomb", "fa fa-bomb"];
var currentCards = [];
var winningCards = 0;
var moves = 0;
var timer;
var counter = 0;
$('[data-toggle="modal"]').modal();﻿

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function display(card1) {
    card1.toggleClass("open").toggleClass("show");
}
function pushCards(newCard){
    currentCards.push(newCard);
}
function lock(currentCard){
    currentCard.toggleClass("locked");
}
function close(currentCards){
    currentCards[0].parent().toggleClass("open").toggleClass("show");
    currentCards[1].parent().toggleClass("open").toggleClass("show");
}
function starUpdate(moves){
    if (moves > 10) {
        if (moves > 16){
            $( ".stars" ).children().children().eq(2).removeClass();
        }
        $( ".stars" ).children().children().eq(1).removeClass();
    }
}
function timeStartStop() {
    var returnArray = [];
    if (counter < 1){
        var start = new Date;

        timer = setInterval(function() {$('.timer').text(Math.floor((new Date - start) / 1000) + " Sec");
        }, 1000);
        counter = 1;
        returnArray[0] = timer;
        returnArray[1] = counter;
        return returnArray;
    }
    else {
        clearInterval(timer);
        counter = 0;
        timeStartStop();
        returnArray[0] = timer;
        returnArray[1] = counter;
        return returnArray;
    }

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 //Restart the Game
 $( ".restart" ).click(function() {
     var newCards = shuffle(cards);

     for(var i=0; i<16; i++){
         $( "#"+ (i+1) ).removeClass().addClass(newCards[i]);
     }

     $( ".deck" ).children().removeClass().addClass("card");

     //Reset all global variables
     currentCards = [];
     winningCards = 0;
     moves = 0;
     $( ".moves" ).text(moves)

 });
 // Start Game
 $( ".restart" ).click(function(){
     $('.timer').text(0 + " Sec");
     var workArray = [];
     workArray = timeStartStop(timer, counter);
     timer = workArray[0];
     counter = workArray[1];

     $( "div.restart" ).html( "<i class=\"fa fa-repeat\"></i>");
     // When card is clicked
     $( ".card").click(function() {
         // Wait for current selections to clear before picking new card
         if (currentCards.length > 1){

         }
         else {
             var card1 = $( this );
             if (card1.children().hasClass("locked")){

             }
             else {
                 lock(card1.children());
                 display(card1);
                 pushCards(card1.children());
                 if (currentCards.length > 1) {
                     if ((currentCards["0"]["0"].className) === (currentCards["1"]["0"].className)){
                         //lock(currentCards);
                         winningCards++;
                        currentCards = [];
                        // Update moves text
                        moves++;
                        $( ".moves" ).text(moves);
                        starUpdate(moves);
                        if (winningCards > 7){
                            $( "div.restart" ).html( "<i class=\"fa fa-play\"></i>");
                            clearInterval(timer);
                            setTimeout(function(){alert("YOU WIN!!!!!!!" + moves);}, 200);
                        }
                    }
                    else {
                        lock(currentCards[0]);
                        lock(currentCards[1]);
                        setTimeout(function(){ close(currentCards); }, 1500);
                        setTimeout(function(){ currentCards = []; }, 1500);

                        // Update moves text
                        moves++;
                        $( ".moves" ).text(moves);
                        starUpdate(moves);
                    }
                }
            }
        }


    });
});
