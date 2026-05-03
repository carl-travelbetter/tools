console.log('Push and Pull Goal Manager');

//Import Dom utils
import {getWrittenDate, getDuration, addDays, getDayOfYear} from "/lib/date-helper.js";
import { getEl, getText, getDate} from "/lib/dom.js";

//Load saved data
//Load Push and Pull Lists
const PUSH_LIST_KEY = "push-list-wl";
let pushList = JSON.parse(localStorage.getItem(PUSH_LIST_KEY)) || {pushItems: []};

const PULL_LIST_KEY = "pull-list-wl";
let pullList = JSON.parse(localStorage.getItem(PULL_LIST_KEY)) || {pullItems: []};

//Setup default no value entered variable
const NOT_SET = "BLANK";

//Set events for button clicks in document (will be applied to all dom objects (pages) that call this js
function bindEvents() {
  getEl('add-push-btn')?.addEventListener("click", addPush);
  getEl('add-pull-btn')?.addEventListener("click", addPull);
  getEl('submit-push-btn')?.addEventListener("click", createPushGoal);
  getEl('submit-pull-btn')?.addEventListener("click", createPullGoal);
  getEl('cancel-push-btn')?.addEventListener("click", cancelPushGoal);
  getEl('cancel-pull-btn')?.addEventListener("click", cancelPullGoal);
  getEl('exit-btn')?.addEventListener("click", exitTool);
}

//Ensure html bindings are not applied until the html structure is built
document.addEventListener("DOMContentLoaded", bindEvents);

//Display the saved goals
displayPushGoals();
displayPullGoals();

//open add item controls
function addPush()
{
  console.log('Add Push Goal');
  getEl('push-goal').value = "";
  getEl('add-push').hidden = false;
}

//open add item controls
function addPull()
{
  console.log('Add Pull Goal');
  getEl('pull-goal').value = "";
  getEl('add-pull').hidden = false;
}

//Create a push goal and update the displayed list
function createPushGoal()
{
  console.log('Create Push Goal');
  let goal = getEl('push-goal').value || "No Goal Entered";
  pushList.pushItems.push(goal);
  saveData();
  displayPushGoals();
  getEl('add-push').hidden = true;
}

//saveData
function saveData()
{
  console.log('save data');
  localStorage.setItem(PULL_LIST_KEY, JSON.stringify(pullList));
  localStorage.setItem(PUSH_LIST_KEY, JSON.stringify(pushList));
}

//display the later push goals
function displayPushGoals()
{
  console.log('display the latest push goals');
  const pushGoalsList = getEl('push-list');
  pushGoalsList.innerHTML = "";
  const list = document.createElement('ul');

  //Create a header row for the list
  const listHeader = document.createElement('li');
  const listHeaderID = document.createElement('span');
  listHeaderID.className = 'span-id';
  listHeaderID.textContent = 'Item';
  listHeader.appendChild(listHeaderID);
  const listHeaderItem = document.createElement('span');
  listHeaderItem.className = 'span-text';
  listHeaderItem.textContent = 'Goal';
  listHeader.appendChild(listHeaderItem);
  //const listHeaderValue = document.createElement('span');
  //listHeaderValue.className = 'span-value';
  //listHeaderValue.textContent = 'Area';
  //listHeader.appendChild(listHeaderValue);
  const listHeaderAction = document.createElement('span');
  listHeaderAction.className = 'span-action';
  listHeaderAction.textContent = 'Delete Item';
  listHeader.appendChild(listHeaderAction);

  list.appendChild(listHeader);
  
  
  let idx = 0;
  pushList.pushItems.forEach (item => {
    idx++; 
    let listItem = document.createElement('li');
    //listItem.textContent = item.description+': '+item.calories;
    let listID = document.createElement('span');
    listID.className = 'span-id';
    listID.textContent = ""+idx;
    listItem.appendChild(listID);
    let listDescription = document.createElement('span');
    listDescription.className = 'span-text';
    listDescription.textContent = item;
    listItem.appendChild(listDescription);
    //let listCalories = document.createElement('span');
    //listCalories.className = 'span-value';
    //listCalories.textContent = "TBC";
    //listItem.appendChild(listCalories);
    let listDeleteControl = document.createElement('span');
    listDeleteControl.className = 'span-action';
    
    //create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("data-label", idx-1);
      //Make the button do something
       //Make the button do something when clicked
      deleteButton.addEventListener("click", () => {
      
      console.log("Delete Goal Button Clicked");
      console.log("Delete ID = "+deleteButton.dataset.label);   
      pushList.pushItems.splice(deleteButton.dataset.label, 1); 
      saveData();  
      displayPushGoals();
      });
      listDeleteControl.appendChild(deleteButton);
      listItem.appendChild(listDeleteControl);
      list.appendChild(listItem);
  });
  pushGoalsList.appendChild(list);
  pushGoalsList.hidden = false;
}

//display the later pull goals
function displayPullGoals()
{
  console.log('display the latest pull goals');
  const pullGoalsList = getEl('pull-list');
  pullGoalsList.innerHTML = "";
  const list = document.createElement('ul');

  //Create a header row for the list
  const listHeader = document.createElement('li');
  const listHeaderID = document.createElement('span');
  listHeaderID.className = 'span-id';
  listHeaderID.textContent = 'Item';
  listHeader.appendChild(listHeaderID);
  const listHeaderItem = document.createElement('span');
  listHeaderItem.className = 'span-text';
  listHeaderItem.textContent = 'Goal';
  listHeader.appendChild(listHeaderItem);
  //const listHeaderValue = document.createElement('span');
  //listHeaderValue.className = 'span-value';
  //listHeaderValue.textContent = 'Area';
  //listHeader.appendChild(listHeaderValue);
  const listHeaderAction = document.createElement('span');
  listHeaderAction.className = 'span-action';
  listHeaderAction.textContent = 'Delete Item';
  listHeader.appendChild(listHeaderAction);

  list.appendChild(listHeader);
  
  
  let idx = 0;
  pullList.pullItems.forEach (item => {
    idx++; 
    let listItem = document.createElement('li');
    //listItem.textContent = item.description+': '+item.calories;
    let listID = document.createElement('span');
    listID.className = 'span-id';
    listID.textContent = ""+idx;
    listItem.appendChild(listID);
    let listDescription = document.createElement('span');
    listDescription.className = 'span-text';
    listDescription.textContent = item;
    listItem.appendChild(listDescription);
    //let listCalories = document.createElement('span');
    //listCalories.className = 'span-value';
    //listCalories.textContent = "TBC";
    //listItem.appendChild(listCalories);
    let listDeleteControl = document.createElement('span');
    listDeleteControl.className = 'span-action';
    
    //create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("data-label", idx-1);
      //Make the button do something
       //Make the button do something when clicked
      deleteButton.addEventListener("click", () => {
      
      console.log("Delete Goal Button Clicked");
      console.log("Delete ID = "+deleteButton.dataset.label);   
      pullList.pullItems.splice(deleteButton.dataset.label, 1); 
      saveData();  
      displayPullGoals();
      });
      listDeleteControl.appendChild(deleteButton);
      listItem.appendChild(listDeleteControl);
      list.appendChild(listItem);
  });
  pullGoalsList.appendChild(list);
  pullGoalsList.hidden = false;
}


//Create a push goal and update the displayed list
function createPullGoal()
{
  console.log('Create Pull Goal');
  let goal = getEl('pull-goal').value || "No Goal Entered";
  pullList.pullItems.push(goal);
  saveData();
  displayPullGoals();
  getEl('add-pull').hidden = true;
}

//Cancel creating a push goal
function cancelPushGoal()
{
  console.log('Cancel Push Goal');
  getEl('add-push').hidden = true;
}

//Cancel creating a pull goal
function cancelPullGoal()
{
  console.log('Cancel Pull Goal');
  getEl('add-pull').hidden = true;
}

//Exit Tool
function exitTool()
{
  window.location.assign('https://tools.travelbetter.co.uk/');
}

