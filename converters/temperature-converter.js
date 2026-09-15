console.log('temperature-converter');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import {getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('celcius')?.addEventListener("keyup", convertCelcius);
  getEl('fahrenheit')?.addEventListener("keyup", convertFahrenheit);
  getEl('kelvin')?.addEventListener("keyup", convertKelvin);
  getEl('clear-btn')?.addEventListener("click", clearValues);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function convertCelcius()
{
  console.log('Converting Celcius');
  getEl('fahrenheit').value = 8;
}

function convertFahrenheit()
{
  console.log('Converting Fahrenheit');
}

function convertKelvin()
{
  console.log('Converting Kelvin');
}

function clearValues()
{
  console.log('Clear Values');
  getEl('celcius').value = "";
  getEl('fahrenheit').value = "";
  getEl('kelvin').value = "";
}
          
