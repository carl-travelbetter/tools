console.log("View Holiday Countdown");

const STORAGE_KEY = "holiday_countdown_tb";
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {countdownList: []};

const FOCUS_STORAGE_KEY = "holiday_countdown_focus";
let focus = JSON.parse(localStorage.getItem(FOCUS_STORAGE_KEY)) || {focusList: []};

loadCountdown();

//load the choosen countdown and show to the second
function loadCountdown()
{
  console.log("View Countdown - Load Countdown");
  let focusTrip = focus.focusList[0];

  //Check if focus is empty
  if (focusTrip === "")
  {
    alert("No Trip Selected");
    return;
  }

  state.countdownList.forEach(countdown => 
    {
      let tripName = countdown.title;
      if (tripName === focusTrip)
      {
        console.log("Match Found");
        //Grab the countdown output and add some elements.
        displayCountdown(countdown.title, countdown.tdate);
      }
    });     
}

function displayCountdown(title, tripdate)
{
  const countdownCard = document.getElementById("countdown");
  countdownCard.innerHTML = "";
  const tripTitle = document.createElement("h1");
  tripTitle.textContent = title;
  countdownCard.appendChild(tripTitle);
  const tripDateString = getTripDate(tripdate);
  const dateP = document.getElementById("p");
  dateP.textContent = tripDateString;
  countdownCard.appendChild(dateP);
  document.getElementById("countdown").hidden = false;
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
