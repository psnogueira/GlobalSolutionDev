document.addEventListener('DOMContentLoaded', function() {
    loadReportsFromLocalStorage();
});

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}

function addOrigin(amount, origin) {
    const tableBody = document.querySelector('#report-table1 tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <tr>
            <td class="text-center">${amount}</td>
            <td class="text-center">${origin}</td>     
        </tr>
    `;
    
    tableBody.appendChild(row);
}

function addDestination(amount, destination) {
    const tableBody = document.querySelector('#report-table2 tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <tr>
            <td class="text-center">${amount}</td>
            <td class="text-center">${destination}</td>     
        </tr>
    `;
    
    tableBody.appendChild(row);
}

function addCargo(cargo) {
    const tableBody = document.querySelector('#report-table3 tbody');
    const row = document.createElement('tr');

    const tripAmount = getTripsFromLocalStorage().length;
    
    row.innerHTML = `
        <tr class="table-success">
            <td class="text-center"><span class="badge badge-finished">${tripAmount}</span></td>
            <td class="text-center">${cargo} Kg</td>
        </tr>
    `;
    
    tableBody.appendChild(row);
}

// Get the trips from localStorage and display all different destinations
function loadReportsFromLocalStorage() {
    const trips = getTripsFromLocalStorage();

    const originReport = countData(trips, "Origin");
    const destinationReport = countData(trips, "Destination");
    const cargoReport = averageCargo(trips);

    const originTableDiv = document.querySelector('#ReportTableDiv1');
    const destinationTableDiv = document.querySelector('#ReportTableDiv2');
    const cargoTableDiv = document.querySelector('#ReportTableDiv3');

    // Se não houver viagens salvas setar o hrml da table para uma mensagem.
    if (originReport.length > 0) {
        originReport.forEach((trip, index) => addOrigin(trip.amount, trip.destination));
    } else {
        originTableDiv.innerHTML = `
            <p class="text-body-secondary centered-text">Ainda não há nenhuma viagem cadastrada ):</p>
        `;
    }

    if (destinationReport.length > 0) {
        destinationReport.forEach((trip, index) => addDestination(trip.amount, trip.destination));
    } else {
        destinationTableDiv.innerHTML = `
            <p class="text-body-secondary centered-text">Ainda não há nenhuma viagem cadastrada ):</p>
        `;
    }

    if (cargoReport > 0) {
        addCargo(cargoReport);
    } else {
        cargoTableDiv.innerHTML = `
            <p class="text-body-secondary centered-text">Ainda não há nenhuma viagem cadastrada ):</p>
        `;
    }
}

// Function to calculate the average cargo of all trips.
function averageCargo(travelList) {
    if (!travelList || travelList.length === 0) {
      return []; // Return empty array if list is empty or invalid
    }
  
    let totalCargo = 0;
    travelList.forEach(travel => {
      totalCargo += travel.cargo;
    });

    let result = totalCargo / travelList.length;

    return Math.round(result * 1000) / 1000;
}

function countData(travelList, dataField) {
    if (!travelList || travelList.length === 0) {
      return []; // Return empty array if list is empty or invalid
    }
  
    const dataCounts = {}; // Initialize an empty object to store destination counts
    let data = "";
    
    travelList.forEach(travel => {
        if (dataField === "Origin") {
            data = travel.origin;
        } else if (dataField === "Destination") {
            data = travel.destination;
        } else{
            return [];
        }
        
        if (!dataCounts[data]) {
            dataCounts[data] = 0; // Initialize count for new destination
        }
        dataCounts[data]++; // Increment count for existing destination
    });
  
    // Convert dataCounts object to an array of objects
    const dataCountArray = Object.entries(dataCounts).map(([data, count]) => {
      return {
        destination: data,
        amount: count
      };
    });

    // Order the array by amount
    dataCountArray.sort((a, b) => b.amount - a.amount);
  
    return dataCountArray;
  }