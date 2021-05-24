import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')),
        'Content-Type': "application/json"
    }
});