console.log("Edit Accommodation");


//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

//Load Focus Trip
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};
let focusTrip = focus.savedFocus[0];

//Load Focus Accommodation
const ACC_FOCUS_KEY = "tb_focus_accom";
let accFocus = JSON.parse(localStorage.getItem(ACC_FOCUS_KEY)) || {focusAcc: []};
//Set the focus accommodation for load and save
let focusAccommodation = accFocus.focusAcc[0];

let tripData;
//Find the trip and get the departure date if known
trips.savedTripList.forEach(trip => {
  if (trip.title == focusTrip)
  {
    tripData = trip;
  }
});

//Accommodation List
const ACCOM_TRIP_KEY = "tb_trips_accom";
let accommodations = JSON.parse(localStorage.getItem(ACCOM_TRIP_KEY)) || {savedAccommodation: []};

//Setup default no value entered variable
const NOT_SET = "NOT_SET";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl("save")?.addEventListener("click", saveAccommodation);
  getEl("cancel")?.addEventListener("click", cancel);
  getEl("duration")?.addEventListener("input", calcDepartureDate);
  getEl("departure-date")?.addEventListener("change", calcDuration);
  getEl("arrival-date")?.addEventListener("change", calcDuration);
  getEl("open-g-maps")?.addEventListener("click", openGoogleMaps);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

loadAccommodation();

//Go through the accommodation list until you find a match and display
function loadAccommodation()
{
  console.log('Load Accommodation Details');
  accommodations.savedAccommodation.forEach(place => {
    if (place.name == focusAccommodation)
    {
      getEl('name').value = place.name;
      getEl('country').value = place.country;
      getEl('town').value = place.town;
      getEl('arrival-date').value = place.arrivalDate;
      getEl('departure-date').value = place.departureDate;
      getEl('type').value = place.type;
      calcDuration();
    }
  });
}


/* Main Save accommodation function
Grab the focus trip id and add this to each accommodation
This will then be used to display the accommodations
*/
function saveAccommodation()
{
  console.log("Saving...");
  const accommodation = {};
  accommodation.trip = focus.savedFocus[0];
  accommodation.name = getEl('name').value;
  accommodation.country = getEl('country').value;
  accommodation.arrivalDate = getEl('arrival-date').value;
  accommodation.departureDate = getEl('departure-date').value;
  accommodation.type = getEl('type').value;
  accommodation.gmap = getEl('g-map').value;
  accommodations.savedAccommodation.push(accommodation);
  saveAccommodationList()
  window.location.assign('/neurodivergent-holiday-planner/manage-trip.html');
}

function saveAccommodationList()
{
  console.log("Saving Accommdation...");
  localStorage.setItem(ACCOM_TRIP_KEY, JSON.stringify(accommodations));
}

function cancel()
{
  console.log("Cancel Edit Accommodation");
  window.location.assign('/neurodivergent-holiday-planner/manage-trip.html');
}

function calcDepartureDate()
{
  const start = getEl("arrival-date").value;
  const duration = parseInt(getEl("duration").value, 10);

  if (!start || isNaN(duration)) return;

  getEl("departure-date").value = addDays(start, duration);
}

function calcDuration()
{
    const start = getEl('arrival-date').value;
    const end = getEl('departure-date').value;

    //If arrival date or departure date is missing, stop calc
    if (!start || !end) return;
  
    getEl('duration').value = getDuration(start, end);
}

function openGoogleMaps()
{
  const currentURL = getEl('g-map').value;
  if (!currentURL)
  {
    window.open("https://www.google.com/maps/", "_blank", "noopener");
  }
  else
  {
    window.open(currentURL, "_blank", "noopener");
  }
}
