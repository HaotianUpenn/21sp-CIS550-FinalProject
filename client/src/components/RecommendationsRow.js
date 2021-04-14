import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="title">{this.props.TITLE}</div>
				<div className="id">{this.props.ID}</div>
				<div className="rating">{this.props.RATING}</div>
				<div className="votes">{this.props.VOTE_COUNT}</div>
			</div>
		);
	}
}
