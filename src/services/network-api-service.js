import config from '../config'

const NetworkApiService = {
    registerUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}

export default NetworkApiService
