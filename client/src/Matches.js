import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import TeamButton from './TeamButton';
import PageNavbar from './PageNavBar';
import DashboardYearRow from './DashboardYearRow';
import RecommendationsRow from './RecommendationsRow';
export default class Matches extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {

            teams: [],
            years: [],

            selectedDecade: "",
            champion:"",
            cups: [],

            playerName: "",
            playerInfo: []
        };

        this.showResult = this.showResult.bind(this);
        this.submitDecade = this.submitDecade.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
        this.submitPlayer = this.submitPlayer.bind(this);

    }

    handlePlayerNameChange(e) {
        this.setState({
            playerName: e.target.value
        });

    }

    // React function that is called when the page load.
    componentDidMount() {
        // Send an HTTP request to the server.
        fetch("http://localhost:8081/teams",
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(teamList => {
            if (!teamList) return;
            // Map each genreObj in genreList to an HTML element:
            // A button which triggers the showMovies function for each genre.
            let teamDivs = teamList.map((teamObj, i) =>
                <TeamButton id={"button-" + teamObj.team} onClick={() => this.showResult(teamObj.team)} team={teamObj.team} />
            );

            // Set the state of the genres list to the value returned by the HTTP response from the server.
            this.setState({
                teams: teamDivs
            });
        }, err => {
            // Print the error if there is one.
            console.log(err);
        });

        fetch("http://localhost:8081/cups",
            {
                method: "GET"
            }).then(res => {
            return res.json();
        }, err => {
            console.log(err);
        }).then(cupsList => {
            console.log(cupsList); //displays your JSON object in the console

            let cupsDivs = cupsList.map(cupObj =>
                <option value={cupObj.Year}>{cupObj.Year} </option>
            );

            //This saves our HTML representation of the data into the state, which we can call in our render function
            this.setState({
                cups: cupsDivs
            });
        });
    }

    handleChange(e) {
        this.setState({
            selectedDecade: e.target.value
        });
    }


    /* ---- Q1b (Dashboard) ---- */
    /* Set this.state.movies to a list of <DashboardYearRow />'s. */
    showResult(team) {
        fetch("http://localhost:8081/teams/"+team,
            {
                method: 'GET' // The type of HTTP request.
            }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(team => {
            if (!team) return;
            // Map each genre in List to an HTML element:
            // A button which triggers the showMovies function for each genre.
            // console.log(genre)
            let temp = team.map(t =>
                <DashboardYearRow TEAM={t.Team} YEAR={t.Year} MATCHES={t.Matches} />
            )

            /* Set this.state.movies to a list of <DashboardYearRow />'s. */
            this.setState({years:temp});
        }, err => {
            // Print the error if there is one.
            console.log(err);
        });
    }

    submitDecade() {
        fetch("http://localhost:8081/cups/"+this.state.selectedDecade,
            {
                method: "GET"
            }).then(res => {
            return res.json();
        }, err => {
            console.log(err);
        }).then(champ => {
            console.log(champ); //displays your JSON object in the console
            let temp = champ.map(t =>
                t.champion
            )
            this.setState({champion:temp});

        });
    }

    submitPlayer() {
        fetch("http://localhost:8081/player/" + this.state.playerName,
            {
                method: "GET"
            }).then(res => {
            return res.json();
        }, err => {
            console.log(err);
        }).then(movieList => {
            console.log(movieList); //displays your JSON object in the console
            let movieDivs = movieList.map(movie => (
                <RecommendationsRow YEAR = {movie.Year} />)
            );

            this.setState({playerInfo:movieDivs});
        });
    }


    render() {
        return (
            <div style={{ backgroundImage: `url('./images/background.jpg') `}}>
                <div className="Dashboard">

                    <PageNavbar active="Matches"/>
                    <br></br>
                    <div className="container years-container">
                        <div className="jumbotron">
                            <div className="h5">Teams in WorldCup</div>
                            <div className="h6"><i>Click to learn how many WorldCup Finals your country has been in!</i></div>
                            <div className="teams-container">
                                {this.state.teams}
                            </div>
                        </div>

                        <br></br>
                        <div className="jumbotron">
                            <div className="years-container">
                                <div className="years-header">
                                    <div className="header-lg"><strong>Team</strong></div>
                                    <div className="header"><strong>Year</strong></div>
                                    <div className="header"><strong>Number of WorldCup matches</strong></div>
                                </div>
                                <div className="results-container" id="results">
                                    {this.state.years}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container bestgenres-container">
                        <div className="jumbotron">
                            <div className="h5">Choose a WorldCup to see the champion</div>

                            <div className="years-container">
                                <div className="dropdown-container">
                                    <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
                                        <option select value> -- select an option -- </option>
                                        {this.state.cups}
                                    </select>
                                    <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
                                    <div className="results-container" id="results">
                                        {this.state.champion}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container recommendations-container">
                        <div className="jumbotron">
                            <div className="h5">Enter your favorate player's name to see if he has won a WorldCup</div>
                            <br></br>
                            <div className="input-container">
                                <input type='text' placeholder="For example: ballack" value={this.state.playerName} onChange={this.handlePlayerNameChange} id="movieName" className="movie-input"/>
                                <button id="submitMovieBtn" className="submit-btn" onClick={this.submitPlayer}>Submit</button>
                            </div>
                            <div className="header-container">

                                <div className="headers">
                                    <div className="header"><strong>Year</strong></div>
                                </div>
                            </div>
                            <div className="results-container" id="results">
                                {this.state.playerInfo}
                            </div>
                        </div>
                    </div>








                </div>
            </div>
        );
    }
}