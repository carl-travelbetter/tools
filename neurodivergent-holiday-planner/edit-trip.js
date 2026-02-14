console.log("Edit Trip");


//Import Dom utils
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
  getEl("save-btn")?.addEventListener("click", saveTrip);
  getEl("cancel-btn")?.addEventListener("click", cancelChanges);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);
loadTripDetails();

function loadTripDetails()
{
  console.log("Load Trip Details");
  //Get the focus trip and assign to a variable
  const focusTrip = focus.savedFocus[0];

  //Keep it basic for now, search though, when a match is found output it. 
    trips.savedTripList.forEach (trip => {
      if (trip.title == focusTrip)
      {
        console.log("Matching Trip Found");
        getEl('trip-title').value = trip.title;
        getEl('destination').value = trip.destination;
        getEl('travel-date').value = trip.travelDate;
        getEl('return-date').value = trip.returnDate;
      
      }
      else
      {
        console.log("No match, lets keep looking");
      }
    });

  
}

function cancelEdit()
{
  console.log("Cancel Edit Trip");
}

function saveChanges()
{
  console.log("Save Changes");
}
