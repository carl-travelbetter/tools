info('Minutes Until Initialised');

info('Creating Minutes Until Countdown');

const range = document.getElementById("minutes");
const valueEl = document.getElementById("minutesValue");
const unitEl = document.getElementById("minutesUnit");

function updateMinutesLabel() {
    info('Update Minutes Label');
    const mins = Number(range.value);
    valueEl.textContent = mins;
    unitEl.textContent = mins === 1 ? "minute" : "minutes";
  }

  // Update live while dragging
  range.addEventListener("input", updateMinutesLabel);

  // Ensure correct label on page load
  updateMinutesLabel();

function createMinutesUntil()
{
   const countdownOutput = document.getElementById('countdown');
   document.getElementById('countdown-complete').hidden = true;
   
   info('Create Minutes Until');
   let seconds = 59;
   let minutes = Number(range.value)-1;
    
   // Update the count down every 1 second
   var x = setInterval(function() {

  

   // Clear the timer
   countdownOutput.innerHTML = "";
   const countdownCard = document.createElement('div');
   countdownCard.className = "output-card";
   const countdownHeader = document.createElement('h2');
   countdownHeader.textContent = 'Countdown Running...';
   countdownCard.appendChild(countdownHeader);
   const countdown = document.createElement('p');
   countdown.className = "countdown-font";
   countdown.textContent = minutes+" Mins "+seconds+" Seconds to go";
   countdownCard.appendChild(countdown);    
   countdownOutput.appendChild(countdownCard);    
   countdownOutput.hidden = false; 
   seconds = seconds - 1;
   if (seconds < 0)
   {
       seconds = 59;
       minutes = minutes - 1;

       //If countdown complete (no minutes left)
       if (minutes < 0)
       {
           info('Countdown Complete')
           clearInterval(x);
           countdownOutput.hidden = true;
           displayComplete();
       }
   } 
       
  }, 1000);
    
}

//Quick timer for 1 minute
function oneMinute()
{
    info('1 minute');
    range.value = 1;
    createMinutesUntil();
}

//Quick timer for 5 minutes
function fiveMinutes()
{
    info('5 minutes');
    range.value = 5;
    createMinutesUntil();
}

//Quick timer for 10 minutes
function tenMinutes()
{
    info('10 minutes');
    range.value = 10;
    createMinutesUntil();
}

//Quick timer for 15 minutes
function fifteenMinutes()
{
    info('15 minutes');
    range.value = 15;
    createMinutesUntil();
}

//Quick timer for 25 minutes
function twentyfiveMinutes()
{
    info('25 minutes');
    range.value = 25;
    createMinutesUntil();
}

//Quick timer for 59 minutes
function fiftynineMinutes()
{
    info('59 minutes');
    range.value = 59;
    createMinutesUntil();
}


//Display the countdown complete area
function displayComplete()
{
    info('Display Countdown Complete');
    document.getElementById('countdown-complete').hidden = false;
}

//Simple output to apply some useful information
function info(message)
{
  console.log("Minutes Until - INFO:"+message); 
}


