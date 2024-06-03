function clearTable() {
    const tableBody = document.querySelector('#tripTable tbody');
    tableBody.innerHTML = '';
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    const trips = getTripsFromLocalStorage();

    clearTable();

    let searchText = event.target.value.toLowerCase();
    let filteredTrips = trips.filter(trip =>
        trip.origin.toLowerCase().includes(searchText) ||
        trip.destination.toLowerCase().includes(searchText) ||
        trip.date.includes(searchText)
    );
    filteredTrips.forEach((trip, index) => addTrip(trip.code, trip.origin, trip.destination, trip.date, trip.captain, trip.cargo, trip.status));
});