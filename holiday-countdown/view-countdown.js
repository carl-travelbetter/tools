console.log("View Holiday Countdown");

const STORAGE_KEY = "holiday_countdown_tb";
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {countdownList: []};

const STORAGE_KEY = "holiday_countdown_focus";
let focus = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {focusList: []};

loadCountdown();

//load the choosen countdown and show to the second
function loadCountdown()
{
  console.log("View Countdown - Load Countdown");
}
