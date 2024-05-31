document.addEventListener('DOMContentLoaded', function() {
    loadTripsFromLocalStorage();
});

function addTrip(destination, date, captain) {
    const tableBody = document.querySelector('#tripTable tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <tr>
            <td>${destination}</td>
            <td>${date}</td>
            <td>${captain}</td>
            <td>
                <button class="btn btn-primary btn-sm m-1 p-2 edit"><i class="bi bi-pen-fill"></i>  Editar</button>
                <button class="btn btn-danger btn-sm m-1 p-2 remove"><i class="bi bi-trash-fill"></i>  Remover</button>
            </td>      
        </tr>
    `;
    
    row.querySelector('.remove').addEventListener('click', function() {
        confirmAndRemoveTrip(row, destination, date, captain);
    });
    
    row.querySelector('.edit').addEventListener('click', function() {
        editTrip(row.rowIndex - 1);
    });
    
    tableBody.appendChild(row);
}

function loadTripsFromLocalStorage() {
    const trips = getTripsFromLocalStorage();
    trips.forEach((trip, index) => addTrip(trip.destination, trip.date, trip.captain));
}

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}

function confirmAndRemoveTrip(row, destination, date, captain) {
    const confirmed = confirm(`Tem certeza que deseja remover a viagem para ${destination} em ${date} com o capitão ${captain}?`);
    if (confirmed) {
        removeTrip(row, destination, date, captain);
    }
}

function removeTrip(row, destination, date, captain) {
    row.remove();
    const trips = getTripsFromLocalStorage();
    const updatedTrips = trips.filter(trip => trip.destination !== destination || trip.date !== date || trip.captain !== captain);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
}

function editTrip(index) {
    window.location.href = `edit.html?index=${index}`;
}
