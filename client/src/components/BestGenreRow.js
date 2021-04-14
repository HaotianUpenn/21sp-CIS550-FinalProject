import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.GENRE}</div>
				<div className="rating">{this.props.AVERAGE_RATING}</div>
			</div>
		);
	}
}
