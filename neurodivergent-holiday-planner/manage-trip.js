console.log("Manage Trip");

//import the date helper util
import {getWrittenDate, getDuration} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Focus Trip Pointer
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};

//Load All Saved Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() 
{
  getEl("delete-trip-btn")?.addEventListener("click", goToDelete);
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
    //Get the focus trip and assign to a variable
    const focusTrip = focus.savedFocus[0];
    
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

function goToDelete()
{
  window.location.assign('/neurodivergent-holiday-planner/delete-trip.html');
}

