export const userService = {
    getMe,
    register,
    updateProfile,
};

function getMe() {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
    };
    return fetch('http://localhost:8002/api/me', requestOptions)
}

function register(email, password, fullName, phoneNumber, userRole) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            fullName: fullName,
            phone: phoneNumber,
            userRole: userRole
        })
    };
    return fetch('http://localhost:8002/api/register', requestOptions)
}

function updateProfile(description, email, fullName, id, password, phoneNumber, userRole) {
    let authToken = sessionStorage.getItem('Auth Token')
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
        body: JSON.stringify({
            description: description,
            email: email,
            fullName: fullName,
            id: id,
            password: password,
            phone: phoneNumber,
            userRole: userRole
        })
    };
    return fetch('http://localhost:8002/api/users', requestOptions)
}