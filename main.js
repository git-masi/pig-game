// Some ideas for version two:
// **Hide the game board and display a winner screen (display none?)
// **On the winner screen show stats on how many rolls for each player, and how many 1s
// **New game mode: price is right rules. You have to hit exactly 100, or maybe some randome number
//      you lose if you go over. So effectively you can play conservatively and wait for the other person to
//      bust or you can go all in and try to hit exactly.
// **Create a nav bar with options and rules
// **Add music and sound
// **Make it mobile friendly
// **Create state variable
// **Maybe give some statistics like what are the chances you don't roll a 1 5x in a row, or roll all 1s


const PLAYER1 = document.getElementById('player1');
const PLAYER2 = document.getElementById('player2');
let score, roundScore, activePlayer, dice, sum;

score = [0, 0];
roundScore = 0;
activePlayer = 0;
sum = 0;



function rollDice(){
    dice = Math.floor(Math.random()*6) + 1;
    return dice;
}

function diceDisplay(diceRoll){
    let diceArr = [
        '<i class="fas fa-dice-one"></i>',
        '<i class="fas fa-dice-two"></i>',
        '<i class="fas fa-dice-three"></i>',
        '<i class="fas fa-dice-four"></i>',
        '<i class="fas fa-dice-five"></i>',
        '<i class="fas fa-dice-six"></i>'
    ];

    document.getElementsByClassName('dice-display')[0].innerHTML = diceArr[diceRoll - 1];
    document.querySelector('.dice-display i').style.animationPlayState = 'running';
}

diceDisplay(rollDice());

// new game button
document.getElementsByClassName('new-game')[0].addEventListener('click', function(){
    activePlayer = 0;
    diceDisplay(rollDice());
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('global-score-0').textContent = 0;
    document.getElementById('global-score-1').textContent = 0;
    PLAYER2.classList.remove('active-player-bg');
    PLAYER1.classList.add('active-player-bg');
    
    document.getElementsByClassName('roll-dice')[0].disable = false;
    document.getElementsByClassName('hold')[0].disable = false;
    
    sum = 0;
    score = [0, 0];
});

// roll dice button
document.getElementsByClassName('roll-dice')[0].addEventListener('click', function(){
    rollDice();
    if (dice === 1){
        diceDisplay(1);
        sum = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        // might be able to use ternary operator instead of this nested if statement
        // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        if (activePlayer === 0){
            activePlayer = 1;
            PLAYER1.classList.remove('active-player-bg');
            PLAYER2.classList.add('active-player-bg');
          } else {
            activePlayer = 0;
            PLAYER2.classList.remove('active-player-bg');
            PLAYER1.classList.add('active-player-bg');
        }
    } else {
        diceDisplay(dice);
        sum += dice;
        document.getElementById('score-' + activePlayer).textContent = sum;
    }
});

// hold button

document.getElementsByClassName('hold')[0].addEventListener('click', function(){
    if (activePlayer === 0){
        score[0] += sum;
        if (score[0] >= 100){
            document.getElementById('global-score-0').textContent = score[0];
            document.querySelector('#player1 h2').textContent = 'WINNER';
            document.getElementsByClassName('roll-dice')[0].disable = true;
            document.getElementsByClassName('hold')[0].disable = true;
            // break;
        } else {
            document.getElementById('global-score-0').textContent = score[0];
            document.getElementById('score-' + activePlayer).textContent = 0;
            PLAYER1.classList.remove('active-player-bg');
            PLAYER2.classList.add('active-player-bg');
            activePlayer = 1;
        }
    } else {
        score[1] += sum;
        if (score[1] >= 100){
            document.getElementById('global-score-1').textContent = score[1];
            document.querySelector('#player2 h2').textContent = 'WINNER';
            document.getElementsByClassName('roll-dice')[0].disable = true;
            document.getElementsByClassName('hold')[0].disable = true;
            // break;
        } else {
            document.getElementById('global-score-1').textContent = score[1];
            document.getElementById('score-' + activePlayer).textContent = 0;
            PLAYER2.classList.remove('active-player-bg');
            PLAYER1.classList.add('active-player-bg');
            activePlayer = 0;
        }
    }
    sum = 0;
});