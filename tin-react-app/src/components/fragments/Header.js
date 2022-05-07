import React from "react";
import { checkRequired } from "../helpers/formHelper";
import { loginApiCall } from "../../apiCalls/authApiCalls"
import PopupLogin from '../Popups/PopupLogin'
import { isAuthenticated } from "../../helper/authHelper";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { currentUseInfo } from "../../helper/authHelper";
import { getCurrentUser } from "../../helper/authHelper";

class Header extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            user: {
                phone: '',
                password: '',
            },
            errors: {
                phone: '',
                password: '',
            },
            error: '',
            message: '',
            prevPath: '',
            buttonLogin: false,
            userInfo: '',
        }
    }

    

    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('smth went wrong', err)
        })
    }
    
    handeleChange = (event) => {
        const {name, value} = event.target
        const user = {...this.state.user}
        user[name] = value
        
        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
        console.log(this.state.errors)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const isValid = this.validateForm()
        if(isValid){
            const user = this.state.user
            let responce
            loginApiCall(user)
                .then(res => {
                    responce = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if(responce.status === 200){
                            if(data.token){
                                const userString = JSON.stringify(data)
                                this.props.handleLogin(userString)
                                this.setState({buttonLogin: false})
                            }
                        }   else if(responce.status === 401){
                            console.log(401)
                            this.state({message: data.message})
                        }
                    },
                    (error) => {
                        this.state({
                            isLoaded: true,
                            error
                        })
                    }
                )
        }
    }


    validateField = (fieldName, fieldValue) => {
            let errorMessage = '';
            if(fieldName === 'phone'){
                if(!checkRequired(fieldValue)){
                    errorMessage = 'Pole jest wymagane'
                } 
            }
            if(fieldName === 'adress'){
                if(!checkRequired(fieldValue)){
                    errorMessage = 'Pole jest wymagane'
                } 
            }
            return errorMessage
        }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        console.log(errors)
        for (const fieldName in user){
            const fieldValue = user[fieldName]
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
        console.log(errors)
        for(const errorField in this.state.errors){
            if(errors[errorField].length > 0){
                return true
            }
        }
        return false
    }

    render(){
        const { t } = this.props
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>logout</button> : <button style={{cursor: "pointer"}} onClick={() => this.setState({buttonLogin: true})}>Log In</button>
        return(
            <React.Fragment>
                <input type="checkbox" id="check"/>
                <div className="header">
                    <a href="/"><img src="/img/logo.png" alt="logo"/></a>
                    <span style={{color: "white"}}>
                        {getCurrentUser() &&
                            <>
                            Hello, {getCurrentUser().name} {getCurrentUser().surname} !
                            </>
                        }
                        {/* <% if(loggedUser) { %>
                            Hello, <%= loggedUser.name = " " + loggedUser.surname %> !
                        <% } %> */}
                    </span>
    
                    <div className="nav">
                        
                        <a href="/">{t('nav.mainPage')}</a>
                        <a href="/players">{t('nav.player')}</a>
                        <a href="/teams">{t('nav.teams')}</a>
                        {loginLogoutLink}
                    </div>
                    <div className="lang_change" style={{position: "absolute", left: "96vw"}}>
                        <span  className="" onClick={() => this.handleLanguageChange('ru')}>RU</span>
                        <span className="" onClick={() => this.handleLanguageChange('en')}>EN</span>
                    </div>
                    <label for="check">
                        <i className="fas fa-bars menu-button"></i>
                        <i className="fas fa-times close-button"></i>
                    </label>
                </div>
    
                <PopupLogin active={this.state.buttonLogin} setActive={this} onSubmit={this.handleSubmit} name="LogIn">
                    <div className="form-inner"  id="form-inner">
                        <input type="text" placeholder="Phone" name="phone" id="phone_login" onChange={this.handeleChange}/>
                        <input type="text" placeholder="Password" name="password" id="password_form" onChange={this.handeleChange}/>
                    </div>

                    <div className="line"></div>
                    <div className="errors_info" id="errors_info_login" style={{ fontSize: "12px" }}>
                        
                    </div><br/>
                    <input type="submit" className="close-btn" value="LogIn"></input>		
                </PopupLogin>

                <div id="overlay" className={this.state.buttonLogin ? "active" : ""} style={{zIndex: "100"}}></div>
            </React.Fragment>
        )
    }
    
}

export default withTranslation()(Header);