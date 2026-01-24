console.log("Travelbetter Neurodivergent Holiday Planner");

//Load saved data
//Load Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

function loadTrips()
{
  console.log("Load Trips");

  //Check if any trips are saved
  if (trips.savedTripList.length === 0)
  {
    console.log("No Trips Saved");
    displayNoSavedTrips();
  }
  else
  {
    displaySavedTrips();
  }
}

//Load the create trip options when the user clicks on create new trip
function loadCreateTripOptions()
{
  console.log("Display Create Trip");
  document.getElementById("trip-title").value = "";
  document.getElementById("create-trip").hidden = false;
}

//create a new trip when the user hits save
function createTrip()
{
  console.log("Creating new trip");
  const trip = {};
  //Grab each value and create a new trip object
  
  const tripTitle = document.getElementById("trip-title").value;
  if (tripTitle == null)
  {
    console.log("Error - no trip title entered");
    return;
  }
  else
  {
    trip.title = tripTitle;
    trips.savedTripList.push(trip);
    saveTrips();
    document.getElementById("create-trip").hidden = true;
  }

   
  //Manage empty / optional inputs
  //Create blanks in trip object
  //load trip object to trips list and then call save option
}

//Display a helpful message saying no saved trips and provide an option to create a trip or see help files
function displayNoSavedTrips()
{
  console.log("Display No Saved Trips");
}

function saveTrips() {
  console.log("Saving Trips...");
  localStorage.setItem(TRIP_KEY, JSON.stringify(trips));
}

//Display the saved trips with summary data and provide a manage trip option
function displaySavedTrips()
{
  console.log("Load Saved Trips");
}
