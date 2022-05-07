const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT',
    ADD_PLAYER_TO_TEAM: 'ADD_PLAYER_TO_TEAM',
    ADD_PLAYER: 'ADD_PLAYER',
    ADD_TEAM: 'ADD_TEAM',
}
export default formMode

export function checkRequired(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value === ""){
        return false;
    }
    return true
}

export function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max){
        return false;
    }
    if(min && length < min){
        return false;
    }
    return true
}