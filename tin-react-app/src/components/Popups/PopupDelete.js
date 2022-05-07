import React from "react";
import { deletePlayerApiCall } from "../../apiCalls/playersApiCalls";

function PopupDelete(props){
    return (props.active) ? ( 
        <div className="popup_delete" id="delete_team">
            <div className="top">
                <h2>{props.name}</h2>
                <label class="fas fa-times" onClick={() => {props.setActive.setState({buttonDelete: false})}}></label>
            </div>
            <form onSubmit={deletePlayerApiCall(props.playerId)} className="form" name="delete_team_form" id="delete_team_form">
                {props.children}
            </form>
        </div>
    ) : "";
}

export default PopupDelete;