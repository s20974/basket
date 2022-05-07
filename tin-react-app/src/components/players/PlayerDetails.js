import React from "react";
import {getPlayerByIdApiCall} from '../../apiCalls/playersApiCalls';
import PlayerDetailsData from "./PlayerDetailsData";
import { getTeamsListApiCall } from "../../apiCalls/teamsApiCalls";
import { withTranslation } from 'react-i18next';

class PlayerDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            playerId: this.props.match.params.playerId,
            player: null,
            error: null,
            isLoaded: false,
            message: null,
            teams: [],
        }
    }

    fetchPlayersByIdApiCall = () => {
        getPlayerByIdApiCall(this.state.playerId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            player: null,
                            message: data.message,
                        })
                    }   else {
                        this.setState({
                            player: data,
                            message: null,
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            ).then()

            
    }


    componentDidMount(){
        this.fetchPlayersByIdApiCall();
       
    }


    render() {
        
        const {player, teams, error, isLoaded, message} = this.state;
        let content;

        if(error){
            content = <p>error: {error.message}</p>
        }   else if (!isLoaded){
            content = <h1 style={{marginTop: "100px", transform: "translate(50%, 50%)"}}>Loading...</h1>
        }   else if (message) {
            content = <p>{message}</p>
        }   else {
            content = <PlayerDetailsData playerData={player} teams={teams}/>
        }

        return(
            <main>
                {content}
            </main>
        )
    }
}

export default withTranslation()(PlayerDetails)