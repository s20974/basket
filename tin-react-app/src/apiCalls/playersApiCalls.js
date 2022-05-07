import { getCurrentUser } from '../helper/authHelper'
const playersBaseUrl = 'http://localhost:3000/api/players'
const playerTeamBaseUrl = 'http://localhost:3000/api/teams'

export function getPlayerListApiCall(){
    const promise = fetch(playersBaseUrl);
    return promise;
}

export function getPlayerByIdApiCall(playerId){
    const url = `${playersBaseUrl}/${playerId}`;
    const promise = fetch(url);
    return promise;
}

export function updatePlayerApiCall(playerId, player){
    const url = `${playersBaseUrl}/${playerId}`;
    console.log(player)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: player.name, surname: player.surname, phone: player.phone })
    };
    console.log(requestOptions)
    return fetch(url, requestOptions)
}

export function addPlayerToTeamApiCall(player_team){
    const url = `${playersBaseUrl}`;
    console.log(JSON.stringify(player_team))
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player_team)
    };
    console.log(requestOptions)
    return fetch(url, requestOptions)
}

export function deletePlayerFromTeamApiCall(teamId, playerId){
    const url = `${playerTeamBaseUrl}/${teamId}/${playerId}`;
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(url, requestOptions)
}

export function deletePlayerApiCall(playerId){
    const url = `${playersBaseUrl}/${playerId}`;
    const user = getCurrentUser()
    let token
    if (user && user.token){
        token = user.token
    } 
    console.log(token)
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
    },
    };
    return fetch(url, requestOptions)
}

export function addPlayerApiCall(player){
    const url = `${playersBaseUrl}/add`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
    };
    return fetch(url, requestOptions)
}