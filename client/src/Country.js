import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PageNavBar from './PageNavBar';
import MatchRow from './MatchRow';


export default class Country extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name : this.props.name,
            pic : "",
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
                <MatchRow YEAR={match['Year']} STAGE={match['Stage']} HOME_TEAM_NAME={match['Home Team Initials']} HOME_TEAM_GOALS={match['Home Team Goals']} AWAY_TEAM_NAME={match['Away Team Initials']} AWAY_TEAM_GOALS={match['Away Team Goals']} />
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
            <div className="Dashboard">

                <PageNavBar active="Country" />

                <br></br>
                <div className="container movies-container">
                    <div className="jumbotron">
                        <div className="h5">{this.state.name}</div>
                    </div>
                </div>
                <img src={this.state.pic} alt={this.state.name} />
                <div className="h5">{this.state.intro}</div>

                <br></br>
                <div className="jumbotron">
                    <div className="movies-container">
                        <div className="movies-header">
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
        );
    }
}