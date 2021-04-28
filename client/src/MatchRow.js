import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default class MatchRow extends React.Component {
    constructor(props) {
        super(props);
    }

    /* ---- Q1b (Dashboard) ---- */
    /* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
    render() {
        return (
            <div className="movie">
                <div className="Year">{this.props.YEAR}</div>
                <div className="Stage">{this.props.STAGE}</div>
                <div className="Home Team Name">{this.props.HOME_TEAM_NAME}</div>
                <div className="Home Team Goals">{this.props.HOME_TEAM_GOALS}</div>
                <div className="Away Team Name">{this.props.AWAY_TEAM_NAME}</div>
                <div className="Away Team Goals">{this.props.AWAY_TEAM_GOALS}</div>
            </div>
        );
    }
}