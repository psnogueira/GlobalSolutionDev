document.getElementById('tripForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // const code = document.getElementById('code').value.trim(); // Gerado aleatóriamente.
    const origin = document.getElementById('origin').value.trim(); // Novo.
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const captain = document.getElementById('captain').value.trim();
    const cargo = document.getElementById('cargo').value.trim(); // Novo.
    // const status = document.getElementById('status').value.trim(); // Gerado automaticamente.
    
    clearErrors();
    
    if (validateForm(origin, destination, date, captain, cargo)) {
        saveTripToLocalStorage(origin, destination, date, captain, cargo);
        this.reset();
    }
});

function clearErrors() {
    document.getElementById('originError').style.display = 'none';
    document.getElementById('destinationError').style.display = 'none';
    document.getElementById('dateError').style.display = 'none';
    document.getElementById('captainError').style.display = 'none';
    document.getElementById('cargoError').style.display = 'none';
}

function validateForm(origin, destination, date, captain, cargo) {
    let isValid = true;
    
    if (!destination) {
        isValid = false;
        displayError('destinationError', 'O campo "Destino" é obrigatório.');
    }
    
    if (!date) {
        isValid = false;
        displayError('dateError', 'O campo "Data" é obrigatório.');
    } else if (!isValidDate(date)) {
        isValid = false;
        displayError('dateError', 'O campo "Data" deve ser uma data válida.');
    }
    
    if (!captain) {
        isValid = false;
        displayError('captainError', 'O campo "Capitão" é obrigatório.');
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

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}

function saveTripToLocalStorage(origin, destination, date, captain, cargo) {
    const trips = getTripsFromLocalStorage();
    let code = generateId();
    // Check if generated id already exists. If so, generate a new one.
    while (trips.some(trip => trip.code === code)) {
        code = generateId();
    }    
    let status = 'Em andamento';

    // Add the new trip to the list of trips and save it to the local storage.
    trips.push({ code, origin, destination, date, captain, cargo, status });
    localStorage.setItem('trips', JSON.stringify(trips));

    // Redirect the user to the home page.
    window.location = "index.html"
}
