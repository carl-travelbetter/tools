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
  guess = document.getElementById("guess");
  if (isNaN(guess))
  {
    alert("You Must Enter a number value to guess");
    return;
  }

  if (guess == targetNumber)
  {
    alert("Congrats - You did it");
    return;
  }
  
  if (higherOrLower)
  {
    console.log("Answer too high - go lower");
  }
  else
  {
    console.log("Answer too low - go higher");
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
  concole.log("Higher or Lower");
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
  topOfRange = Maths.floor(topOfRange+5);
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
  topOfRange = Maths.floor(topOfRange-5);
  console.log("New Top of Range = "+topOfRange);
  const range = document.getElementById("range");
  range.innerHTML = "";
  range.innerHTML = "0.."+topOfRange;
}
