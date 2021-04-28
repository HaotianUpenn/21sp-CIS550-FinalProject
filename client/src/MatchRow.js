import React from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.css'

export default class MatchRow extends React.Component {
    constructor(props) {
        super(props);
    }

    /* ---- Q1b (Dashboard) ---- */
    /* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
    render() {
        return (
            <div className="year">
                <div className="Matches">{this.props.YEAR}</div>
                <div className="Matches">{this.props.STAGE}</div>
                <div className="Matches">{this.props.HOME_TEAM_NAME}</div>
                <div className="Matches">{this.props.HOME_TEAM_GOALS}</div>
                <div className="Matches">{this.props.AWAY_TEAM_NAME}</div>
                <div className="Matches">{this.props.AWAY_TEAM_GOALS}</div>
            </div>
        );
    }
}