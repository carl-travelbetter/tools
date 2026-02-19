console.log("Add Accommodation");


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

//Accommodation List
const ACCOM_TRIP_KEY = "tb_trips_accom";
let accommodations = JSON.parse(localStorage.getItem(ACCOM_TRIP_KEY)) || {savedAccommodation: []};

//Setup default no value entered variable
const NOT_SET = "NOT_SET";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl("save-accommodation")?.addEventListener("click", saveAccommodation);
  getEl("cancel")?.addEventListener("click", cancel);
  getEl("duration")?.addEventListener("input", calcDepartureDate);
  getEl("departure-date")?.addEventListener("change", calcDuration);
  getEl("arrival-date")?.addEventListener("change", calcDuration);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

/* Main Save accommodation function
Grab the focus trip id and add this to each accommodation
This will then be used to display the accommodations
*/
function saveAccommodation()
{

}

function cancel()
{
  console.log("Cancel Add Accommodation");
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
