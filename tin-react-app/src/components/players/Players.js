import React from 'react'
import {getPlayerListApiCall} from '../../apiCalls/playersApiCalls';
import PlayersList from './PlayersList';


class Players extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            players: []
        }
    }

    fetchPlayserList = () => {
        getPlayerListApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        players: data
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
        this.fetchPlayserList();
    }

    render(){
        
        const {error, isLoaded, players} = this.state;
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        }   else if(!isLoaded) {
            content = <p>Loading</p>
        }   else {
            content = <PlayersList playersList = {players}/>
        }
        return(
            <main>
                {content}
            </main>
        )
    }
}



export default Players;