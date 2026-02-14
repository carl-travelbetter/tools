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
  getEl("create-trip-btn")?.addEventListener("click", createTrip);
  getEl("cancel-trip-btn")?.addEventListener("click", cancelCreateTrip);
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
       /* 
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
          window.open("/neurodivergent-holiday-planner/edit-trip.html");
        });
        editOptions.appendChild(editBtn);
        editOptions.appendChild(editBtn);
        outputArea.appendChild(editOptions);
        */
      }
      else
      {
        console.log("No match, lets keep looking");
      }
    });

  
}
