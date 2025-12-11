let ferryData = [];

fetch('ferryData.json')
  .then(response => response.json())
  .then(data => {
    ferryData = data;
    console.log("Ferry data loaded:", ferryData);
  })
  .catch(error => console.error("Error loading ferry data:", error));


function searchByCrossing() {
    const results = document.getElementById("crossingResults");
    results.innerHTML = "";
    console.log("Search By Crossing");
    let route = document.getElementById("ferryRoute").value;
    console.log("Route Selected "+route);
    const matchingFerries = ferryData.filter(ferry => 
     ferry.crossings.includes(route)
     );
    
     matchingFerries.forEach(ferry => {
         console.log("Ferry Operator "+ferry.operator);
         const card = document.createElement("div");
         card.classList.add("ferryCard");
         card.innerHTML = `
        <h3>${ferry.operator}</h3>
        <p><strong>Travelbetter Rating:</strong> ⭐ ${ferry.travelbetterRating} / 5</p>
        <p><strong>Amendments:</strong> ${ferry.amendments}</p>
        <p><strong>Cancellations:</strong> ${ferry.cancellations}</p>
        <p><a href="${ferry.link}" target="_blank" rel="noopener noreferrer">Book with ${ferry.operator} today</a></p>
    `;
    results.appendChild(card);
         
     });
}

function searchByProvider() {

    const selectedProvider = document.getElementById("ferryProvider").value;
    const results = document.getElementById("providerResults");
    results.innerHTML = `<h3>Provider Result</h3>`;

    const matching = ferryData.find(ferry => ferry.operator === selectedProvider);

    if (matching) {
        const card = document.createElement("div");
        card.classList.add("ferryCard");
        card.innerHTML = `
            <h3>${matching.operator}</h3>
            <p><strong>Amendments:</strong> ${matching.amendments}</p>
            <p><strong>Cancellations:</strong> ${matching.cancellations}</p>
            <p><a href="${matching.link}" target="_blank" rel="noopener noreferrer">Book with ${matching.operator} today</a></p>
            <p>Travelbetter Rating * ${matching.travelbetterRating} / 5 </p>
        `;
        results.appendChild(card);
    } else {
        results.innerHTML += `<p>No info available for this provider.</p>`;
    }
}

