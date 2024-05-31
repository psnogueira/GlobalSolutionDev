document.getElementById('tripForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const captain = document.getElementById('captain').value.trim();
    
    clearErrors();
    
    if (validateForm(destination, date, captain)) {
        saveTripToLocalStorage(destination, date, captain);
        this.reset();
    }
});

function clearErrors() {
    document.getElementById('destinationError').style.display = 'none';
    document.getElementById('dateError').style.display = 'none';
    document.getElementById('captainError').style.display = 'none';
}

function validateForm(destination, date, captain) {
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

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}

function saveTripToLocalStorage(destination, date, captain) {
    const trips = getTripsFromLocalStorage();
    trips.push({ destination, date, captain });
    localStorage.setItem('trips', JSON.stringify(trips));
    window.location = "index.html"
}
