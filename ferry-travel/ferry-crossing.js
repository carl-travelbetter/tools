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
    console.log("Ferry Route Data Loaded:", ferryRoutes);
    getEl('data-loading').hidden = true;
    getEl('crossing-options').hidden = false;
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
  getEl('route-option')?.addEventListener("change", processOption);
  getEl('time-option')?.addEventListener("change", processTimeOption);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function processOption()
{
  console.log('Ferry Crossings: Process Option');
  const optionSelected = getEl('route-option').value;
  console.log('Process Option: Value selected = '+optionSelected);
  let routeElements = optionSelected.split(",");
  console.log('Process Options: routeElements = '+routeElements);

  let startCountry = routeElements[0];
  let startPort = routeElements[1];
  let destinationCountry = routeElements[2];
  let destinationPort = routeElements[3];
 
  const startCountryRoutes = ferryRoutes.filter(route => 
       route.startCountry.includes(startCountry)
    );

  const startPortRoutes = startCountryRoutes.filter(route =>
    route.startPort.includes(startPort)
    );

  const destinationCountryRoutes = startPortRoutes.filter(route =>
    route.destinationCountry.includes(destinationCountry)
    );

  const destinationPortRoutes = destinationCountryRoutes.filter(route =>
    route.destinationPort.includes(destinationPort)
  );
  displayResults(destinationPortRoutes);
  
}

//Process Time Comparison Options
function processTimeOption()
{
  console.log('Ferry Crossings: Process Option');
  const optionSelected = getEl('time-option').value;
  console.log('Process Option: Value selected = '+optionSelected);
  let routeElements = optionSelected.split(",");
  console.log('Process Options: routeElements = '+routeElements);

  let startCountry = routeElements[0];
  let startPort = routeElements[1];
  let destinationCountry = routeElements[2];
  let destinationPort = routeElements[3];
 
  const startCountryRoutes = ferryRoutes.filter(route => 
       route.startCountry.includes(startCountry)
    );

  const startPortRoutes = startCountryRoutes.filter(route =>
    route.startPort.includes(startPort)
    );

  const destinationCountryRoutes = startPortRoutes.filter(route =>
    route.destinationCountry.includes(destinationCountry)
    );

  const destinationPortRoutes = destinationCountryRoutes.filter(route =>
    route.destinationPort.includes(destinationPort)
  );
  displayTimeResults(destinationPortRoutes);
  
}

//
function displayResults(routes)
{
  console.log('Display Results ');

  const results = getEl('results');
  results.innerHTML = "";

   routes.forEach(route => {
      const routeCard = document.createElement('div');
      routeCard.className = 'display-card';
      let routeName = document.createElement('h3');
      routeName.textContent = "Route: "+route.route;
      routeCard.appendChild(routeName);
      let dayRouteCheck = route.dayCrossingTimeMins;
      if (dayRouteCheck > 0)
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: "+getHrsAndMinutes(route.dayCrossingTimeMins);
        routeCard.appendChild(dayCrossingTime);
      }
      else
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: Day crossing not available on this route";
        routeCard.appendChild(dayCrossingTime);
      }
      let nightRouteCheck = route.nightCrossingTimeMins;
      console.log('Night Route Check '+nightRouteCheck);
      if (nightRouteCheck > 0)
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: "+getHrsAndMinutes(route.nightCrossingTimeMins);
        routeCard.appendChild(nightCrossingTime);
      }
      else
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: Night crossing not available on this route";
        routeCard.appendChild(nightCrossingTime);
      }
      let sailings = document.createElement('p');
      sailings.textContent = "Sails: "+route.sailDays;
      routeCard.appendChild(sailings);
      let crossings = document.createElement('p');
      crossings.textContent = "Crossings Per Day: "+route.sailingsPerDay;
      routeCard.appendChild(crossings);
      let additionalNotes = document.createElement('p');
      let noteText = route.notes || "NULL";
      //if note text is present and not NULL
      if (noteText != "NULL")
      {
        additionalNotes.textContent = "Notes: "+noteText;
        routeCard.appendChild(additionalNotes);
      }
      let tagsList = document.createElement('ul');
      route.tags.forEach(tag => {
        let tagListItem = document.createElement('li');
        tagListItem.textContent = "⭐ "+tag;
        tagsList.appendChild(tagListItem);
      });
      const routeOptions = document.createElement('h4');
      routeOptions.textContent = "Route Options:"                               
      routeCard.appendChild(routeOptions);
      routeCard.appendChild(tagsList);

      const operatorHeader = document.createElement('h4');
      operatorHeader.textContent = "Route Operators:";
      routeCard.appendChild(operatorHeader);
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
          operatorDiv.innerHTML = `<p>⛴️ <strong>${operator.operatorName}</strong> <a href="${operator.link}" target="_blank" rel="noopener noreferrer">Check Availability</a></p>`;
          routeCard.appendChild(operatorDiv);
        });
      });
    results.appendChild(routeCard);
    getEl('intro').hidden = true;
    results.hidden = false;
    getEl('alternatives').hidden = false;
  });
}

//
function displayTimeResults(routes)
{
  console.log('Display Results ');

  const results = getEl('results');
  results.innerHTML = "";

   routes.forEach(route => {
      const routeCard = document.createElement('div');
      routeCard.className = 'display-card';
      let routeName = document.createElement('h3');
      routeName.textContent = "Route: "+route.route;
      routeCard.appendChild(routeName);
      let dayRouteCheck = route.dayCrossingTimeMins;
      if (dayRouteCheck > 0)
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: "+getHrsAndMinutes(route.dayCrossingTimeMins);
        routeCard.appendChild(dayCrossingTime);
      }
      else
      {
        let dayCrossingTime = document.createElement('p');
        dayCrossingTime.textContent = "Day Crossing Time: Day crossing not available on this route";
        routeCard.appendChild(dayCrossingTime);
      }
      let nightRouteCheck = route.nightCrossingTimeMins;
      console.log('Night Route Check '+nightRouteCheck);
      if (nightRouteCheck > 0)
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: "+getHrsAndMinutes(route.nightCrossingTimeMins);
        routeCard.appendChild(nightCrossingTime);
      }
      else
      {
        let nightCrossingTime = document.createElement('p');
        nightCrossingTime.textContent = "Night Crossing Time: Night crossing not available on this route";
        routeCard.appendChild(nightCrossingTime);
      }
      let sailings = document.createElement('p');
      sailings.textContent = "Sails: "+route.sailDays;
      routeCard.appendChild(sailings);
      let crossings = document.createElement('p');
      crossings.textContent = "Crossings Per Day: "+route.sailingsPerDay;
      routeCard.appendChild(crossings);
      const operatorHeader = document.createElement('h4');
      operatorHeader.textContent = "Route Operators:";
      routeCard.appendChild(operatorHeader);
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
          operatorDiv.innerHTML = `<p>⛴️ <strong>${operator.operatorName}</strong> <a href="${operator.link}" target="_blank" rel="noopener noreferrer">Check Availability</a></p>`;
          routeCard.appendChild(operatorDiv);
        });
      });
    results.appendChild(routeCard);
    results.hidden = false;
    getEl('alternatives').hidden = false;
    getEl('comparison-table').hidden = true;
  });
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

