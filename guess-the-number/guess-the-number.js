console.log("Guess The Number");

//iniitlise global variables
let targetNumber = 0;
let guess = 0;
let topOfRange = 10;
let bottomOfRange = 0;
let guessCount = 5;

//load best score for user

//Call method to generate first target number
generateTargetNumber();
setValues();

//set the initial control values
function setValues()
{
  console.log("Set Values");
  const range = document.getElementById("range");
  range.innerHTML = "";
  range.innerHTML = "0.."+topOfRange;

  const guesses = document.getElementById("guesses");
  guesses.innerHTML = "";
  guesses.innerHTML = ""+guessCount;
}

//generate target number based on range
function generateTargetNumber(top, bottom)
{
  console.log("Generate Target Number");
  targetNumber = Math.floor(Math.random() * (topOfRange+1));
  console.log("Target Number "+targetNumber);
}

//submit a guess and see if it matches the target
function submitGuess()
{
  console.log("Submit Guess");
  guess = document.getElementById("guess").value;
  console.log("Guess entered "+guess);
  if (isNaN(guess))
  {
    alert("You Must Enter a number value to guess");
    generateTargetNumber();
    return;
  }

  if (guess == targetNumber)
  {
    alert("Congrats - You did it");
    return;
  }

  const resultsPane = document.getElementById("results");
  resultsPane.innerHTML = "";
  //create Results Title
  const resultsHeading = document.createElementById("h2");
  resultsHeading.textContent = "Result";
  resultsPane.appendChild(resultsHeading);
  if (higherOrLower())
  {
    let higherMessage = document.createElement("p");
    higherMessage.textContent = "Answer too high - go lower";
    resultsPane.appendChild(higherMessage);
  }
  else
  {
    console.log("Answer too low - go higher");
    let lowerMessage = document.createElement("p");
    lowerMessage.textContent = "Answer too low - go higher";
    resultsPane.appendChild(lowerMessage);
  }
  
}

//output the results of the latest guess
function outputResults()
{
  console.log("Output Results");
}

//determine hgher or lower for output
function higherOrLower()
{
  console.log("Higher or Lower");
  if (guess > targetNumber)
  {
    return true;
  }
  
  if (guess < targetNumber)
  {
    return false;
  }
}

//share the results
function shareResults()
{
  console.log("Share results");
}

//Challenge a friend
function challengeAFriend()
{
  console.log("Challenge A Friend");
}

//increase guess count
function increaseGuessCount()
{
  console.log("Increase Guess Count");
}

//decrease guess count
function decreaseGuessCount()
{
  console.log("Decrease Guess Count");
}

//increase number range
function increaseNumberRange()
{
  console.log("Increase Number Range");
  topOfRange = Math.floor(topOfRange+5);
  console.log("New Top of Range = "+topOfRange);
  const range = document.getElementById("range");
  range.innerHTML = "";
  range.innerHTML = "0.."+topOfRange;
}

//decrease number range
function decreaseNumberRange()
{
  console.log("Decrease Number Range");
  if (topOfRange == 5)
  {
    alert("Range cannot go any lower");
    return;
  }
  topOfRange = Math.floor(topOfRange-5);
  console.log("New Top of Range = "+topOfRange);
  const range = document.getElementById("range");
  range.innerHTML = "";
  range.innerHTML = "0.."+topOfRange;
}
