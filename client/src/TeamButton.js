import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TeamButton extends React.Component {
    constructor(props) {
        super(props);

        /* props looks like:
        {
            id
            onClick
            genre
        }
        */
    }

    render() {
        return (
            <div className="team" id={this.props.id} onClick={this.props.onClick}>
                {this.props.team}
            </div>
        );
    }
}
