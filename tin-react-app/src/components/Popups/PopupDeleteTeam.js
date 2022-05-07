import React from "react";
import { deleteTeamApiCall } from "../../apiCalls/teamsApiCalls";

function PopupDeleteTeam(props){
    return (props.active) ? ( 
        <div className="popup_delete" id="delete_team">
            <div className="top">
                <h2>{props.name}</h2>
                <label class="fas fa-times" onClick={() => {props.setActive.setState({buttonDelete: false})}}></label>
            </div>
            <form onSubmit={deleteTeamApiCall(props.teamId)} className="form" name="delete_team_form" id="delete_team_form" method="get" action={props.action}>
                {props.children}
            </form>
        </div>
    ) : "";
}

export default PopupDeleteTeam;