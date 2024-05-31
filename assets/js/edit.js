document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    if (index !== null) {
        loadTripForEditing(index);
    }

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const destination = document.getElementById('editDestination').value.trim();
        const date = document.getElementById('editDate').value;
        const captain = document.getElementById('editCaptain').value.trim();

        clearErrors();

        if (validateForm(destination, date, captain)) {
            updateTrip(index, destination, date, captain);
            window.location.href = 'index.html';
        }
    });
});

function clearErrors() {
    document.getElementById('editDestinationError').style.display = 'none';
    document.getElementById('editDateError').style.display = 'none';
    document.getElementById('editCaptainError').style.display = 'none';
}

function validateForm(destination, date, captain) {
    let isValid = true;

    if (!destination) {
        isValid = false;
        displayError('editDestinationError', 'O campo "Destino" é obrigatório.');
    }

    if (!date) {
        isValid = false;
        displayError('editDateError', 'O campo "Data" é obrigatório.');
    } else if (!isValidDate(date)) {
        isValid = false;
        displayError('editDateError', 'O campo "Data" deve ser uma data válida.');
    }

    if (!captain) {
        isValid = false;
        displayError('editCaptainError', 'O campo "Capitão" é obrigatório.');
    }

    return isValid;
}

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function loadTripForEditing(index) {
    const trips = getTripsFromLocalStorage();
    const trip = trips[index];

    document.getElementById('tripIndex').value = index;
    document.getElementById('editDestination').value = trip.destination;
    document.getElementById('editDate').value = trip.date;
    document.getElementById('editCaptain').value = trip.captain;
}

function updateTrip(index, destination, date, captain) {
    const trips = getTripsFromLocalStorage();
    trips[index] = { destination, date, captain };
    localStorage.setItem('trips', JSON.stringify(trips));
}

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}
