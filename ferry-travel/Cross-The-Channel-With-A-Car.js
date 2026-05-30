console.log('Cross The Channel With A Car (CTCWAC)');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Data
let ctcwacData = [];

fetch('CTCWAC.json')
  .then(response => response.json())
  .then(data => {
    ctcwacData = data;
    console.log("Cross The Channel With A Car data loaded:", ctcwacData);
    getEl('data-loading').hidden = true;
    getEl('crossing-options').hidden = false;
  })
  .catch(error => console.error("Error loading Cross The Channel With A Car data:", error));

//Load the Ferry Operator Data
let operators = [];

fetch('ferry-operators.json')
  .then(response => response.json())
  .then(data => {
    ctcwacData = data;
    console.log("Ferry Operator Data Loaded:", operators);
  })
  .catch(error => console.error("Error loading Ferry Operator Data:", error));

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('travelOption')?.addEventListener("change", loadResult);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function loadResult()
{
  console.log('CTCWAC - Load Result');
  let option = getEl('travelOption').value;
  console.log('Option Selected '+option);
  const answer = getEl('results');
  answer.innerHTML = "";
  ctcwacData.forEach (item => {
    if (item.bestFor == option)
    {
      let operatorNames = item.operators;
      let answerHeader = document.createElement('h2');
      answerHeader.textContent = "Cross Channel Ferry With A Car: "+option;
      answer.appendChild(answerHeader);
      let reason = document.createElement('p');
      reason.textContent = item.reason;
      answer.appendChild(reason);
      let route = document.createElement('p');
      route.textContent = item.route;
      answer.appendChild(route);
      let operatorHeader = document.createElement('h3');
      operatorHeader.textContent = "Opertor(s)";
      answer.appendChild(operatorHeader);
      item.operators.forEach (op =>
        {
          let operatorName = document.createElement('p');
          operatorName.textContent = op;
          //Need to look up more operator details and potentially create cards
          answer.appendChild(op);
        });
      answer.hidden = false;
      
    }
    else
    {
      console.log('No match - The Search Continues');
    }
    
 
}
