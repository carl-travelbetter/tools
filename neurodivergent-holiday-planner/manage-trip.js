console.log("Manage Trip");

//Load Focus Trip Pointer
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};

//Load All Saved Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

displayFocusTrip();


function displayFocusTrip()
{
  conole.log("Display Focus Trip");
  //Check that the trips have loaded.

  if (trips.saveTripList.length > 0)
  {
    console.log("Some trips have been loaded");
    //find the focus trip and display the result
    //Initially this can all be done here but we will want to break that diplay function out later
    //Lets test the focus trip by using its value to display a title
    const outputArea = document.getElementById("display-trip");
    const tripHead = document.createElement("h2");
    tripHead.textContent = "Managing Trip: "+focus.savedFocus[0];
    outputArea.appendChild('tripHead');
    outputArea.hidden = false;
  }
  else
  {
    console.log("No Trips Found");
    //Take some action
  }
}
