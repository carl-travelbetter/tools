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
  getEl('load-comparison-table').addEventlistener("click", showTable);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

//Function to display the key route details (including corssing times) and provider information
function loadResult()
{
  console.log('Channel Crossing: load results');
  
}

//function to display the route comparison table
function showTable()
{
  console.log('Channel Crossing: show table');
}
