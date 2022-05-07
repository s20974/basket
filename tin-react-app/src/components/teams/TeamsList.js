import React from "react";
import { Link, Redirect } from "react-router-dom";
import PopupPlayer from "../Popups/PopupEditAdd";
import PopupDeleteTeam from "../Popups/PopupDeleteTeam";
import formMode from '../helpers/formHelper';
import { checkRequired } from "../helpers/formHelper";
import { checkTextLengthRange } from "../helpers/formHelper";
import { updateTeamApiCall } from "../../apiCalls/teamsApiCalls";
import { addTeamApiCall } from "../../apiCalls/teamsApiCalls";
import { isAuthenticated } from "../../helper/authHelper";
import { getCurrentUser } from "../../helper/authHelper";

class TeamsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            buttonEdit: false,
            buttonAdd: false,
            buttonDelete: false,
            teamId: null,

            team: {
                title: '',
                city: '',
                adress: '',
                short_title: '',
            },
            errors: {
                title: '',
                city: '',
                adress: '',
                short_title: '',
            },
            formMode: null,
            redirect: false,
        }
    }

    handeleChange = (event) => {
        const {name, value} = event.target
        const team = {...this.state.team}
        team[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            team: team,
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
        if(fieldName === 'city'){
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

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const isValid = this.validateForm()

        if(isValid){
            console.log(22)
            const 
                team = this.state.team,
                currentFormMode = this.state.formMode;
            let
                promise,
                responce;

            if(currentFormMode === formMode.EDIT){
                const teamId = this.state.teamId
                promise = updateTeamApiCall(teamId, team)
            } else if(currentFormMode === formMode.ADD_TEAM){
                promise = addTeamApiCall(team)
            }

            if(promise){
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
        const team = this.state.team
        const errors = this.state.errors

        for (const fieldName in team){
            const fieldValue = team[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
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
            window.location.reload();
            return(
                <Redirect to={{
                    pathname: "/teams"
                }}/>
            )
        }
        const teams = this.props.teamsList;
        return(
            <>



                <div className="teams_content">
                    <div className="team_edit_buttons">
                    {isAuthenticated() &&
                                        <>
                        <button type="button" className="add_button" data-modal-target="#modal_add_teams">
                            <span className="button__text" onClick={() => this.setState({buttonAdd: true, formMode: formMode.ADD_TEAM})}>Add Team</span>
                            <span className="button__icon">
                                <i className="fas fa-plus"></i>
                            </span>
                        </button>
                        </>}
                    </div>
                    <div className="teams_container" id="container_1">
                        {   teams.map(team => (
                               <div class="team"> 
                                    <img src={`/img/teams/${team._id}.png`} className="player_img" alt="img"/>
                                    <div className="team_data">
                                        <h1 className="team_title">{team.title}</h1>
                                        <span className="team_short_name">{team.short_title}</span>
                                        <p className="team_info">City: {team.city}  <br/> Adress:{team.short_title}</p>
                                        <Link to={`/teams/info/${team._id}`} className="">
                                            <div className="team_more_info">
                                                details
                                            </div>
                                        </Link>
                                        {isAuthenticated() &&
                                        <>
                                                                                    <label id="<%= team._id %>" data-modal-target="#modal_edit_team">
                                                <span className="team_button"onClick={() => this.setState(
                                                {buttonEdit: true, 
                                                team: {
                                                    title: team.title,
                                                    adress: team.adress,
                                                    city: team.city,
                                                    short_title: team.short_title,
                                                },
                                                teamId: team._id,
                                                formMode: formMode.EDIT})}>edit</span>
                                            </label>
                                            </>
                                        }
                                            {isAuthenticated() && getCurrentUser().role === 'admin' &&
                                                <span id="<%= team._id %>" className="team_delete" onClick={() => this.setState({buttonDelete: true, teamId: team._id})}>delete</span>
                                            }

                                    </div>
                                </div>
                        ))}
                        </div>

                    </div>

                <PopupPlayer active={this.state.buttonEdit} onSubmit={this.handleSubmit} setActive={this} name="Edit Team Info">
                    <div className="form-inner"  id="form-inner">
                        <input type="text" className={this.state.errors.title.length > 0 ? "error" : ""} placeholder="title" name="title" onChange={this.handeleChange} defaultValue={this.state.team.title} />
                        <input type="text" className={this.state.errors.city.length > 0 ? "error" : ""} placeholder="city" name="city" onChange={this.handeleChange} defaultValue={this.state.team.city}/>
                        <input type="text" className={this.state.errors.adress.length > 0 ? "error" : ""} placeholder="adress" name="adress" onChange={this.handeleChange} defaultValue={this.state.team.adress} />
                        <input type="text" className={this.state.errors.short_title.length > 0 ? "error" : ""} placeholder="short name" name="short_title" onChange={this.handeleChange} defaultValue={this.state.team.short_title} />
                    </div>
                    <div className="line"></div>
                    <div className="errors_info" id="errors_info" style={{fontSize: "12px"}}>
                    {this.state.errors.title.length > 0 || this.state.errors.city.length > 0 || this.state.errors.adress.length || this.state.errors.short_title.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}    
                    </div><br/>
                    <input type="submit" className="close-btn" value="Save"></input>
                </PopupPlayer>

                <PopupPlayer active={this.state.buttonAdd} onSubmit={this.handleSubmit} setActive={this} name="Add Team">
                    <div className="form-inner"  id="form-inner">
                        <input type="text" className={this.state.errors.title.length > 0 ? "error" : ""} placeholder="title" name="title" onChange={this.handeleChange} />
                        <input type="text" className={this.state.errors.city.length > 0 ? "error" : ""} placeholder="city" name="city" onChange={this.handeleChange}/>
                        <input type="text" className={this.state.errors.adress.length > 0 ? "error" : ""} placeholder="adress" name="adress" onChange={this.handeleChange} />
                        <input type="text" className={this.state.errors.short_title.length > 0 ? "error" : ""} placeholder="short name" name="short_title" onChange={this.handeleChange}/>
                    </div>
                    <div className="line"></div>
                    <div className="errors_info" id="errors_info" style={{fontSize: "12px"}}>
                    {this.state.errors.title.length > 0 || this.state.errors.city.length > 0 || this.state.errors.adress.length || this.state.errors.short_title.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}    
                    </div><br/>
                    <input type="submit" className="close-btn" value="Save"></input>
                </PopupPlayer>

                <PopupDeleteTeam active={this.state.buttonDelete} setActive={this} teamId={this.state.teamId} name="Delete Team ?">
                    <input type="submit" id="delete_yes" class="delete_yes" value="Yes"></input>
                    <input type="button" id="delete_no" class="delete_no" value="No" onClick={() => this.setState({buttonDelete: false, teamId: null})}></input>
                </PopupDeleteTeam>

                <div id="overlay" className={this.state.buttonDelete || this.state.buttonAdd || this.state.buttonEdit ? "active" : ""}></div>
            </>
        )
    }
}

export default TeamsList