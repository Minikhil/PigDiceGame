/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
window.onload = function() {
  init();
};

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  // do not display dice initally
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';




}
document.querySelector('.btn-roll').addEventListener('click', function() {
  // change dice images
  if(gamePlaying){
    // 1. generate random whole # from 1-6
    var diceNum= Math.floor(Math.random()*6)+1;


    //2. change dice image
    var diceDOM =   document.querySelector('.dice');


    // use string addition to change src of image tag
    diceDOM.src = 'dice-' + diceNum + '.png';
    // show dice
    diceDOM.style.display = 'block';

    // same thing for 2nd dice
    var diceNum2 = Math.floor(Math.random()*6)+1;
    var diceDOM2 =   document.querySelector('#dice-2');
    diceDOM2.src = 'dice-' + diceNum2 + '.png';
    diceDOM2.style.display = 'block';

  }

  if(diceNum != 1 && diceNum2 != 1){
    roundScore += diceNum + diceNum2;
    console.log("roundScore: " + roundScore);


  }
  else{
    roundScore = 0;
    nextPlayer();
  }
  document.getElementById('current-' +activePlayer).textContent = roundScore;




});

function nextPlayer(){
    //1. change activeplayer
  if(activePlayer == 0){
    activePlayer = 1;
  }
  else{
    activePlayer = 0;
  }

  //1. change active panel
  document.querySelector('.panel0').classList.toggle('active');
  document.querySelector('.panel1').classList.toggle('active');

}

document.querySelector('.btn-hold').addEventListener('click', function(){
  // Adding roundScore to total score
  scores[activePlayer] += roundScore;
  // Add current to main score
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  //check wining condition
  if(scores[activePlayer] >= 100){
    win(activePlayer);
  }


  // Zero out roundScore score
  roundScore = 0;
  document.getElementById('current-' +activePlayer).textContent = roundScore;

  // Run nextPlayer method
  nextPlayer();

});

function win(activePlayer){
    document.querySelector('.panel' + activePlayer).classList.toggle('active');
    document.querySelector('.panel' + activePlayer).classList.toggle('winner');
    document.querySelector('.player-name').textContent = "WINNER!"


}
document.querySelector('.btn-new').addEventListener('click',function(){
  location.reload();  //refresh the page
});
