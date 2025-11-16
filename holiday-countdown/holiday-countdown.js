console.log("Holiday Countdown");

function createHolidayCountdown()
{
  console.log("Creating Holiday Countdown Timer");
  const title = document.getElementById("trip-name").value;
  console.log("Trip Name = "+title);
}
  
function oldCode()  
{
/*  p.style.display = "none";
document.getElementById("today").innerHTML = "Calculating Time...";

let travelDay = document.getElementById("travelDate").valueAsDate;

let x = setInterval(function()
{
let date1 = new Date();
let millSecToGo = travelDay.getTime() - date1.getTime();


// Time calculations for hours, minutes and seconds
let days = Math.floor(millSecToGo / (1000 * 60 * 60 * 24));
let hours = Math.floor((millSecToGo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((millSecToGo % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((millSecToGo % (1000 * 60)) / 1000);



document.getElementById("today").innerHTML = days+"d "+hours+"h "+minutes+"m "+seconds+"s ";
}, 1000);*/
}

