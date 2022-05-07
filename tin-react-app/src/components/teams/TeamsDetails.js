import React from "react";
import { getTeamByIdApiCall } from "../../apiCalls/teamsApiCalls";
import TeamsDetailsData from "./TeamsDetailsData";

class TeamsDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            teamId: this.props.match.params.teamId,
            team: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchTeamByIdApiCall = () => {
        getTeamByIdApiCall(this.state.teamId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            team: null,
                            message: data.message,
                        })
                    }   else {
                        this.setState({
                            team: data,
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
            )
    }

    componentDidMount(){
        this.fetchTeamByIdApiCall()
    }

    render() {
        
        const {team, error, isLoaded, message} = this.state;
        let content;

        if(error){
            content = <p>error: {error.message}</p>
        }   else if (!isLoaded){
            content = <h1 style={{marginTop: "100px", transform: "translate(50%, 50%)"}}>Loading...</h1>
        }   else if (message) {
            content = <p>{message}</p>
        }   else {
            content = <TeamsDetailsData playerData={team}/>
        }

        return(
            <main>
                {content}
            </main>
        )
    }
}

export default TeamsDetails