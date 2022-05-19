export const accommodationService = {
    addAccommodation,
    getAllAccommodations,
    deleteAccommodation,
    updateAccommodation,
    setReservation,
    getPastAccommodations,
    getActiveAccommodations
};

function addAccommodation(address, city, description, people, dateFrom, dateTo, files) {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
        body: JSON.stringify({
            accommodation: {
                address: address,
                city: city,
                description: description,
                maxPeople: parseInt(people),
                startDate: dateFrom.toISOString().slice(0, 10),
                endDate: dateTo.toISOString().slice(0, 10),
                images: files
            }
        })
    };
    return fetch('http://localhost:8002/api/posts', requestOptions)
}

function getAllAccommodations(city, people, dateFrom, dateTo, alone) {
    let authToken = sessionStorage.getItem('Auth Token')
    let cityFilter = city === "" || city === undefined ? "" : `city=${city}&`
    let peopleFilter = people === -1 || people === undefined ? "" : `numberOfPeople=${people}&`
    let dateFromFilter = dateFrom === "" || dateFrom === undefined ? "" : `startDate=${dateFrom.toISOString().slice(0, 10)}&`
    let dateToFilter = dateTo === "" || dateTo === undefined ? "" : `endDate=${dateTo.toISOString().slice(0, 10)}&`
    let aloneFilter = alone === undefined ? "" : `shared=${!alone}&`
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
    };
    return fetch('http://localhost:8002/api/posts?' + cityFilter + peopleFilter + dateFromFilter + dateToFilter + aloneFilter, requestOptions)
}

function getPastAccommodations() {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
    };
    return fetch('http://localhost:8002/api/posts?available=false', requestOptions)
}

function getActiveAccommodations() {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
    };
    return fetch('http://localhost:8002/api/posts?available=true', requestOptions)
}

function deleteAccommodation(id) {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
    };
    return fetch('http://localhost:8002/api/posts/' + id, requestOptions)
}

function updateAccommodation(address, city, description, people, dateFrom, dateTo, files, id, available) {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
        body: JSON.stringify({
            id,
            available,
            accommodation: {
                address: address,
                city: city,
                description: description,
                maxPeople: parseInt(people),
                startDate: dateFrom,
                endDate: dateTo,
                images: files,
            }
        })
    };
    return fetch('http://localhost:8002/api/posts', requestOptions)
}

function setReservation(id, numPeople, dateFrom, dateTo) {
    let authToken = sessionStorage.getItem('Auth Token')
    let peopleFilter = numPeople === -1 || numPeople === undefined ? "" : `numPeople=${numPeople}&`
    let dateFromFilter = dateFrom === "" || dateFrom === undefined ? "" : `startDate=${dateFrom.toISOString().slice(0, 10)}&`
    let dateToFilter = dateTo === "" || dateTo === undefined ? "" : `endDate=${dateTo.toISOString().slice(0, 10)}&`

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
    };
    return fetch('http://localhost:8002/api/posts/' + id + '?' + peopleFilter + dateFromFilter + dateToFilter, requestOptions)
}