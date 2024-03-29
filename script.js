const buttons = document.querySelectorAll(".choiceHolder");
buttons.forEach((elm) => elm.addEventListener("click", playRound));
const roundScore = document.getElementById("roundScore");
const computerScore = document.getElementById("computerScore");
const playerScore = document.getElementById("playerScore");
const computerImg = document.getElementById("computerImg");
const playerImg = document.getElementById("playerImg");

let pScore = 0;
let cScore = 0;

const showRoundResult = function (result, playerChoice, computerChoice) {
	let roundResult = "";
	if (result === "tie") {
		roundResult = "it's a Tie";
	}
	if (result === "win") {
		roundResult = `Nice!! ${playerChoice} beats ${computerChoice}`;
	}
	if (result === "lose") {
		roundResult = `No!! ${computerChoice} beats ${playerChoice}`;
	}
	roundScore.innerHTML = "";
	roundScore.innerHTML = `<h3 class='roundScore'> ${roundResult}</h3>`;
};
const computerPlay = function () {
	let pickChoices = ["rock", "paper", "scissors"];
	let randomNumber = Math.floor(Math.random() * pickChoices.length);
	return pickChoices[randomNumber];
};
const getImg = function (source) {
	const img = document.createElement("img");
	if (source === "rock") {
		img.src = "images/rock.png";
	}
	if (source === "paper") {
		img.src = "images/paper.png";
	}
	if (source === "scissors") {
		img.src = "images/scissors.png";
	}
	return img;
};
const roundResult = function (playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		showRoundResult("tie", playerChoice, computerChoice);
	}
	if (
		(playerChoice === "rock" && computerChoice === "paper") ||
		(playerChoice === "paper" && computerChoice === "scissors") ||
		(playerChoice === "scissors" && computerChoice === "rock")
	) {
		cScore++;
		showRoundResult("lose", playerChoice, computerChoice);
	}
	if (
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper")
	) {
		pScore++;
		showRoundResult("win", playerChoice, computerChoice);
	}
};
const gameResult = function () {
	if (pScore === 5) {
		setTimeout(() => {
			alert("Congratulations, You Win. Press 'OK' to play again");
		}, 100);
		pScore = 0;
		cScore = 0;
		roundScore.innerHTML = "";
		showScore();
	} else if (cScore === 5) {
		setTimeout(() => {
			alert("Oh NO , You lose. Press 'OK' to play again");
		}, 100);
		pScore = 0;
		cScore = 0;
		roundScore.innerHTML = "";
		showScore();
	} else {
		showScore();
	}
};
const showScore = function () {
	computerScore.textContent = "";
	playerScore.textContent = "";
	computerScore.textContent = `Computer: ${cScore}`;
	playerScore.textContent = `You: ${pScore}`;
};
function playRound(e) {
	const computerChoice = computerPlay();
	console.log(e);
	const playerChoice = e.target.attributes[1].value;
	computerImg.textContent = "";
	playerImg.textContent = "";
	computerImg.appendChild(getImg(computerChoice));
	playerImg.appendChild(getImg(playerChoice));
	roundResult(playerChoice, computerChoice);
	gameResult();
}
showScore();
