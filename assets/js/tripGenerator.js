// Importar a função saveTripToLocalStorage do arquivo trip.js
//import { saveTripToLocalStorage } from './register.js';

const generateButton = document.getElementById('generateButton');

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

function generateRandomDate(initialDate, finalDate) {
    const minDate = new Date(initialDate);
    const maxDate = new Date(finalDate);
    const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    return randomDate.toISOString().slice(0, 10); // Formato YYYY-MM-DD
}

function generateRandomTrip() {
    const cities = ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Porto Alegre', 'Recife'];
    const captains = ['Luiz', 'Carlos', 'Ana', 'Mariana', 'Pedro', 'João', 'Maria', 'José', 'Antônio', 'Francisco'];
    const date = generateRandomDate('2023-01-01', '2024-12-31'); // Datas entre 2023 e 2024

    const maxArrivalDate = new Date(date);
    maxArrivalDate.setDate(maxArrivalDate.getDate() + 3);
    const arrivalDate = generateRandomDate(date, maxArrivalDate.toISOString().slice(0, 10));

    saveTripToLocalStorage(
        cities[Math.floor(Math.random() * cities.length)], 
        date, 
        captains[Math.floor(Math.random() * captains.length)]
    );
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

generateButton.addEventListener('click', function() {
    console.log("aqui!");
    generateRandomTrip();
});