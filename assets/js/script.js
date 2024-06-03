document.addEventListener('DOMContentLoaded', function() {
    loadTripsFromLocalStorage();
});

function addTrip(code, origin, destination, date, captain, cargo, status) {
    const tableBody = document.querySelector('#tripTable tbody');
    const row = document.createElement('tr');

    let statusBadge = '';
    if (status === 'Em andamento') {
        statusBadge = '<span class="badge badge-active">Em andamento</span>';
    } else if (status === 'Concluida') {
        statusBadge = '<span class="badge badge-finished">Concluída</span>';
    } else if (status === 'Em espera') {
        statusBadge = '<span class="badge badge-waiting">Atrasada</span>';
    } else if (status === 'Cancelada') {
        statusBadge = '<span class="badge badge-cancelled">Cancelada</span>';
    } else {
        statusBadge = '<span class="badge badge-unknown">Unknown</span>';
    }
    
    row.innerHTML = `
        <tr>
            <td>${code}</td>
            <td>${statusBadge}</td>
            <td>
                <p class="fw-normal mb-1">${origin}</p>
            </td>
            <td>
                <p class="fw-normal mb-1">${destination}</p>
            </td>
            <td>${date}</td>
            <td>${cargo} Kg</td>
            <td>${captain}</td>
            <td>
                <button class="btn btn-primary btn-sm m-1 p-2 edit"><i class="bi bi-pen-fill"></i>  Editar</button>
                <button class="btn btn-danger btn-sm m-1 p-2 remove"><i class="bi bi-trash-fill"></i>  Remover</button>
            </td>      
        </tr>
    `;
    
    row.querySelector('.remove').addEventListener('click', function() {
        confirmAndRemoveTrip(row, code, origin, destination, date, captain, cargo, status);
    });
    
    row.querySelector('.edit').addEventListener('click', function() {
        editTrip(row.rowIndex - 1);
    });
    
    tableBody.appendChild(row);
}

function loadTripsFromLocalStorage() {
    const trips = getTripsFromLocalStorage();
    const tableDiv = document.querySelector('#tableDiv');

    // Se não houver viagens salvas setar o hrml da table para uma mensagem.
    if (trips.length > 0) {
        trips.forEach((trip, index) => addTrip(trip.code, trip.origin, trip.destination, trip.date, trip.captain, trip.cargo, trip.status));
    } else {
        tableDiv.innerHTML = `
            <p class="text-body-secondary centered-text">Ainda não há nenhuma viagem cadastrada ):</p>
        `;
    }
}

function getTripsFromLocalStorage() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}

function confirmAndRemoveTrip(row, code, origin, destination, date, captain, cargo, status) {
    const confirmed = confirm(`Tem certeza que deseja remover a viagem para ${destination} em ${date} com o capitão ${captain}?`);
    if (confirmed) {
        removeTrip(row, code, origin, destination, date, captain, cargo, status);
    }
}

function removeTrip(row, code, origin, destination, date, captain, cargo, status) {
    row.remove();
    const trips = getTripsFromLocalStorage();
    const updatedTrips = trips.filter(trip => trip.code !== code || 
                                              trip.origin !== origin ||
                                              trip.destination !== destination ||  
                                              trip.date !== date || 
                                              trip.captain !== captain ||
                                              trip.cargo !== cargo || 
                                              trip.status !== status);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
}

function editTrip(index) {
    window.location.href = `edit.html?index=${index}`;
}
