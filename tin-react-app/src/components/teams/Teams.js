import React from 'react'
import {getTeamsListApiCall} from '../../apiCalls/teamsApiCalls';
import TeamsList from './TeamsList';


class Teams extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            teams: []
        }
    }

    fetchTeamsList = () => {
        getTeamsListApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        teams: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount(){
        this.fetchTeamsList();
    }

    render(){
        
        const {error, isLoaded, teams} = this.state;
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        }   else if(!isLoaded) {
            content = <p>Loading</p>
        }   else {
            content = <TeamsList teamsList = {teams}/>
        }
        return(
            <main>
                {content}
            </main>
        )
    }
}



export default Teams;