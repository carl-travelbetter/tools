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
   countdownOutput.innerHTML = "";
   countdownOutput.hidden = false;
   info('Create Minutes Until');
   let seconds = 59;
   let minutes = Number(range.value)-1;
    
   // Update the count down every 1 second
   var x = setInterval(function() {

  

   // Clear the timer
   countdownOutput.innerHTML = "";
   const countdown = document.createElement('p');
   countdown.textContent = minutes+" Mins "+seconds+" Seconds to go";
   countdownOutput.appendChild(countdown);    

   seconds = seconds - 1;
   if (seconds == 0)
   {
       seconds = 59;
       minutes = minutes - 1;

       //If countdown complete (no minutes left)
       if (minutes < 0)
       {
           info('Countdown Complete')
           clearInterval(x);
       }
   } 
       
  }, 1000);
    
}


//Simple output to apply some useful information
function info(message)
{
  console.log("Minutes Until - INFO:"+message); 
  
}

