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
  getEl('load-spain-route-table')?.addEventListener("click", showSpainRouteTable);
  getEl('all-france-england')?.addEventListener("click", allFranceEngland);
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
  else if (selectedRouteID === "FSPAENG")
  {
    showFSPAENG();
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
      routeName.textContent = "Route: "+route.route;
      results.appendChild(routeName);
      let dayRouteCheck = route.dayCrossingTimeMins;
      if (dayRouteCheck > 0)
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: "+getHrsAndMinutes(route.dayCrossingTimeMins);
        results.appendChild(dayCrossingTime);
      }
      else
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: Day crossing not available on this route";
        results.appendChild(dayCrossingTime);
      }
      let nightRouteCheck = route.nightCrossingTimeMins;
      console.log('Night Route Check '+nightRouteCheck);
      if (nightRouteCheck > 0)
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: "+getHrsAndMinutes(route.nightCrossingTimeMins);
        results.appendChild(nightCrossingTime);
      }
      else
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: Night crossing not available on this route";
        results.appendChild(nightCrossingTime);
      }
      let sailings = document.createElement('p');
      sailings.textContent = "Sailings: "+route.sailings;
      results.appendChild(sailings);
      let additionalNotes = document.createElement('p');
      let noteText = route.notes || "NULL";
      //if note text is present and not NULL
      if (noteText != "NULL")
      {
        additionalNotes.textContent = "Notes: "+noteText;
        results.appendChild(additionalNotes);
      }
      let tagsList = document.createElement('ul');
      route.tags.forEach(tag => {
        let tagListItem = document.createElement('li');
        tagListItem.textContent = "⭐ "+tag;
        tagsList.appendChild(tagListItem);
      });
      const routeOptions = document.createElement('h4');
      routeOptions.textContent = "Route Options:"                               
      results.appendChild(routeOptions);
      results.appendChild(tagsList);

      const operatorHeader = document.createElement('h4');
      operatorHeader.textContent = "Route Operators:";
      results.appendChild(operatorHeader);
      //load the operators for this route
      //Go through each operator against the route
      route.operators.forEach(operatorName => {
        //Filter the operator file by the operator name, this should only return one result
        const operatorData = operators.filter(item =>
          item.operatorID.includes(operatorName)
          );
        //Although only one result, go through the result list and create an operator output
        operatorData.forEach(operator => {
          let operatorDiv = document.createElement('div');
          operatorDiv.innerHTML = `<p>⛴️ <strong>${operator.operatorName}</strong> <a href="${operator.link}" target="_blank" rel="noopener noreferrer">Check Availability</a></p>`
          results.appendChild(operatorDiv);
        });
      });
      
    }
    );
    results.hidden = false;
    getEl('alternatives').hidden = false;
    getEl('comparison-table').hidden = true;
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
   const results = getEl('results');
    results.innerHTML = "";
    const routeLookup = ferryRoutes.filter(route => 
       route.id.includes("R0001")
    );
    
    routeLookup.forEach(route => {
      let routeName = document.createElement('h3');
      routeName.textContent = "Fatest Channel Crossing: "+route.route;
      results.appendChild(routeName);
      let dayRouteCheck = route.dayCrossingTimeMins;
      if (dayRouteCheck > 0)
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: "+getHrsAndMinutes(route.dayCrossingTimeMins);
        results.appendChild(dayCrossingTime);
      }
      else
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: Day crossing not available on this route";
        results.appendChild(dayCrossingTime);
      }
      let nightRouteCheck = route.nightCrossingTimeMins;
      console.log('Night Route Check '+nightRouteCheck);
      if (nightRouteCheck > 0)
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: "+getHrsAndMinutes(route.nightCrossingTimeMins);
        results.appendChild(nightCrossingTime);
      }
      else
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: Night crossing not available on this route";
        results.appendChild(nightCrossingTime);
      }
      let sailings = document.createElement('p');
      sailings.textContent = "Sailings: "+route.sailings;
      results.appendChild(sailings);
      let tagsList = document.createElement('ul');
      route.tags.forEach(tag => {
        let tagListItem = document.createElement('li');
        tagListItem.textContent = "⭐ "+tag;
        tagsList.appendChild(tagListItem);
      });
      const routeOptions = document.createElement('h4');
      routeOptions.textContent = "Route Options:"                               
      results.appendChild(routeOptions);
      results.appendChild(tagsList);

      const operatorHeader = document.createElement('h4');
      operatorHeader.textContent = "Route Operators:";
      results.appendChild(operatorHeader);
      //load the operators for this route
      //Go through each operator against the route
      route.operators.forEach(operatorName => {
        //Filter the operator file by the operator name, this should only return one result
        const operatorData = operators.filter(item =>
          item.operatorName.includes(operatorName)
          );
        //Although only one result, go through the result list and create an operator output
        operatorData.forEach(operator => {
          let operatorDiv = document.createElement('div');
          operatorDiv.innerHTML = `<p>⛴️ <strong>${operator.operatorName}</strong> <a href="${operator.link}" target="_blank" rel="noopener noreferrer">Check Availability</a></p>`
          results.appendChild(operatorDiv);
        });
      });
      
    }
    );
    results.hidden = false;
    getEl('alternatives').hidden = false;
}

//show the fastest route from England to Spain
function showFSPAENG()
{
  console.log('Load Fastest Route');
   const results = getEl('results');
    results.innerHTML = "";
    const routeLookup = ferryRoutes.filter(route => 
       route.id.includes("R0011")
    );
    
    routeLookup.forEach(route => {
      let routeName = document.createElement('h3');
      routeName.textContent = "Fatest Channel Crossing: "+route.route;
      results.appendChild(routeName);
      let dayRouteCheck = route.dayCrossingTimeMins;
      if (dayRouteCheck > 0)
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: "+getHrsAndMinutes(route.dayCrossingTimeMins);
        results.appendChild(dayCrossingTime);
      }
      else
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: Day crossing not available on this route";
        results.appendChild(dayCrossingTime);
      }
      let nightRouteCheck = route.nightCrossingTimeMins;
      console.log('Night Route Check '+nightRouteCheck);
      if (nightRouteCheck > 0)
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: "+getHrsAndMinutes(route.nightCrossingTimeMins);
        results.appendChild(nightCrossingTime);
      }
      else
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: Night crossing not available on this route";
        results.appendChild(nightCrossingTime);
      }
      let sailings = document.createElement('p');
      sailings.textContent = "Sailings: "+route.sailings;
      results.appendChild(sailings);
      let tagsList = document.createElement('ul');
      route.tags.forEach(tag => {
        let tagListItem = document.createElement('li');
        tagListItem.textContent = "⭐ "+tag;
        tagsList.appendChild(tagListItem);
      });
      const routeOptions = document.createElement('h4');
      routeOptions.textContent = "Route Options:"                               
      results.appendChild(routeOptions);
      results.appendChild(tagsList);

      const operatorHeader = document.createElement('h4');
      operatorHeader.textContent = "Route Operators:";
      results.appendChild(operatorHeader);
      //load the operators for this route
      //Go through each operator against the route
      route.operators.forEach(operatorName => {
        //Filter the operator file by the operator name, this should only return one result
        const operatorData = operators.filter(item =>
          item.operatorName.includes(operatorName)
          );
        //Although only one result, go through the result list and create an operator output
        operatorData.forEach(operator => {
          let operatorDiv = document.createElement('div');
          operatorDiv.innerHTML = `<p>⛴️ <strong>${operator.operatorName}</strong> <a href="${operator.link}" target="_blank" rel="noopener noreferrer">Check Availability</a></p>`
          results.appendChild(operatorDiv);
        });
      });
      
    }
    );
    results.hidden = false;
    getEl('alternatives').hidden = false;
}

//function to display the route comparison table
function showTable()
{
  console.log('Channel Crossing: show table');
  getEl('results').hidden = true;
  getEl('alternatives').hidden = true;
  getEl('comparison-table').hidden = false;
  
}

function allFranceEngland()
{
  console.log("Ferry Crossing: All France from England Routes");
  //Get all to-France ferries
  let compareAllRoutes = getEl('compare-results');
  compareAllRoutes.innerHTML = "";
  const toFranceFerries = ferryRoutes.filter(route => 
       route.destinationCounty.includes("France")
  );

  //Get all those from england
 const fromEnglandFerries = toFranceFerries.filter(route =>
    route.startCountry.includes("England");
 );

  //Go through and create output
  fromEnglandFerries.forEach(route => {
      let routeName = document.createElement('h3');
      routeName.textContent = "Route: "+route.route;
      compareAllRoutes.appendChild(routeName);
      });
         
    compareAllRoutes.hidden = false;
  
}

//function to display the route comparison table
function showSpainRouteTable()
{
  console.log('Channel Crossing: show Spain Route Table');
  getEl('results').hidden = true;
  getEl('alternatives').hidden = true;
  getEl('spain-route-table').hidden = false; 
}
