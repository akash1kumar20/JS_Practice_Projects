let randomNumber = Math.floor(Math.random() * 10 + 1);
console.log(randomNumber);

let chance = 0;

function submissionFn() {
  chance++;
  document.getElementById("lives").innerHTML = `Lives Remaining : ${
    5 - chance
  } `;
  if (chance > 5) {
    alert("Oops! Life over, wanna restart the game?");
    window.location.reload();
  }
  let numberEntered = Number(document.getElementById("guessInput").value);
  if (document.getElementById("guessInput").value.trim() === "") {
    alert("Please enter a number first");
    return;
  }
  let messageToDisplay = "";

  if (numberEntered > 10 || numberEntered < 1) {
    messageToDisplay = "⚠️ Please enter a number between 1 and 10 only";
  } else if (numberEntered > randomNumber) {
    messageToDisplay = "Too high! Try again.";
  } else if (numberEntered < randomNumber) {
    messageToDisplay = "Too low! Try again.";
  } else {
    document.getElementById(
      "randomNumber"
    ).innerHTML = `Current Number is ${randomNumber}`;
    messageToDisplay = "🎉 Hey! You guessed the number right!";
    randomNumber = Math.floor(Math.random() * 10 + 1);
    chance = 0;
    document.getElementById("lives").innerHTML = `Lives Remaining : 5`;
  }

  document.getElementById("message").innerHTML = messageToDisplay;

  setTimeout(function () {
    document.getElementById("message").innerHTML = "";
    document.getElementById("randomNumber").innerHTML = "";
    document.getElementById("guessInput").value = "";
  }, 5000);
}
