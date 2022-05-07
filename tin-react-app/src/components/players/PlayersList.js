import React from "react";
import { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import PopupPlayer from "../Popups/PopupEditAdd";
import {getTeamsListApiCall} from '../../apiCalls/teamsApiCalls';
import PopupDelete from "../Popups/PopupDelete";
import formMode from '../helpers/formHelper';
import { checkRequired } from "../helpers/formHelper";
import { checkTextLengthRange } from "../helpers/formHelper";
import { updatePlayerApiCall } from "../../apiCalls/playersApiCalls";
import { addPlayerApiCall } from "../../apiCalls/playersApiCalls";
import { isAuthenticated } from "../../helper/authHelper";
import { getCurrentUser } from "../../helper/authHelper";

class PlayersList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonEdit: false,
            buttonAdd: false,
            buttonDelete: false,
            playerId: null,
            player: {
                name: '',
                surname: '',
                phone: '',
                password: '',
            },
            errors: {
                name: '',
                surname: '',
                phone: '',
                password: '',
            },
            formMode: null,
            redirect: false,
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
            errors: errors
        })
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
        if(fieldName === 'password'){
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
                const playerId = this.state.playerId
                promise = updatePlayerApiCall(playerId, player)
            } else if(currentFormMode === formMode.ADD_PLAYER){
                promise = addPlayerApiCall(player)
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

        for (const fieldName in player){
            const fieldValue = player[fieldName]
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
                    pathname: "/players"
                }}/>
            )
        }
        const players = this.props.playersList;
        return(
            <block>
                <div className="player_list_content">

                    <div className="player_edit_buttons">
                        <button type="button" className="add_button" data-modal-target="#modal_add_player">
                            <span className="button__text" onClick={() => this.setState({buttonAdd: true, formMode: formMode.ADD_PLAYER})}>Add Player</span>
                            <span className="button__icon">
                                <i className="fas fa-plus"></i>
                            </span>
                        </button>
                    </div>
                    <div className="player_container" id="container_1">
                        {   players.map(player => (
                            <div className="player_container" id="container_1">
                                <div className="player">
                                    <img src={`/img/players/${player._id}.png`} className="player_img" alt='img'/>
                                    <div className="player_data">
                                        <h1 className="player_title">{player.name} {player.surname}</h1>
                                        <p className="player_info">Phone : {player.phone};</p>
                                        <Link to={`/players/info/${player._id}`} className="">
                                            <div className="player_more_info">
                                                More Info
                                            </div>
                                        </Link>
                                        {isAuthenticated() &&
                                        <>
                                        <label id={player._id} for="player_edit">
                                            <span className="player_button" id={player._id} onClick={() => this.setState(
                                                {buttonEdit: true, 
                                                player: {
                                                    name: player.name,
                                                    surname: player.surname,
                                                    phone: player.phone
                                                },
                                                playerId: player._id,
                                                formMode: formMode.EDIT})}>Edit</span>
                                        </label>
                                        </>
                                        }
                                        {isAuthenticated() && getCurrentUser().role === 'admin' &&
                                            <span className="player_delete" id={player._id} data-modal-target="#delete_team" onClick={() => this.setState({buttonDelete: true, playerId: player._id})}>Delete</span>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                    <div className="br_un"></div>
                </div>
                <PopupPlayer active={this.state.buttonEdit} onSubmit={this.handleSubmit} setActive={this} action={`/players/update/`+this.state.playerId} name="Edit Player Info">
                        <div className="form-inner"  id="form-inner">
                            <input type="text" className={this.state.errors.name.length > 0 ? "error" : ""} placeholder="Name" name="name" onChange={this.handeleChange} defaultValue={this.state.player.name} />
                            <input type="text" className={this.state.errors.surname.length > 0 ? "error" : ""} placeholder="Surname" name="surname" onChange={this.handeleChange} defaultValue={this.state.player.surname}/>
                            <input type="text" className={this.state.errors.phone.length > 0 ? "error" : ""} placeholder="Phone" name="phone" onChange={this.handeleChange} defaultValue={this.state.player.phone} />
                        </div>
                        <div className="line"></div>
                        <div className="errors_info" id="errors_info" style={{fontSize: "12px"}}>
                        {this.state.errors.name.length > 0 || this.state.errors.surname.length > 0 || this.state.errors.phone.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}    
                        </div><br/>
                        <input type="submit" className="close-btn" value="Save"></input>
                </PopupPlayer>

                <PopupPlayer active={this.state.buttonAdd} onSubmit={this.handleSubmit} setActive={this} action={`/players/add`} name="Add Player">
                        <div className="form-inner">
                            <input type="text" className={this.state.errors.phone.length > 0 ? "error" : ""} placeholder="Name" name="name" onChange={this.handeleChange}/>
                            <input type="text" className={this.state.errors.surname.length > 0 ? "error" : ""} placeholder="Surame" name="surname" onChange={this.handeleChange}/>
                            <input type="text" className={this.state.errors.phone.length > 0 ? "error" : ""} placeholder="Phone" name="phone" onChange={this.handeleChange}/>
                            <input type="text" className={this.state.errors.password.length > 0 ? "error" : ""} placeholder="Password" name="password" onChange={this.handeleChange}/>
                        </div>
                        <div class="line"></div>
                        <div class="errors_info" id="errors_info_add" style={{fontSize: "12px"}}>
                        {this.state.errors.name.length > 0 || this.state.errors.surname.length > 0 || this.state.errors.phone.length > 0 || this.state.errors.password.length > 0 ? "The field must be longer than 3 characters and shorter than 50" : ""}    
                        </div><br/>
                        <input type="submit" class="close-btn" value="Save"></input>
                </PopupPlayer>

                <PopupDelete active={this.state.buttonDelete} setActive={this} playerId={this.state.playerId} name="Delete Player ?">
                    <input type="submit" id="delete_yes" class="delete_yes" value="Yes"></input>
                    <input type="button" id="delete_no" class="delete_no" value="No" onClick={() => this.setState({buttonDelete: false, playerId: null})}></input>
                </PopupDelete>

                <div id="overlay" className={this.state.buttonDelete || this.state.buttonAdd || this.state.buttonEdit ? "active" : ""}></div>
            </block>
        )
    }
}

export default PlayersList