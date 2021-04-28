import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './dashboard.css';
import PageNavBar from './PageNavBar';
import MatchRow from './MatchRow';


export default class Country extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name : this.props.name,
            pic : "",
            team : "",
            intro : "",
            matches : []
        }

    }

    componentDidMount() {
        // Send an HTTP request to the server.
        fetch("http://localhost:8081/countryPic/"+this.state.name,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(res =>{
            this.setState({
                pic: res[0]
            });
        },err =>{
            console.log(err);
        });

        fetch("http://localhost:8081/teamPic/"+this.state.name,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(res =>{
            this.setState({
                team: res[0]
            });
        },err =>{
            console.log(err);
        });

        fetch("http://localhost:8081/countryIntro/"+this.state.name,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(res =>{
            this.setState({
                intro: res[0]
            });
        },err =>{
            console.log(err);
        });

        fetch("http://localhost:8081/countryMatches/"+this.state.name,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(MatchList => {
            if (!MatchList) return;
            // Map each genreObj in genreList to an HTML element:
            // A button which triggers the showMovies function for each genre.
            let matchDivs = MatchList.map((match, i) =>
                <MatchRow YEAR={match['Year']} STAGE={match['Stage']} HOME_TEAM_NAME={match['HomeTeamName']} HOME_TEAM_GOALS={match['HomeTeamGoals']} AWAY_TEAM_NAME={match['AwayTeamName']} AWAY_TEAM_GOALS={match['AwayTeamGoals']} />
            );

            // Set the state of the genres list to the value returned by the HTTP response from the server.
            this.setState({
                matches: matchDivs
            });
        }, err => {
            // Print the error if there is one.
            console.log(err);
        });


    }

    render() {
        return (
            <div className="Dashboard" style={{ backgroundImage: `url(${this.state.pic})` }}>

                <PageNavBar active="Country" />

                <br></br>
                <div className="container movies-container" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
                    <div className="jumbotron">
                        <div className="h1">{this.state.name}</div>
                        <br></br>
                        <img className="teamImg" src={this.state.team} alt={this.state.name} />
                        <br></br>
                        <br></br>
                        <div className="h">{this.state.intro}</div>
                    </div>
                </div>



                <div className="container movies-container" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
                <div className="jumbotron">
                    <div className="h5">Latest FIFA World Cup matches</div>
                    <div className="years-container">
                        <div className="years-header">
                            <div className="header"><strong>Year</strong></div>
                            <div className="header"><strong>Stage</strong></div>
                            <div className="header"><strong>Home Team Name</strong></div>
                            <div className="header"><strong>Home Team Goals</strong></div>
                            <div className="header"><strong>Away Team Name</strong></div>
                            <div className="header"><strong>Away Team Goals</strong></div>
                        </div>
                        <div className="results-container" id="results">
                            {this.state.matches}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}