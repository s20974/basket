import React from "react";
import { Link, Redirect } from "react-router-dom";
import PopupPlayer from "../Popups/PopupEditAdd";
import PopupDeleteTeamPlayer from "../Popups/PopupDeleteTeamPlayer";
import {getTeamsListApiCall} from '../../apiCalls/teamsApiCalls';
import formMode from '../helpers/formHelper';
import { checkRequired } from "../helpers/formHelper";
import { checkTextLengthRange } from "../helpers/formHelper";
import { updatePlayerApiCall } from "../../apiCalls/playersApiCalls";
import { addPlayerToTeamApiCall } from "../../apiCalls/playersApiCalls";
import { updateTeamApiCall } from "../../apiCalls/teamsApiCalls";
import { isAuthenticated } from "../../helper/authHelper";
import { getCurrentUser } from "../../helper/authHelper";

class TeamsDetailsData extends React.Component{
    constructor(props){
        super(props)
        console.log(props)

        this.state = {
            playerData: this.props.playerData,
            buttonEdit: false,
            buttonAdd: false,
            buttonDelete: false,
            player: {
                title: this.props.playerData.title,
                adress: this.props.playerData.adress,
                short_title: this.props.playerData.short_title,
                city: this.props.playerData.city,
            },
            errors: {
                title: '',
                adress: '',
                short_title: '',
                city: '',
            },
            team_to_delet: '',
            formMode: null,
            redirect: false,
            error: null,
        }
    }

    handeleChange = (event) => {
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
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if(fieldName === 'title'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'adress'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'short_title'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole jest wymagane'
            }   else if(!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = '2 - 60 zn'
            }
        }
        if(fieldName === 'city'){
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
                currentFormMode = this.state.formMode;
            let
                promise,
                responce;

            if(currentFormMode === formMode.EDIT){
                const playerId = this.state.playerData._id
                promise = updateTeamApiCall(playerId, player)
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
        const errors = this.state.errors

        if(this.state.formMode === formMode.EDIT){
            for (const fieldName in player){
                const fieldValue = player[fieldName]
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
                    pathname: "/teams"
                }}/>
            )
        }


        return(
            <React.Fragment>
                <div className="team_info_content">
                    <div className="team_logo">
                        <img src={`/img/teams/${this.state.playerData._id}.png`} alt="img"/>
                    </div>
                    <div className="team_infodt">
                        <p className="team_name">
                            {this.state.playerData.title} {this.state.playerData.short_title}
                        </p>
                        <p className="team_city">
                            - City: <span>{this.state.playerData.city};</span>
                        </p>
                        <p className="team_city">
                            - Adress: <span>{this.state.playerData.adress};</span>
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
                            </>}
                            <br/>
                    </div>

                    <div className="team_players">
                        <table className="players">
                            <thead>
                                <tr>
                                    <th>Img</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Phone Number</th>
                                    <th>Number</th>
                                    <th>Salary</th>
                                    <th>Days In Team</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {   this.state.playerData.team_player.map(team_player => (
                                <tr>
                                <th><img src={`/img/players/${team_player.player._id}.png`} width="70px" alt="img"/></th>
                                <td>{team_player.player.name}</td>
                                <td>{team_player.player.surname}</td>
                                <td>{team_player.player.phone}</td>
                                <td>{team_player.number}</td>
                                <td>{team_player.salary}</td>
                                <td>{team_player.days_in_team}</td>
                                <td>                        {isAuthenticated() && getCurrentUser().role === 'admin' &&
                                        <>
                                    <button className="player_delete_info" onClick={() => this.setState({buttonDelete: true, team_to_delet: team_player.player._id})}>Delete</button>
                                    </>}
                                    <Link to={`/players/info/${team_player.player._id}`} className="">
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


                <PopupPlayer active={this.state.buttonEdit} onSubmit={this.handleSubmit} setActive={this} name="Edit Team Info">
                    <div className="form-inner"  id="form-inner">
                        <input type="text" className={this.state.errors.title.length > 0 ? "error" : ""} placeholder="title" name="title" onChange={this.handeleChange} defaultValue={this.state.playerData.title} />
                        <input type="text" className={this.state.errors.city.length > 0 ? "error" : ""} placeholder="city" name="city" onChange={this.handeleChange} defaultValue={this.state.playerData.city}/>
                        <input type="text" className={this.state.errors.adress.length > 0 ? "error" : ""} placeholder="adress" name="adress" onChange={this.handeleChange} defaultValue={this.state.playerData.adress} />
                        <input type="text" className={this.state.errors.short_title.length > 0 ? "error" : ""} placeholder="short name" name="short_title" onChange={this.handeleChange} defaultValue={this.state.playerData.short_title} />
                    </div>
                    <div className="line"></div>
                    <div className="errors_info" id="errors_info" style={{fontSize: "12px"}}>
                    {this.state.errors.title.length > 0 || this.state.errors.city.length > 0 || this.state.errors.adress.length || this.state.errors.short_title.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}    
                    </div><br/>
                    <input type="submit" className="close-btn" value="Save"></input>
                </PopupPlayer>


                <PopupDeleteTeamPlayer active={this.state.buttonDelete} setActive={this} team_id={this.state.team_to_delet} player_id={this.props.playerData._id} name="Delete Team ?">
                    <input type="submit" id="delete_yes" className="delete_yes" value="Yes"></input>
                    <input type="button" id="delete_no" className="delete_no" value="No" onClick={() => this.setState({buttonDelete: false})}></input>
                </PopupDeleteTeamPlayer>

                <div id="overlay" className={this.state.buttonDelete || this.state.buttonAdd || this.state.buttonEdit ? "active" : ""}></div>
            </React.Fragment>
        )
    }
}

export default TeamsDetailsData