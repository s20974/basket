import { getCurrentUser } from '../helper/authHelper'

const teamsBaseUrl = 'http://localhost:3000/api/teams'

export function getTeamsListApiCall(){
    const promise = fetch(teamsBaseUrl);
    return promise;
}

export function getTeamByIdApiCall(teamId){
    const url = `${teamsBaseUrl}/${teamId}`;
    const promise = fetch(url);
    return promise;
}

export function updateTeamApiCall(teamId, team){
    const url = `${teamsBaseUrl}/${teamId}`;
    console.log(team)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };
    return fetch(url, requestOptions)
}

export function deleteTeamApiCall(teamId){
    const url = `${teamsBaseUrl}/${teamId}`;
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

export function addTeamApiCall(team){
    const url = `${teamsBaseUrl}/`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };
    return fetch(url, requestOptions)
}