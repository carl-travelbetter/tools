console.log("Travelbetter Neurodivergent Holiday Planner");


//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

//Setup Focus Trip
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};

//Setup default no value entered variable
const NOT_SET = "NOT_SET";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl("load-trips-btn")?.addEventListener("click", loadTrips);
  getEl("load-create-btn")?.addEventListener("click", loadCreateTripOptions);
  getEl("create-trip-btn")?.addEventListener("click", createTrip);
  getEl("cancel-trip-btn")?.addEventListener("click", cancelCreateTrip);
  getEl("duration")?.addEventListener("input", calcReturnDate);
  getEl("return-date")?.addEventListener("change", calcDuration);
}


//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function loadTrips()
{
  console.log("Load Trips");

  //Check if any trips are saved
  if (trips.savedTripList.length === 0)
  {
    console.log("No Trips Saved");
    displayNoSavedTrips();
  }
  else
  {
    displaySavedTrips();
  }
}

//Load the create trip options when the user clicks on create new trip
function loadCreateTripOptions()
{
  console.log("Display Create Trip");
  getEl("trip-title").value = "";
  getEl("create-trip").hidden = false;
}

//create a new trip when the user hits save
function createTrip()
{
  console.log("Creating new trip");
  const trip = {};
  //Grab each value and create a new trip object
  
  const tripTitle = getText("trip-title", NOT_SET);
  if (tripTitle == NOT_SET)
  {
    console.log("Error - no trip title entered");
    return;
  }
  else
  {
    trip.title = tripTitle;  
    //Calls the util to return destination text or NOT_SET from the destination element 
    trip.destination = getText("destination", NOT_SET);
    //Calls the util to return date or NOT_SET from the travel-date element
    trip.travelDate = getDate("travel-date", NOT_SET);
    //Calls the util to return date or NOT_SET from the travel-date element
    trip.returnDate = getDate("return-date", NOT_SET);
    trip.who = document.getElementById("who").value;
    trips.savedTripList.push(trip);
    saveTrips();
    getEl("create-trip").hidden = true;
    //Load up the list of trups following creation
    displaySavedTrips()
  }

   
  //Manage empty / optional inputs
  //Create blanks in trip object
  //load trip object to trips list and then call save option
}



function cancelCreateTrip()
{
  console.log("Cancel Creating a Trip");
  getEl("create-trip").hidden = true;
}

//Display a helpful message saying no saved trips and provide an option to create a trip or see help files
function displayNoSavedTrips()
{
  console.log("Display No Saved Trips");
}

function saveTrips() {
  console.log("Saving Trips...");
  localStorage.setItem(TRIP_KEY, JSON.stringify(trips));
}

//Display the saved trips with summary data and provide a manage trip option
function displaySavedTrips()
{
  console.log("Display Saved Trips");
  const tripTable = document.getElementById("saved-trips");
  tripTable.innerHTML = "";
  const heading = document.createElement("h2");
  heading.textContent = "Saved Trips";
  tripTable.appendChild(heading);

  //Create a card for each saved trip
  trips.savedTripList.forEach (trip => {
    const tripCard = document.createElement("div");
    tripCard.className = "card";
    //Get the trip title
    const tripTitle = document.createElement("h3");
    tripTitle.textContent = trip.title;
    tripCard.appendChild(tripTitle);
    const destination = document.createElement("p");
    destination.textContent = "Destination: "+trip.destination;
    tripCard.appendChild(destination);
    const date = new Date(trip.travelDate);
    const tripDate = document.createElement("p");
    tripDate.textContent = "Travel Date: "+getTripDate(date);
    tripCard.appendChild(tripDate);
    //Create some buttons and then have them do something
    const moreButton = document.createElement("button");
    moreButton.className = "control-btn";
    moreButton.textContent = "↗️ More";
    moreButton.addEventListener("click", () => {
      //Get title and add to focus list then change page
      console.log("More Button Clicked");
      //Need to create a global stored variable for focussed trip and then call in new app
      focus.savedFocus = [];
      focus.savedFocus.push(trip.title);
      saveFocusCountdown();
      window.location.href("/neurodivergent-holiday-planner/manage-trip.html");

    });
    tripCard.appendChild(moreButton);
    
    tripTable.appendChild(tripCard);
  });
  //Show the trips 
  tripTable.hidden = false;
}

//Save the focussed countdown when more selected.
function saveFocusCountdown() {
  console.log("Saving Focus Reference...");
  localStorage.setItem(FOCUS_TRIP_KEY, JSON.stringify(focus));
}

//Return a useable trip date
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

//Return the correct data suffix
function getOrdinalSuffix(n) {
  const lastDigit = n % 10;
  const lastTwo = n % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return "th";
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
}

function calcReturnDate()
{
  const start = getEl("travel-date").value;
  const duration = parseInt(getEl("duration").value, 10);

  if (!start || isNaN(duration)) return;

  getEl("return-date").value = addDays(start, duration);
}

function calcDuration()
{
    getEl('duration').value = getDuration(getEl('travel-date').value, getEl('return-date').value);
}
