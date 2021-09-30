'use strict';

//NOTE selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//FUNCTION init basically reset all proerty
const init = function () {
  //NOTE holding current score and player.
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //NOTE starting condition.
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//FUNCTION switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//NOTE Rolling dice functionality.
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating random dice roll.
    const dice = Number(Math.trunc(Math.random() * 6) + 1);

    //2. display dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for the rolls.
    if (dice !== 1) {
      //add dcie to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//NOTE hold button click event
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add corent score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player score is >=100.
    if (scores[activePlayer] >= 100) {
      //finish the game by adding player winner.
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //removing active player class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. switch to next playe.
      switchPlayer();
    }
  }
});

//NOTE reset button
btnNew.addEventListener('click', init);
