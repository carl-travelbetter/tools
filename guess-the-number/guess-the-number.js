console.log("Guess The Number");

//iniitlise global variables
let targetNumber = 0;
let guess = 0;
let topOfRange = 10;
let bottomOfRange = 0;
let guessLimit = 5;
let guessCount = 0;

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
  guesses.innerHTML = "Guess Limit "+guessLimit;

  //Reset guess count
  guessCount = 0;
}

//generate target number based on range
function generateTargetNumber()
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
  document.getElementById("guess").value = "";
  if (isNaN(guess))
  {
    alert("You Must Enter a number value to guess");
    return;
  }

  if (guess == targetNumber)
  {
    showMessage('<p> Correct - Well Done, time to try the next level!</p>', 'winningmessage');
  }
  else
  {

      guessCount++;
      let guessesLeft = guessLimit - guessCount;
      if (guessesLeft == 0)
      {
        document.getElementById("results").hidden = true;
        showMessage('<p> No guesses left - bad luck, try again</p>', 'RESULT');
        startAgain();
      }
      else
      {
    
          /*const resultsPane = document.getElementById("results");
          resultsPane.innerHTML = "";
          //create Results Title
          const resultsHeading = document.createElement("h2");
          resultsHeading.textContent = "Result";
          resultsPane.appendChild(resultsHeading);*/
          if (higherOrLower())
          {
            showMessage('<p> Nope - Try Higher</p>', 'RESULT');
            //let higherMessage = document.createElement("p");
            //higherMessage.textContent = "Answer too high - go lower";
            //resultsPane.appendChild(higherMessage);
          }
          else
          {
            showMessage('<p> Nope - Try Lower</p>', 'RESULT');
            /*console.log("Answer too low - go higher");
            let lowerMessage = document.createElement("p");
            lowerMessage.textContent = "Answer too low - go higher";
            resultsPane.appendChild(lowerMessage);*/
          }
        
          let guessOutput = document.getElementById("guesses-left");
          guessOutput.textContent = "Guesses left "+guessesLeft;
          guessOutput.hidden = false;
          //resultsPane.hidden = false;
      }
  }
  
}

//output the results of the latest guess
function winningResult()
{
  console.log("Winning Result");
  const winningResultOutput = document.getElementById("results");
  winningResultOutput.innerHTML = "";
  const winningMessage = document.createElement("p");
  winningMessage.className = "winningmessage";
  winningMessage.textContent = "Correct - Well Done, time to level up and go again!";
  winningResultOutput.appendChild(winningMessage);
  winningResultOutput.hidden = false;
}

//Show an output message
function showMessage(message, type) 
{
  const resultsPane = document.getElementById("results");
  results.innerHTML = "";
  resultsPane.hidden = false;

  // Basic template; you can style by type later
  resultsPane.innerHTML = `
    <h2>Result</h2>
    <p class="${type}">${message}</p>
  `;
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
  guessLimit = Math.floor((topOfRange / 2)+1);
  console.log("New Guess Limit = "+guessLimit);
  startAgain();
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
  guessLimit = Math.floor((topOfRange / 2)+1);
  console.log("New Guess Limit = "+guessLimit);
  startAgain();
}

//Start again
function startAgain()
{
  console.log("Lets Start Again");
  document.getElementById("results").hidden = true;
  document.getElementById("guesses-left").hidden = true;
  setValues(); 
  generateTargetNumber();
}
  
