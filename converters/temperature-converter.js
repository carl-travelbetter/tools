console.log('temperature-converter');

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import {getEl, getText, getDate} from "/lib/dom.js";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('celcius')?.addEventListener("keyup", convertCelcius);
  getEl('fahrenheit')?.addEventListener("keyup", convertFahrenheit);
  getEl('kelvin')?.addEventListener("keyup", convertKelvin);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

function convertCelcius()
{
  console.log('Converting Celcius');
}

function convertFahrenheit()
{
  console.log('Converting Fahrenheit');
}

function convertKelvin()
{
  console.log('Converting Kelvin');
}
          
