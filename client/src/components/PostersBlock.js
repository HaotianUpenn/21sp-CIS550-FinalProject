import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PostersBlock extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			name
			poster
			rating
			url
		}
		*/
	}

	render() {
		return (
			<div className="genre"  >
			<h1 align="center">{this.props.moviename}</h1>
			<a target="_blank" rel="noopener noreferrer" href= {this.props.url}><img src={this.props.poster} alt="loading..." /></a>
			<h5 align="center">Rating : {this.props.ratings}</h5>
			</div>
		);
	}
}
