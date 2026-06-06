console.log('Channel Crossing JS');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let ferryRoutes = [];

fetch('ferry-routes.json')
  .then(response => response.json())
  .then(data => {
    ferryRoutes = data;
    console.log("Cross The Channel With A Car data loaded:", ferryRoutes);
    getEl('data-loading').hidden = true;
    getEl('crossing-options').hidden = false;
    getEl('load-comparison-table').hidden = false;
  })
  .catch(error => console.error("Error loading Ferry Routes:", error));

//Load the Ferry Operator Data
let operators = [];

fetch('ferry-operators.json')
  .then(response => response.json())
  .then(data => {
    operators = data;
    console.log("Ferry Operator Data Loaded:", operators);
  })
  .catch(error => console.error("Error loading Ferry Operator Data:", error));

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('crossings')?.addEventListener("change", loadResults); 
  getEl('load-table')?.addEventListener("click", showTable);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

//Function to display the key route details (including corssing times) and provider information
function loadResults()
{
  console.log('Channel Crossing: load results');
  const selectedRouteID = getEl('crossings').value;
 
  console.log('Value selected '+selectedRouteID);
  if (selectedRouteID === "fastest")
  {
    showFastestRoute();
  }
  else
  {
    const results = getEl('results');
    results.innerHTML = "";
    const routeLookup = ferryRoutes.filter(route => 
       route.id.includes(selectedRouteID)
    );
    
    routeLookup.forEach(route => {
      let routeName = document.createElement('h3');
      routeName.textContent = "Route Name "+route.route;
      results.appendChild(routeName);   
      let dayCrossingTime = document.createElement('p');
      crossingTime.textContent = "Crossing Time: "+getHrsAndMinutes(route.dayCrossingTimeMins);
      results.appendChild(crossingTime);
    }
    );
    results.hidden = false;
  }
}

//function to return the hours and minutes from total minutes
function getHrsAndMinutes(totalMinutes)
{
  console.log('Turning '+totalMinutes+' to Hrs and Minutes');
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const hourText = hours === 1 ? 'hr' : 'hrs';
  const minuteText = minutes === 1 ? 'min' : 'mins';

  if (hours === 0) return `${minutes} ${minuteText}`;
  if (minutes === 0) return `${hours} ${hourText}`;

  return `${hours} ${hourText} ${minutes} ${minuteText}`;
}


function showFastestRoute()
{
  console.log('Load Fastest Route');
}

//function to display the route comparison table
function showTable()
{
  console.log('Channel Crossing: show table');
  getEl('comparison-table').hidden = false;
}
