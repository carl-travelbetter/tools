console.log("Manage Trip");

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
const ACCOM_TRIP_KEY = "tb_trips_accom";
let accommodations = JSON.parse(localStorage.getItem(ACCOM_TRIP_KEY)) || {savedAccommodation: []};

//Load Focus Accommodation
const ACC_FOCUS_KEY = "tb_focus_accom";
let accFocus = JSON.parse(localStorage.getItem(ACC_FOCUS_KEY)) || {focusAcc: []};

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() 
{
  getEl("delete-trip-btn")?.addEventListener("click", goToDelete);
  getEl('exit-btn')?.addEventListener('click', exitToMain);
  getEl('find-accommodation')?.addEventListener('click', findAccommodation);
  getEl('add-accommodation')?.addEventListener('click', addAccommodation);
}


//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);


displayFocusTrip();


function displayFocusTrip()
{
  console.log("Display Focus Trip");
  //Check that the trips have loaded.

  if (trips.savedTripList.length > 0)
  {
    console.log("Some trips have been loaded");
   
    //find the focus trip and display the result
    //Initially this can all be done here but we will want to break that diplay function out later
    //Lets test the focus trip by using its value to display a title
    const outputArea = getEl("display-trip");
    const tripHead = document.createElement("h2");
    tripHead.textContent = "Managing Trip: "+focusTrip;
    outputArea.appendChild(tripHead);
    
    //Keep it basic for now, search though, when a match is found output it. 
    trips.savedTripList.forEach (trip => {
      if (trip.title == focusTrip)
      {
        console.log("Matching Trip Found");
        const outputCard = document.createElement('div');
        outputCard.className = 'output-card';
        let tripDestination = document.createElement('p');
        tripDestination.textContent = "Destination "+trip.destination;
        outputCard.appendChild(tripDestination);
        let tripDate = new Date(trip.travelDate);
        const tripDateLabel = document.createElement("p");
        tripDateLabel.textContent = "Travel Date: "+getWrittenDate(tripDate);
        outputCard.appendChild(tripDateLabel);
        const returnDateLabel = document.createElement('p');
        const daysAway = document.createElement('p');
        if (trip.returnDate == "NOT_SET")
        {
          returnDateLabel.textContent = "No Return Date Set Yet";
          daysAway.textContent = 'Unable to calculate duration as no return date';
        }
        else 
        {
          let returnDate = new Date(trip.returnDate);
          returnDateLabel.textContent = "Return Date: "+getWrittenDate(returnDate);
          let duration = getDuration(trip.travelDate, trip.returnDate);
          daysAway.textContent = 'Trip Duration: '+duration+' Nights';
        }
        outputCard.appendChild(returnDateLabel);
        outputCard.appendChild(daysAway);
        outputArea.appendChild(outputCard);
        //Create an edit and delete button
        const editOptions = document.createElement('div');
        editOptions.className = ('controls-card');
        const editBtn = document.createElement('button');
        editBtn.className = ('control-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener("click", () => {
          window.location.assign('/neurodivergent-holiday-planner/edit-trip.html');
        });
        editOptions.appendChild(editBtn);
        editOptions.appendChild(editBtn);
        outputArea.appendChild(editOptions);
        displayAccommodationList();
      }
      else
      {
        console.log("No match, lets keep looking");
      }
    });

    //Unhide the output area
    outputArea.hidden = false;
  }
  else
  {
    console.log("No Trips Found");
    //Take some action
  }
}

function displayAccommodationList()
{
  console.log('Display Accommodation List');
  //Get the accommodation list element, 
  //Cycle through the accommodation list for matching trip id (set this globally?)
  //Add mathes to the output list (card per accommodation - start with name and give edit option)
  const accommodationListDisplay = getEl('accomodation-list');
  let matchFound = false;
  accommodations.savedAccommodation.forEach (place => {
    console.log('Checking for accommodation');
      if (place.trip == focusTrip)
      {
        //Create Output
        const placeCard = document.createElement('div');
        placeCard.className = 'output-card';
        const placeName = document.createElement('p');
        placeName.textContent = "Name: "+place.name;
        placeCard.appendChild(placeName);
        const editButton = document.createElement('button');
        editButton.className = 'control-btn';
        editButton.textContent = 'Edit';
      
        editButton.addEventListener('click', () => {
          //Get title and add to focus list then change page
          console.log("Edit Accommodation Button Clicked");
          //Need to create a global stored variable for focussed trip and then call in new app
          accFocus.focusAcc = [];
          accFocus.focusAcc.push(place.name);
          saveFocusAccommodation();
          window.location.assign('/neurodivergent-holiday-planner/edit-accommodation.html');
    
        });
        placeCard.appendChild(editButton);
        accommodationListDisplay.appendChild(placeCard);
        matchFound = true;
      }
    });
  
    if (!matchFound)
    {
      //if no matches found - display a no accommodation yet message
    }
}

//Save the focussed countdown when more selected.
function saveFocusAccommodation() {
  console.log("Save Focus Accommodation...");
  localStorage.setItem(ACC_FOCUS_KEY, JSON.stringify(accFocus));
}

//Return to the main holiday planner menu
function exitToMain()
{
  window.location.assign('/neurodivergent-holiday-planner/index.html');
}

//Go to delete trip screen
function goToDelete()
{
  window.location.assign('/neurodivergent-holiday-planner/delete-trip.html');
}

function findAccommodation()
{
  window.location.assign('https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1899707&hl=en-us');
}

function addAccommodation()
{
  window.location.assign('/neurodivergent-holiday-planner/add-accommodation.html');
}

