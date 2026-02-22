console.log("Find Accommodation");

let accommodationTags = [];

//Load Accommodation Tag data
fetch('/lib/tags/accommodation-tags.json')
  .then(response => response.json())
  .then(data => {
    accommodationTags = data;
    console.log("Accommodation Tags loaded:", accommodationTags);
    createAccommodationTagButtons(); // load tag buttons
  })
  .catch(error => console.error("Error loading accommodation tag data:", error));

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
  getEl('delete')?.addEventListener("click", deleteAccommodation);
  getEl("duration")?.addEventListener("input", calcDepartureDate);
  getEl("departure-date")?.addEventListener("change", calcDuration);
  getEl("arrival-date")?.addEventListener("change", calcDuration);
  getEl("open-g-maps")?.addEventListener("click", openGoogleMaps);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function createAccommodationTagButtons()
{
  console.log('Create Accommodation Tag Buttons');
}
