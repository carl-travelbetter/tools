console.log("Prepare For Trip");

//import the date helper util
import {getWrittenDate, getDuration} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load Focus Trip Pointer
const FOCUS_TRIP_KEY = "tb_focus_trips";
let focus = JSON.parse(localStorage.getItem(FOCUS_TRIP_KEY)) || {savedFocus: []};
const focusTrip = focus.savedFocus[0];

//Load All Saved Trips
const TRIP_KEY = "tb_trips";
let trips = JSON.parse(localStorage.getItem(TRIP_KEY)) || {savedTripList: []};

//Accommodation List
const PREPARE_KEY = "prepare_for_trips";
let prepareData = JSON.parse(localStorage.getItem(PREPARE_KEY)) || {prepareSet: []};

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() 
{
  getEl("add-item")?.addEventListener("click", addItems);
  getEl("submit-btn")?.addEventListener("click", submitItem);
  getEl("exit-btn")?.addEventListener("click", exit);
}


//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

if (prepareData.prepareSet.length > 0)
{
  displayToDoItems();
}

function addItems()
{
  getEl('create-item').hidden = false;
  getEl('add-control').hidden = true;
}

//Submit Walk
function submitItem()
{
  console.log('Submit Pre Trip To Do Item');
  let item = {};
  item.trip = focusTrip;
  item.description = getEl('item').value || "Empty";
  prepareData.prepareSet.push(item);
  getEl('item').value = "";
  saveData();
  displayToDoItems();
  //updateTracker();
}

//Display all the to-do items with an option to complete
function displayToDoItems()
{
  console.log('Display To Do Items');
  const toDoList = getEl('to-do-list');
  toDoList.innerHTML = "";
  const header = document.createElement('h2');
  header.textContent = "Pre Trip To-Do List";
  toDoList.appendChild(header);
  
  const list = document.createElement('ul');

  //Create List Header
  const listHeader = document.createElement('li');
  const listHeaderID = document.createElement('span');
  listHeaderID.className = 'span-id';
  listHeaderID.textContent = 'Num';
  listHeader.appendChild(listHeaderID);
  const listHeaderItem = document.createElement('span');
  listHeaderItem.className = 'span-longtext';
  listHeaderItem.textContent = 'To-Do Items';
  listHeader.appendChild(listHeaderItem); 
  const listHeaderAction = document.createElement('span');
  listHeaderAction.className = 'span-action';
  listHeaderAction.textContent = 'Tick off';
  listHeader.appendChild(listHeaderAction);
  list.appendChild(listHeader);

  //Create List Item
  let idx = 1;
  let pos = 0;
  const itemsForThisTrip = prepareData.prepareSet.filter(itemList => 
       itemList.trip.includes(focusTrip)
  );

  prepareData.prepareSet.forEach(item =>
  {
    if (item.trip === focusTrip)
    {
        let listItem = document.createElement('li');
        //listItem.textContent = item.description+': '+item.calories;
        let listID = document.createElement('span');
        listID.className = 'span-id';
        listID.textContent = ""+idx;
        listItem.appendChild(listID);
        let listDecription = document.createElement('span');
        listDecription.className = 'span-longtext';
        listDecription.textContent = item.description;
        listItem.appendChild(listDecription);
        
        let listComplete = document.createElement('span');
        listComplete.className = 'span-action';
        
        //create a delete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "✅";
        completeButton.setAttribute("data-label", pos);
          //Make the button do something
           //Make the button do something when clicked
        completeButton.addEventListener("click", () => {
          
          console.log("Complete Button Clicked");
          console.log("Complete ID = "+completeButton.dataset.label);
          prepareData.prepareSet.splice(completeButton.dataset.label,1);
          saveData();
          displayToDoItems() 
        });
        listComplete.appendChild(completeButton);
        listItem.appendChild(listComplete);
        list.appendChild(listItem);
        idx++;
        toDoList.appendChild(list);
    }
    else
    {
      console.log('Not this trip');
    }
    pos++;
  });
  toDoList.hidden = false;
}

//Take the item reference, find in the main set and splice out
function completeListItem(reference)
{
   console.log('Complete List Item '+reference);
   let pos = 0;
   prepareData.prepareSet.forEach(item =>
   { 
       if (item.reference === reference)
       {
          prepareData.prepareSet.splice(pos,1);
       }
       pos++
    });
   saveData(); 
}

//Save data
function saveData()
{
  console.log("Saving Data...");
  localStorage.setItem(PREPARE_KEY, JSON.stringify(prepareData));
}

function exit()
{
  window.location.assign('/neurodivergent-holiday-planner/manage-trip.html');
}
