console.log("Prepare For Trip");

//import the date helper util
import {getWrittenDate, getDuration} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Focus Trip Pointer
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};
const focusTrip = focus.savedFocus[0];

//Load All Saved Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

//Accommodation List
const PREPARE_KEY = "prepare_for_trips";
let prepareData = JSON.parse(localStorage.getItem(PREPARE_KEY)) || {prepareSet: []};

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() 
{
  getEl("add-item")?.addEventListener("click", addItem);
}


//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function addItem()
{
  getEl('create-item').hidden = false;
}
