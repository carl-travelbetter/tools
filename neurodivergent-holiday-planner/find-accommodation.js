console.log("Find Accommodation");

let accommodationTags = [];
let activeTags = [];
//Load Accommodation Tag data
fetch('/lib/tags/accommodation-tags.json')
  .then(response => response.json())
  .then(data => {
    accommodationTags = data;
    console.log("Accommodation Tags loaded:", accommodationTags);
    createAccommodationTagButtons(); // load tag buttons
  })
  .catch(error => console.error("Error loading accommodation tag data:", error));

let placesToStay = [];
let selectedPlaces = [];
//Load Accommodation Tag data
fetch('/lib/data/places-to-stay.json')
  .then(response => response.json())
  .then(data => {
    placesToStay = data;
    console.log("places data loaded:", placesToStay);
  })
  .catch(error => console.error("Error loading places data:", error));

//Import Dom utils
import {getWrittenDate, getDuration, addDays} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

//Load Focus Trip
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};
let focusTrip = focus.savedFocus[0];

//Load Focus Accommodation
const ACC_FOCUS_KEY = "tb_focus_accom";
let accFocus = JSON.parse(localStorage.getItem(ACC_FOCUS_KEY)) || {focusAcc: []};
//Set the focus accommodation for load and save
let focusAccommodation = accFocus.focusAcc[0];

let tripData;
//Find the trip and get the departure date if known
trips.savedTripList.forEach(trip => {
  if (trip.title == focusTrip)
  {
    tripData = trip;
  }
});

//Accommodation List
const ACCOM_TRIP_KEY = "tb_trips_accom";
let accommodations = JSON.parse(localStorage.getItem(ACCOM_TRIP_KEY)) || {savedAccommodation: []};

//Setup default no value entered variable
const NOT_SET = "NOT_SET";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl("whereto")?.addEventListener("input", searchForMatchingPlaces);
  getEl("save")?.addEventListener("click", saveAccommodation);
  getEl("cancel")?.addEventListener("click", cancel);
  getEl('delete')?.addEventListener("click", deleteAccommodation);
  getEl("duration")?.addEventListener("input", calcDepartureDate);
  getEl("departure-date")?.addEventListener("change", calcDuration);
  getEl("arrival-date")?.addEventListener("change", calcDuration);
  getEl("open-g-maps")?.addEventListener("click", openGoogleMaps);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);



function cancel()
{
  console.log("Cancel Edit Accommodation");
  window.location.assign('/neurodivergent-holiday-planner/manage-trip.html');
}

const limit = 8;

const resultsEl = getEl('where-results');

let activeIndex = -1;          // for keyboard navigation
let currentResults = [];       // stores last rendered matches

//function to start searching for a place as user enters some data
function searchForMatchingPlaces()
{
  console.log('Search for matching places');
  const str = normalize(getEl('whereto').value);
  if (str.length < 3)
  {
    currentResults = [];
    resultsEl.hidden = true;
  }
  else
  {
    console.log('normalized serach '+str);
    const scored = placesToStay
      .map(place => ({ place, score: score(str, place) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(x => x.place);
  
    //Send the scored and filtered results tp be displayed
    displayPlaceSearch(scored);
  }
}

//Normalize the input string to remove elements
function normalize(input)
{
  const normalizedTerm = input.toLowerCase().trim().replace(/\s+/g, " ");
  return normalizedTerm;
}

//Score matches and return the top 8
function score(query, place)
{
 

  //Set the score
  let score = 0;
  // Combine searchable fields
  const name = normalize(place.name);
  const city = normalize(place.location?.city);
  const region = normalize(place.location?.region);
  const country = normalize(place.location?.country);

  if (query === name) score += 100;
  if (query === city) score += 90;

// Prefix matches
  if (name.startsWith(query)) score += 70;
  if (city.startsWith(query)) score += 60;

  // Contains matches
  if (name.includes(query)) score += 40;
  if (city.includes(query)) score += 35;
  if (region.includes(query)) score += 20;
  if (country.includes(query)) score += 10;
  
  return score;  
}

//Show the options in the where bar to allow auser to select based on input so far
function displayPlaceSearch(places)
{
  console.log('Display Place Search');

  currentResults = places;
  activeIndex = -1;

  if (!places.length) {
    resultsEl.hidden = true;
    resultsEl.innerHTML = "";
    return;
  }

  const html = places.map((acc, idx) => {
    const title = acc.name;
    const sub = acc.location.city+", "+acc.location.country;
    return `
      <div class="match-result-item" role="option" data-idx="${idx}" aria-selected="false">
        <div class="match-result-title">${title}</div>
        <div class="match-result-sub">${sub}</div>
      </div>
    `;
  }).join("");

  resultsEl.innerHTML = html;
  resultsEl.hidden = false
  
}

function calcDepartureDate()
{
  const start = getEl("arrival-date").value;
  const duration = parseInt(getEl("duration").value, 10);

  if (!start || isNaN(duration)) return;

  getEl("departure-date").value = addDays(start, duration);
}

function calcDuration()
{
    const start = getEl('arrival-date').value;
    const end = getEl('departure-date').value;

    //If arrival date or departure date is missing, stop calc
    if (!start || !end) return;
  
    getEl('duration').value = getDuration(start, end);
}

function openGoogleMaps()
{
  const currentURL = getEl('g-map').value;
  if (!currentURL)
  {
    window.open("https://www.google.com/maps/", "_blank", "noopener");
  }
  else
  {
    window.open(currentURL, "_blank", "noopener");
  }
}

// --- 4) Select a result ---
function selectResult(index) {
  const acc = currentResults[index];
  if (!acc) return;

  // Fill the input with something friendly
  getEl('whereto').value = `${acc.name} — ${acc.location.city}`;

  closeResults();
}

//Close the match results once an item is selected
function closeResults() {
  resultsEl.hidden = true;
  resultsEl.innerHTML = "";
  currentResults = [];
  activeIndex = -1;
}



getEl('whereto').addEventListener("keydown", (e) => {
  if (resultsEl.hidden) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
    updateActiveItem();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    updateActiveItem();
  }

  if (e.key === "Enter") {
    // If user hasn't moved highlight, pick first result
    if (activeIndex === -1 && currentResults.length) {
      e.preventDefault();
      selectResult(0);
    } else if (activeIndex >= 0) {
      e.preventDefault();
      selectResult(activeIndex);
    }
  }

  if (e.key === "Escape") {
    closeResults();
  }
});

//Takes care of mouse selection
resultsEl.addEventListener("mousedown", (e) => {
  const item = e.target.closest(".match-result-item");
  if (!item) return;

  selectResult(Number(item.dataset.idx));
});

function updateActiveItem() {
  const items = resultsEl.querySelectorAll(".match-result-item");
  items.forEach((el, i) => {
    el.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
  });
}

//Create the tag - special needs buttons
function createAccommodationTagButtons()
{
  console.log('Create Accommodation Tag Buttons');
  const container = getEl('sensory-needs');
  
  if (!accommodationTags.length) return;

  accommodationTags.forEach(tag => {
    const button = document.createElement("button");
    button.className = "tag-btn";
    button.setAttribute("data-tag", tag.Id);
    button.innerHTML = `${tag.Icon} ${tag.Label}`;

    //add to description
    //const desP = document.createElement("p");
    //desP.innerHTML = `${tag.Icon} <strong>${tag.Label}</strong>: ${tag.Description}`;
    
    
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    
      activeTags = Array.from(document.querySelectorAll('.tag-btn.active'))
        .map(btn => btn.dataset.tag);
    
     
});
    
    //descriptions.appendChild(desP);
    container.appendChild(button);
  });
}
