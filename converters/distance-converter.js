const milesToKmRate = 0.621;
   function milesToKm() {
       console.log("miles to km conversion...");
       let miles = document.getElementById("miles").value;
       console.log("Miles = "+miles);
       
       let km = (miles / milesToKmRate).toFixed(2);
       console.log("KMs = "+km);
       document.getElementById("km").value = km;
       document.getElementById("result").innerHTML = `RESULT: ${km} km is ${miles} miles`;
   }
   
   function kmToMiles() 
   {
       console.log("km to miles conversion...");
       let km = document.getElementById("km").value;
       
       
       const miles = (km * milesToKmRate).toFixed(2);
       console.log("Miles = "+miles);
       document.getElementById("miles").value = miles;
       document.getElementById("result").innerHTML = `RESULT: ${km} km is ${miles} miles`;
   }
   
   function clearValues()
   {
        console.log("Clear Function");
        document.getElementById("km").value = "";
        document.getElementById("miles").value= "";
        document.getElementById("result").innerHTML = "";
   }
