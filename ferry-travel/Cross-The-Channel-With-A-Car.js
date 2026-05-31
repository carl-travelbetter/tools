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
    operators = data;
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
  const matchingOption = ctcwacData.filter(options => 
     options.bestFor.includes(option)
  );
  
  matchingOption.forEach(item => {
    console.log("Best For "+item.bestFor);
    let operatorNames = item.operators;
      let answerHeader = document.createElement('h2');
      answerHeader.textContent = item.description
      answer.appendChild(answerHeader);
      let solution = document.createElement('div');
      solution.innerHTML = `<p><strong>Our recommendation:</strong> ${item.solution}`;
      answer.appendChild(solution);
      let rationale = document.createElement('div');
      rationale.innerHTML = `<p><strong>Rationale:</strong> ${item.rationale}`;
      answer.appendChild(rationale);
      let operatorHeader = document.createElement('h3');
      operatorHeader.textContent = "Operators For This Route";
      answer.appendChild(operatorHeader);
      item.operators.forEach (routeOperator =>
        {
          console.log('Route Operator '+routeOperator);
          //let operatorName = document.createElement('p');
          //operatorName.textContent = routeOperator;
          //Need to look up more operator details and potentially create cards
          //answer.appendChild(operatorName);
          const matchingOperators = operators.filter(item => 
          item.operatorName.includes(routeOperator)
          );
          matchingOperators.forEach(item =>
            {
              let operatorLink = document.createElement('div'); 
              operatorLink.innerHTML = `<p><strong>${item.operatorName}</strong>: <a href="${item.link}" target="_blank" rel="noopener noreferrer">Check Availability and Book</a></p>`;
              answer.appendChild(operatorLink);
            });
        });
      answer.hidden = false;
  });
 
}
