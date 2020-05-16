// Returns a random result of either rock, paper, or scissors.
function computerPlay() {
    // create random number between 1-3
    let randomInput = Math.floor((Math.random() * 3) + 1);

    if (randomInput == 1) {
        return "rock";
    } else if (randomInput == 2) {
        return "paper";
    } else if (randomInput == 3) {
        return "scissors";
    }
}

// Plays a single round of Rock Paper Scissors
function playRound(playerSelection) {
    let computerSelection = computerPlay();
    playerSelection = playerSelection.toLowerCase();
    let result;

    if (playerSelection == computerSelection) {
        result = "tie";
    } else {
        // returns a string based on the correct case for all player inputs
        switch (playerSelection) {
            case "rock":
                if (computerSelection == "paper") {
                    result = "lose";
                } else {
                    result = "win";
                }
                break;
            case "paper":
                if (computerSelection == "scissors") {
                    result = "lose";
                } else {
                    result = "win";
                }
                break;
            case "scissors":
                if (computerSelection == "rock") {
                    result = "lose";
                } else {
                    result = "win";
                }
                break;
        }
    }

    // change css/html
    displayRound(result, playerSelection, computerSelection);

    return result;
}

function game(userInput) {
    // counts number of wins
    let playerWins = 0;
    let computerWins = 0;

    // counts number of games
    const NUM_GAMES = 5
    let currentGame = document.getElementById("rounds").children[0];
    let currentGameNumber = Number(currentGame.textContent.slice(-1));

    if (currentGameNumber <= NUM_GAMES) {
        // play a round
        let gameResult = playRound(userInput);

        let userWins = document.getElementById("userCount");
        let opponentWins = document.getElementById("opponentCount");

        let result;

        // save result of current game
        if (gameResult == "win") {
            result = userWins;
        } else if (gameResult == "lose") {
            result = opponentWins;
        }

        if (gameResult != "tie") {
            result.textContent = Number(result.textContent) + 1;
        }

        // increment game number
        currentGameNumber++;
        currentGame.textContent = "ROUND " + currentGameNumber;

        if (currentGameNumber >= NUM_GAMES) {
            let finalUserWins = document.getElementById("userCount").textContent;
            let finalOpponentWins = document.getElementById("opponentCount").textContent;

            let finalResult;

            if (finalUserWins > finalOpponentWins) {
                finalResult = document.getElementById("winner");
            } else if (finalUserWins == finalOpponentWins) {
                finalResult = document.getElementById("tie");
            } else {
                finalResult = document.getElementById("loser");
            }

            finalResult.classList.add("end");
            finalResult.style.visibility = 'visible';

            // reset rounds
            window.setTimeout(function (e) {
                document.getElementById("rounds").children[0].textContent = "ROUND 1";
                document.getElementById("roundResult").textContent = "Choose your fighter...";

                let opponentChoice = document.getElementById("opponentInput").children;

                for (let i = 0; i < opponentChoice.length; i++) {
                    opponentChoice[i].style.backgroundColor = 'rgb(138, 138, 138)';
                }

                userWins.textContent = '0';
                opponentWins.textContent = '0';
            }, 1500);

            finalResult.ontransitionend = () => {
                finalResult.classList.remove("end");
                finalResult.style.visibility = 'hidden';
            };
        }
    }
}

function displayRound(result, userInput, computerInput) {
    let message;

    switch (result) {
        case "tie":
            message = `It's a tie! you both picked ${userInput}`;
            break;
        case "win":
            message = `You won! ${userInput} beats ${computerInput}`;
            break;
        case "lose":
            message = `You lost! ${computerInput} beats ${userInput}`;
            break;
    }

    let opponentChoice = document.getElementById("opponentInput").children;

    for (let i = 0; i < opponentChoice.length; i++) {
        if (opponentChoice[i].textContent.toLowerCase() == computerInput) {
            opponentChoice[i].style.backgroundColor = 'rgb(39, 102, 175)';
            opponentChoice[i].classList.add("increaseScale");

            opponentChoice[i].ontransitionend = () => {
                opponentChoice[i].classList.remove("increaseScale");

                let messageWindow = document.getElementById("roundResult");
                messageWindow.textContent = message;
            };
        } else {
            opponentChoice[i].style.backgroundColor = 'rgb(138, 138, 138)';
        }
    }
}

//create onclick events for play buttons
let playInputButtons = document.getElementById("playInput").children;

for (let i = 0; i < playInputButtons.length; i++) {
    playInputButtons[i].onclick = ('click', function (e) {
        game(playInputButtons[i].textContent);
    });
}
