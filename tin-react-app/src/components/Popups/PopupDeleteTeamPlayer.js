import React from "react";
import { deletePlayerFromTeamApiCall } from "../../apiCalls/playersApiCalls";

function PopupDeleteTeamPlayer(props){
    return (props.active) ? ( 
        <div className="popup_delete" id="delete_team">
            <div className="top">
                <h2>{props.name}</h2>
                <label class="fas fa-times" onClick={() => {props.setActive.setState({buttonDelete: false})}}></label>
            </div>
            <form onSubmit={deletePlayerFromTeamApiCall(props.team_id, props.player_id)} className="form" name="delete_team_form" id="delete_team_form" method="get" action={props.action}>
                {props.children}
            </form>
        </div>
    ) : "";
}

export default PopupDeleteTeamPlayer;