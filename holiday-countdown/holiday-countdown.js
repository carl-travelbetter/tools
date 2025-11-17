console.log("Holiday Countdown");

const STORAGE_KEY = "holiday_countdown_tb";
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {countdownList: []};

function loadHolidayCountdowns()
{
  console.log("Load Holiday Countdown");
  displayCountdowns();
}

function loadCreateOptions()
{
  console.log("Load Create Options");
  document.getElementById("create-countdown").hidden = false;
}

function createHolidayCountdown()
{
  console.log("Creating Holiday Countdown Timer");
  const title = document.getElementById("trip-name").value;
  if (title === "")
  {
    title = "No Title";
  }
  console.log("Trip Name = "+title);
  const tripDate = document.getElementById("trip-date").valueAsDate;
  let today = new Date();
  let secondsBetween = tripDate - today;
  let daysBetween = Math.floor(secondsBetween / (1000 * 60 * 60 *24));
  if (daysBetween < 1)
  {
    alert("No time for a countdown - you go tomorrow or in the past!");
    return;
  }
  else
  {
    console.log("Days until the trip "+daysBetween);
    const countdown = {title:title, tdate:tripDate};
    state.countdownList.push(countdown);
    saveCountdowns();
  }

  displayCountdowns();  
  //USe this for colour blocks  
}

function saveCountdowns() {
  console.log("Saving countdowns...");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function displayCountdowns()
{
  //Loop through the stored countdowns and display each one in a results card with some options.
  //Show the trip name, title and countdown clock, then days count down. 
  let today = new Date();

  //grab the countdown list area
  const countdownList = document.getElementById("countdown-list");
  
  state.countdownList.forEach(countdown => {
    console.log("Title "+countdown.title);
    const secondsBetween = countdown.tdate - today;
    const daysBetween = Math.floor(secondsBetween / (1000 * 60 * 60 *24));
    const countdownCard = document.createElement("div");
    countdownCard.className = "card";
    const countdownTitle = document.createElement("p");
    countdownTitle.textContent = countdown.title;
    countdownCard.appendChild(countdownTitle);
    const countdownDays = document.createElement("p");
    countdownDays.textContent = "Days to go "+daysBetween;
    countdownCard.appendChild(countdownDays);
    countdownList.appendChild(coundownCard);
  });

  
}
  
function oldCode()  
{
/*  p.style.display = "none";
document.getElementById("today").innerHTML = "Calculating Time...";

let travelDay = document.getElementById("travelDate").valueAsDate;

let x = setInterval(function()
{
let date1 = new Date();
let millSecToGo = travelDay.getTime() - date1.getTime();


// Time calculations for hours, minutes and seconds
let days = Math.floor(millSecToGo / (1000 * 60 * 60 * 24));
let hours = Math.floor((millSecToGo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((millSecToGo % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((millSecToGo % (1000 * 60)) / 1000);



document.getElementById("today").innerHTML = days+"d "+hours+"h "+minutes+"m "+seconds+"s ";
}, 1000);*/
}

