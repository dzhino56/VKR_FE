import axios from "axios";

const CSRF_TOKEN_URL = '/api/v1/csrf_cookie'

export function getCookie (name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getCSRF() {
    axios.get(process.env.REACT_APP_BASE_URL + CSRF_TOKEN_URL,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(r => r.data);
}
