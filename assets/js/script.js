document.addEventListener('DOMContentLoaded', function() {
    loadTripsFromLocalStorage();
});

document.getElementById('tripForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const captain = document.getElementById('captain').value.trim();
    
    clearErrors();
    
    if (validateForm(destination, date, captain)) {
        addTrip(destination, date, captain);
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

function addTrip(index, destination, date, captain) {
    const tableBody = document.querySelector('#tripTable tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <tr>
            <th scope="row">${index + 1}</td>
            <td>${destination}</td>
            <td>${date}</td>
            <td>${captain}</td>
            <td>
                <button class="btn btn-primary btn-sm edit"><i class="bi bi-pen-fill"></i>  Editar</button>
                <button class="btn btn-danger btn-sm remove"><i class="bi bi-trash-fill"></i>  Remover</button>
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

function saveTripToLocalStorage(destination, date, captain) {
    const trips = getTripsFromLocalStorage();
    trips.push({ destination, date, captain });
    localStorage.setItem('trips', JSON.stringify(trips));
}

function loadTripsFromLocalStorage() {
    const trips = getTripsFromLocalStorage();
    trips.forEach((trip, index) => addTrip(index, trip.destination, trip.date, trip.captain));
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
