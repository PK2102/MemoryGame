/*
 * Create a list that holds all of your cards
 */
var ele_count = [];
var count = 0;
var first_card = [];
var seconds = 0;
var minutes = 0;
var temp = [];
var i, j;
var cards_available = [...document.getElementsByClassName("card")]
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  // console.log(array.length);
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//shuffle code

var deck_available_cards = document.querySelector(".deck");
var shuffle_cards = shuffle(cards_available);
for (var j = 0; j < shuffle_cards.length; j++) {
  [].forEach.call(shuffle_cards, function(i) {
    deck_available_cards.appendChild(i);
  });
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



//getting the cards
for (i = 0; i < cards_available.length; i++) {
  cards_available[i].addEventListener("click", click(i));
}

//Handling  the click function
function click(i) {
  return function() {
    first_card.push(cards_available[i]);
    if (first_card.length == 1) {
      myvar = setInterval(startTimer, 1000);
    }

    cards_available[i].classList.add("open", "show", "noRepeat");

    ele_count.push(cards_available[i])
    // console.log("hello");
    tocompare();
  }
}
//comparing the cards
function tocompare() {
  if (ele_count.length == 2) {
    numberofmoves();

    if (ele_count[0].children[0].className == ele_count[1].children[0].className) {
      ele_count[0].classList.add("match", "show", "noRepeat");
      ele_count[1].classList.add("match", "show", "noRepeat");
      temp.push("123");
      if (temp.length == 8) {
        stopTimer();
        popup();
      }
      ele_count = [];

    } else {
      setTimeout(function() {
        ele_count[0].classList.remove("open", "show", "noRepeat");
        ele_count[1].classList.remove("open", "show", "noRepeat");
        ele_count = [];

      }, 200);


    }
  }
}
//Reset the game
function reset() {
  window.location.reload();
}
//Handling the star count
var stars = [...document.querySelectorAll(".fa-star")];

function starRating(count) {
  if (count == 8)

  {
    stars[2].classList.add("fa-star-o");
  } else if (count == 16) {
    stars[1].classList.add("fa-star-o");
  }

}
//Counting the number of moves
function numberofmoves() {
  count = count + 1;
  // console.log(count);
  starRating(count);
  document.querySelector(".moves").innerHTML = count;

}
//Starting the Timer
function startTimer() {
  seconds += 1;
  document.querySelector(".secs").innerHTML = seconds;
  if (seconds == 60) {
    minutes += 1;
    document.querySelector(".mins").innerHTML = minutes;
    seconds = 0;

  }
}
//Stoping the timer
function stopTimer() {
  clearInterval(myvar);
  popup();
  var rating = document.querySelector(".stars").innerHTML;
  document.getElementById('rating').innerHTML = rating;
  document.getElementById('totalMoves').innerHTML = count;
  document.getElementById('totalTime').innerHTML = minutes + ":" + seconds;

}
//Modal game
function popup() {
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  // btn.onclick = function() {
  modal.style.display = "block";
  // }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
