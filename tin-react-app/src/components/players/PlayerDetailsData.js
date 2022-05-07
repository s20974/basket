import React from "react";
import { Link, Redirect } from "react-router-dom";
import PopupPlayer from "../Popups/PopupEditAdd";
import PopupDeleteTeamPlayer from "../Popups/PopupDeleteTeamPlayer";
import formMode from '../helpers/formHelper';
import { checkRequired } from "../helpers/formHelper";
import { checkTextLengthRange } from "../helpers/formHelper";
import { updatePlayerApiCall } from "../../apiCalls/playersApiCalls";
import { addPlayerToTeamApiCall } from "../../apiCalls/playersApiCalls";
import {getTeamsListApiCall} from '../../apiCalls/teamsApiCalls';
import { isAuthenticated } from "../../helper/authHelper";
import { getCurrentUser } from "../../helper/authHelper";

class PlayerDetailsData extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playerData: this.props.playerData,
            buttonEdit: false,
            buttonAdd: false,
            buttonDelete: false,
            teams: this.props.teams,
            player: {
                name: this.props.playerData.name,
                surname: this.props.playerData.surname,
                phone: this.props.playerData.phone,
            },
            errors: {
                name: '',
                surname: '',
                phone: '',
                player_number: '',
                days_in_team: '',
                salary: '',
                team_id: '',
                player_id: '',
            },
            player_team: {
                player_number: '',
                days_in_team: '',
                salary: '',
                team_id: 1,
                player_id: this.props.playerData._id,
            },
            team_to_delet: '',
            formMode: null,
            redirect: false,
            error: null,
        }
        getTeamsListApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data)
                this.setState({
                    teams: [...data],
                    message: null,
                });
                console.log(this.state.teams)
            }
        )
        console.log(this.props.teams)
    }


    
    handeleChange = (event) => {
        if(this.state.formMode === formMode.EDIT){
            const {name, value} = event.target
            const player = {...this.state.player}
            player[name] = value
    
            const errorMessage = this.validateField(name, value)
            const errors = {...this.state.errors}
            errors[name] = errorMessage
    
            this.setState({
                player: player,
                errorsEdit: errors
            })
        }   else if (this.state.formMode === formMode.ADD_PLAYER_TO_TEAM) {
            const {name, value} = event.target
            const team_player = {...this.state.player_team}
            team_player[name] = value

            const errorMessage = this.validateField(name, value)
            const errors = {...this.state.errors}
            errors[name] = errorMessage
            console.log(`errors ${errors}`)
            this.setState({
                player_team: team_player,
                errorsEdit: errors
            })
        }
    }



    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if(fieldName === 'name'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'surname'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'phone'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'salary'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'player_number'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'days_in_team'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        console.log("handleSubmit")
        event.preventDefault()
        const isValid = this.validateForm()
        if(isValid){
            console.log(22)
            const 
                player = this.state.player,
                player_team = this.state.player_team,
                currentFormMode = this.state.formMode;
            let
                promise,
                responce;

            if(currentFormMode === formMode.EDIT){
                const playerId = this.state.playerData._id
                promise = updatePlayerApiCall(playerId, player)
            } else if(currentFormMode === formMode.ADD_PLAYER_TO_TEAM){
                console.log(player_team)
                promise = addPlayerToTeamApiCall(player_team)
            }

            if(promise){
                console.log(promise)
                promise
                    .then(
                        (data) => {
                            responce = data
                            if(responce.status === 201 || responce.status === 500){
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if(!responce.ok && responce.status === 500){
                                for(const i in data){
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.errorMessage
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null,
                                    })
                                }
                            }   else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const player = this.state.player
        const player_team = this.state.player_team
        const errors = this.state.errors

        if(this.state.formMode === formMode.EDIT){
            for (const fieldName in player){
                const fieldValue = player[fieldName]
                const errorMessage = this.validateField(fieldName, fieldValue)
                errors[fieldName] = errorMessage
            }
        }   else if (this.state.formMode === formMode.ADD_PLAYER_TO_TEAM){
            for (const fieldName in player_team){

                const fieldValue = player_team[fieldName]
                const errorMessage = this.validateField(fieldName, fieldValue)
                errors[fieldName] = errorMessage

            }
        }


        this.setState({
            errors: errors
        })

        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for(const errorField in this.state.errors){
            if(errors[errorField].length > 0){
                return true
            }
        }
        return false
    }

    render(){
        const { redirect } = this.state
        if(redirect){
            return(
                <Redirect to={{
                    pathname: "/players"
                }}/>
            )
        }


        return(
            <React.Fragment>
                <div className="team_info_content">
                    <div className="team_logo">
                        <img src={`/img/players/${this.state.playerData._id}.png`} alt="img"/>
                    </div>
                    <div className="team_infodt">
                        <p className="team_name">
                            {this.state.playerData.name} {this.state.playerData.surname}
                        </p>
                        <p className="team_city">
                            - Phone number: <span>{this.state.playerData.phone};</span>
                        </p><br/>
                        {isAuthenticated() &&
                        <>
                            <div className="team_edit_buttons">
                                <button type="button" className="add_button">
                                    <span className="button__text" onClick={() => this.setState({buttonEdit: true, formMode: formMode.EDIT})}>Edit</span>
                                    <span className="button__icon">
                                        <i className="fas fa-edit"></i>
                                    </span>
                                </button>
                            </div>
                            <br/>
                            <div className="team_edit_buttons">
                                <button type="button" className="add_button">
                                    <span className="button__text" onClick={() => this.setState({buttonAdd: true, formMode: formMode.ADD_PLAYER_TO_TEAM})}>Add Player To Team</span>
                                    <span className="button__icon">
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </button>
                            </div>
                        </>
                        }

                    </div>

                    <div className="team_players">
                        <table className="players">
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Title</th>
                                    <th>Days In Team</th>
                                    <th>Number</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {   this.state.playerData.team_player.map(team_player => (
                                <tr>
                                <th><img src={`/img/teams/${team_player.team._id}.png`} width="70px" alt="img"/></th>
                                <td>{team_player.team.title}</td>
                                <td>{team_player.days_in_team}</td>
                                <td>{team_player.player_number}</td>
                                <td>{team_player.salary}</td>
                                <td>                        {isAuthenticated() && getCurrentUser().role === 'admin' &&
                                        <>
                                            
                                        <button className="player_delete_info" onClick={() => this.setState({buttonDelete: true, team_to_delet: team_player.team._id})}>Delete</button>
                                        </>
                                        }
                                    
                                    <Link to={`/teams/info/${team_player.team._id}`} className="">
                                        <div className="player_more_info_info">
                                            Details
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                <PopupPlayer active={this.state.buttonEdit} setActive={this} onSubmit={this.handleSubmit} name="Edit Player Info">
                        <div className="form-inner"  id="form-inner">
                            <input type="text" className={this.state.errors.name.length > 0 ? "error" : ""} placeholder="Name" name="name" defaultValue={this.state.playerData.name} onChange={this.handeleChange}/>
                            <input type="text" className={this.state.errors.surname.length > 0 ? "error" : ""} placeholder="Surname" name="surname" defaultValue={this.state.playerData.surname} onChange={this.handeleChange}/>
                            <input type="text" className={this.state.errors.phone.length > 0 ? "error" : ""} placeholder="Phone" name="phone" defaultValue={this.state.playerData.phone} onChange={this.handeleChange}/>
                        </div>
                        <div className="line"></div>
                        <div className="errors_info" id="errors_info" style={{fontSize: "12px"}}>
                            {this.state.errors.name.length > 0 || this.state.errors.surname.length > 0 || this.state.errors.phone.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}
                        </div><br/>
                        <input type="submit" className="close-btn" value="Save"></input>
                </PopupPlayer>

                <PopupPlayer active={this.state.buttonAdd} onSubmit={this.handleSubmit} setActive={this} name="Add Player">
                        <div className="form-inner">
                            <input type="text" placeholder="Salary" className={this.state.errors.salary.length > 0 ? "error" : ""} name="salary" onChange={this.handeleChange}/>
                            <input type="text" placeholder="Number" className={this.state.errors.player_number.length > 0 ? "error" : ""} name="player_number" onChange={this.handeleChange}/>
                            <input type="text" placeholder="Days In Team" className={this.state.errors.days_in_team.length > 0 ? "error" : ""} name="days_in_team" onChange={this.handeleChange}/>
                            <select id="teams" name="team_id" onChange={this.handeleChange}>
                                {   this.state.teams.map(teams => (
                                    <option value={teams._id} >{teams.short_title}</option>
                                ))}
                            </select>

                        </div>
                        <div className="errors_info" id="errors_info" style={{fontSize: "12px"}}>
                            {this.state.errors.salary.length > 0 || this.state.errors.player_number.length > 0 || this.state.errors.days_in_team.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}
                        </div>
                        <input type="submit" className="close-btn" value="Add"></input>
                </PopupPlayer>
                
                <PopupDeleteTeamPlayer active={this.state.buttonDelete} setActive={this} team_id={this.state.team_to_delet} player_id={this.props.playerData._id} name="Delete Player ?">
                    <input type="submit" id="delete_yes" className="delete_yes" value="Yes"></input>
                    <input type="button" id="delete_no" className="delete_no" value="No" onClick={() => this.setState({buttonDelete: false})}></input>
                </PopupDeleteTeamPlayer>

                <div id="overlay" className={this.state.buttonDelete || this.state.buttonAdd || this.state.buttonEdit ? "active" : ""}></div>
            </React.Fragment>
        )
    }
}

export default PlayerDetailsData