console.log("Manage Trip");

//import the date helper util
import {getWrittenDate} from "/lib/date-helper.js";

//Load Focus Trip Pointer
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};

//Load All Saved Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};



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
    const outputArea = document.getElementById("display-trip");
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
        if (trip.returnDate == "NOT_SET")
        {
          returnDateLabel.textContent = "No Return Date Set Yet";
        }
        else 
        {
          let returnDate = new Date(trip.returnDate);
          returnDateLabel.textContent = "Return Date: "+getWrittenDate(returnDate);
        }
        outputCard.appendChild(returnDateLabel);
        outputArea.appendChild(outputCard);
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
