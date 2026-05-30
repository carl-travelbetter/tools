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
}
