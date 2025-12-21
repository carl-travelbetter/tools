console.log("Holiday Countdown");

const STORAGE_KEY = "holiday_countdown_tb";
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {countdownList: []};

const STORAGE_KEY = "holiday_countdown_focus";
let focus = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {focusList: []};

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
  let title = document.getElementById("trip-name").value;
  if (title === "")
  {
    title = "No Trip Title";
  }
  console.log("Trip Name = "+title);
  //Get the trip date the user entered
  const tripDate = document.getElementById("trip-date").valueAsDate;
  if (!tripDate)  
  {
    alert("Please choose a trip date.");
    return;
  }
  
  let today = new Date();

  // strip time (set to midnight)
  today.setHours(0, 0, 0, 0);
  tripDate.setHours(0, 0, 0, 0);
  
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
    let id = state.countdownList.length+1;
    const countdown = {id:id, title:title, tdate:tripDate};
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
  // strip time (set to midnight)
  today.setHours(0, 0, 0, 0);
  //grab the countdown list area
  const countdownList = document.getElementById("countdown-list");
  //Clear the current displayed countdowns
  countdownList.innerHTML = "";
  let listID = 0;
  state.countdownList.forEach(countdown => {
    listID++;
    const date = new Date(countdown.tdate);
    let tripDetails = getTripDate(date);  
     //Work out how many years to go (for mutiplication factor of months) then add the difference in the month values;
    //e.g. (2027 - 2025) * 12 = 24 months, June - December, 5 - 11 = -6, therefore 24 - 6 = 18 months
    let monthsDiff = ((date.getFullYear() - today.getFullYear()) * 12) + (date.getMonth() - today.getMonth());
    
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
    const msPerDay = 1000 * 60 * 60 * 24;
  
    //Move on today by the months to go so only days left.
    let tempDate = new Date(today);
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
    const countdownTitle = document.createElement("h3");
    countdownTitle.textContent = countdown.title;
    countdownCard.appendChild(countdownTitle);
    const travelDate = document.createElement("p");
    travelDate.textContent = "Trip Date: "+tripDetails;
    countdownCard.appendChild(travelDate);
    const countdownDays = document.createElement("p");
    countdownDays.textContent = "Countdown: "+monthsDiff+" Months "+weeks+" Weeks "+days+" Days to go.";
    countdownCard.appendChild(countdownDays);
    //create a trash can button for delete
    const trashButton = document.createElement("button");
    trashButton.className = "control-btn";
    trashButton.textContent = "🗑️ Delete";
    trashButton.setAttribute("data-label", listID-1);
    trashButton.addEventListener("click", () => {
      
      console.log("Trash Button Clicked");
      
      state.countdownList.splice(trashButton.dataset.label, 1); 
      deleteCountdown();
      });
    countdownCard.appendChild(trashButton);
    const editButton = document.createElement("button");
    editButton.className = "control-btn";
    editButton.textContent = "🖊 Edit";
    editButton.setAttribute("data-label", listID-1);
    editButton.addEventListener("click", () => {
      alert("To edit a countdown simply delete it and then create again with the new data");
      console.log("Edit Button Clicked");

    });
   

    countdownCard.appendChild(editButton);
    //Create and add share button
    const shareButton = document.createElement("button");
    shareButton.className = "control-btn";
    shareButton.textContent = "↗️ Share";
    shareButton.addEventListener("click", () => {
     let message = "Going to "+countdown.title+" in "+monthsDiff+" Months "+weeks+" Weeks "+days+" Days\n"+
       "Explore more, worry less - https://travelbetter.co.uk"
      console.log("Share Button Clicked");
      if (navigator.share)
        navigator.share({
      text: message,
    }).catch(() => {
      // user cancelled – you can safely ignore this
    });

    });
    countdownCard.appendChild(shareButton);
     //Create and add share button
    const focusButton = document.createElement("button");
    focusButton.className = "control-btn";
    focusButton.textContent = "↗️ More";
    focusButton.addEventListener("click", () => {
      //Get title and add to focus list then change page
      console.log("Focus Button Clicked");
     

    });
    countdownCard.appendChild(focusButton);
    countdownList.appendChild(countdownCard);
  });

  
}

function getTripDate(date)
{
  console.log("Get Trip Date String");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let suffix = getOrdinalSuffix(date.getDate());
  let tripDate = day+" "+date.getDate()+suffix+" "+month+" "+year;
  return tripDate;
}

function deleteCountdown()
{
  console.log("Delete Countdown");
  saveCountdowns();
  displayCountdowns();
}

function getOrdinalSuffix(n) {
  const lastDigit = n % 10;
  const lastTwo = n % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return "th";
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
}

  

