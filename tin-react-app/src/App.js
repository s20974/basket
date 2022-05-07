import React, { Component } from 'react';
import HomePage from './components/pages/HomePage';
import Players from './components/players/Players';
import PlayerDetails from './components/players/PlayerDetails';
import TeamsDetails from './components/teams/TeamsDetails';
import Teams from './components/teams/Teams';
import { isAuthenticated } from './helper/authHelper';
import { getCurrentUser } from './helper/authHelper';
import { Link } from 'react-router-dom';
import { getPlayerByIdApiCall } from "./apiCalls/playersApiCalls";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


import Header from './components/fragments/Header';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: undefined,
      pervPath: '',
    }
  }

  currentUseInfo = (userId) => {
    getPlayerByIdApiCall(userId)
        .then(res => res.json())            
        .then(
            (data) => {
                this.setState({
                  userInfo: data,
                })
            }
        )
  }

  handleLogin = (user) => {
    localStorage.setItem("user", user)
    this.setState({user: user})
  }

  handleLogout = (user) => {
    localStorage.removeItem("user")
    this.setState({user: undefined})
  }

  componentDidMount(){
    const currentUser = getCurrentUser()
    this.setState({user: currentUser})
  }

  render(){
    return(
      <Router>
        <div>
          <Header handleLogin={this.handleLogin} handleLogout={this.handleLogout} currentUseInfo={this.currentUseInfo} />
          <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/players" component={Players}/>
          <Route exact path="/teams" component={Teams}/>
          <Route exact path="/players/info/:playerId" component={PlayerDetails} />
          <Route exact path="/teams/info/:teamId" component={TeamsDetails} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;