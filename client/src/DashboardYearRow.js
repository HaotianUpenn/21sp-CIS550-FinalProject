import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardYearRow extends React.Component {
    constructor(props) {
        super(props);
    }

    /* ---- Q1b (Dashboard) ---- */
    /* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
    render() {
        return (
            <div className="year">
                <div className="Team">{this.props.TEAM}</div>
                <div className="Year">{this.props.YEAR}</div>
                <div className="Matches">{this.props.MATCHES}</div>
            </div>
        );
    }
}
