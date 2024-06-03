document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    if (index !== null) {
        loadTripForEditing(index);
    }

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const origin = document.getElementById('editOrigin').value.trim();
        const destination = document.getElementById('editDestination').value.trim();
        const date = document.getElementById('editDate').value;
        const captain = document.getElementById('editCaptain').value.trim();
        const cargo = document.getElementById('editCargo').value.trim();
        const status = document.getElementById('editStatus').value;

        console.log("status");
        console.log(status);

        clearErrors();

        if (validateForm( origin, destination, date, captain, cargo, status)) {
            updateTrip(index, origin, destination, date, captain, cargo, status);
            window.location.href = 'index.html';
        }
    });
});

function clearErrors() {
    document.getElementById('editDestinationError').style.display = 'none';
    document.getElementById('editDateError').style.display = 'none';
    document.getElementById('editCaptainError').style.display = 'none';
}

function validateForm(origin, destination, date, captain, cargo, status) {
    let isValid = true;

    if (!origin) {
        isValid = false;
        displayError('editOriginError', 'O campo "Origem" é obrigatório.');
    }

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

    if (!cargo) {
        isValid = false;
        displayError('editCargoError', 'O campo "Carga" é obrigatório.');
    }

    if (!status) {
        isValid = false;
        displayError('editStatusError', 'O campo "Status" é obrigatório.');
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
    console.log(dateString);
    console.log(date);
    return date instanceof Date && !isNaN(date);
}

function loadTripForEditing(index) {
    const trips = getTripsFromLocalStorage();
    const trip = trips[index];

    const tripStatus = ['Em andamento', 'Concluida', 'Em espera', 'Cancelada'];
    let statusValue = trip.status;
    if (!tripStatus.includes(statusValue)) {
        statusValue = "Unknown";
    }

    document.getElementById('tripIndex').value = index;
    document.getElementById('editOrigin').value = trip.origin;
    document.getElementById('editDestination').value = trip.destination;
    document.getElementById('editDate').value = trip.date;
    document.getElementById('editCaptain').value = trip.captain;
    document.getElementById('editCargo').value = trip.cargo;
    document.getElementById('editStatus').value = statusValue;
}

function updateTrip(index, origin, destination, date, captain, cargo, status) {
    const trips = getTripsFromLocalStorage();
    const code = trips[index].code;

    trips[index] = { code, origin, destination, date, captain, cargo, status };
    localStorage.setItem('trips', JSON.stringify(trips));
}

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}
