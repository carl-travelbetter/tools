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
  //Clear the current displayed countdowns
  countdownList.innerHTML = "";
  state.countdownList.forEach(countdown => {
   date = new Date(countdown.tdate);
      
     //Work out how many years to go (for mutiplication factor of months) then add the difference in the month values;
    //e.g. (2027 - 2025) * 12 = 24 months, June - December, 5 - 11 = -6, therefore 24 - 6 = 18 months
    let monthsDiff = ((date.getYear() - today.getYear()) * 12) + (date.getMonth() - today.getMonth());
    
    //Work out the whole month count 
    if (date.getDate() < today.getDate())
    {
      monthsDiff--;
    }
  
    //If the monthDiff is set to -1 then move to 0
    if (monthsDiff < 0)
    {
      monthsDiff = 0;
    }
    
    //set a ms convert value
    msPerDay = 1000 * 60 * 60 * 24;
  
    //Move on today by the months to go so only days left.
    let tempDate = new Date();
    tempDate.setMonth(today.getMonth()+monthsDiff);
    
    //calculate the total days remaining
    let totalDaysRemaining = Math.floor((date - tempDate) / msPerDay);
  
    //calculate the weeks remaining
    let weeks = Math.floor(totalDaysRemaining / 7);
  
    //calculate the remainder of days
    let days = totalDaysRemaining % 7;

    //Output the countdown
    const countdownCard = document.createElement("div");
    countdownCard.className = "card";
    const countdownTitle = document.createElement("p");
    countdownTitle.textContent = countdown.title;
    countdownCard.appendChild(countdownTitle);
    const countdownDays = document.createElement("p");
    countdownDays.textContent = monthsDiff+" Months "+weeks+" Weeks "+days+" Days to go.";
    countdownCard.appendChild(countdownDays);
    countdownList.appendChild(countdownCard);
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

