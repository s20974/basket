const baseUrl = 'http://localhost:3000/api/auth'

export function loginApiCall(user){
    const url = `${baseUrl}/login`
    const userString = JSON.stringify(user)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userString,
    }

    const promise = fetch(url, options)
    return promise
}