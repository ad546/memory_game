/*
 * Create a list that holds all of your cards
 */
var cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
            "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube",
            "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
            "fa fa-bomb", "fa fa-bomb"];
// Initialize all global variables
var currentCards = [];
var winningCards = 0;
var moves = 0;
var timer;
var counter = 0;

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

// Function display used when a card is clicked or needs to be 'closed'
function display(card1) {
    card1.toggleClass("open").toggleClass("show");
}

/* Function pushCards used to add to the currentCards array in order to compare
   the active cards. */
function pushCards(newCard){
    currentCards.push(newCard);
}

/* Function lock used to keep the user from being able to click on a card in certain
   situations. */
function lock(currentCard){
    currentCard.toggleClass("locked");
}

// Function close used to 'close' cards when two are open and don't match.
function close(currentCards){
    currentCards[0].parent().toggleClass("open").toggleClass("show");
    currentCards[1].parent().toggleClass("open").toggleClass("show");
}

/* Function starUpdate is checked each move in order to automatically update te number
    of stars shown. */
function starUpdate(moves){
    if (moves > 10) {
        if (moves > 16){
            $( ".stars" ).children().children().eq(2).removeClass();
        }
        $( ".stars" ).children().children().eq(1).removeClass();
    }
}

/* Function timeStartStop is used for all aspects of the timer, both starting and
    clearing. */
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
 $( ".restart" ).click(function startGame(){

     $('.timer').text(0 + " Sec");
     /* Declared workArray in order to be able to pass timer information to timeStartStop
        instead of click event information. */
     var workArray = [];
     workArray = timeStartStop(timer, counter);
     timer = workArray[0];
     counter = workArray[1];

     // Changes the play button icon to the repeat button.
     $( "div.restart" ).html( "<i class=\"fa fa-repeat\"></i>");
     // When card is clicked
     $( ".card").click(function() {
         // Wait for current selections to clear before picking new card
         if (currentCards.length > 1){

         }
         else {
             var card1 = $( this );
             // Disable user from being able to click the same card twice.
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
                            var winningTime = $('.timer').text();
                            $( "div.restart" ).html( "<i class=\"fa fa-play\"></i>");
                            if (moves > 10) {
                                if (moves > 16){
                                    $('#rating').text('You had a 1 Star Rating');
                                }
                                $('#rating').text('You had a 2 Star Rating');
                            }
                            else {
                                $('#rating').text('You had a 3 Star Rating');
                            }
                            $('#time').text(winningTime);

                            $('#modal-1').modal('show');
                            clearInterval(timer);


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
