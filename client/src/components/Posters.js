import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import PostersBlock from './PostersBlock';


export default class Posters extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      movies: []
    }
    this.getapi = this.getapi.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    let poster;
    fetch("http://localhost:8081/posters",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(res =>{
        res.map(temp=>this.getapi(temp))
      },err =>{
        console.log(err);
      });


  }


  getapi(sqlres) {
    return fetch("http://www.omdbapi.com/?i=" + sqlres.imdb_id + "&apikey=28dd6ee",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(apires=>{
        let jumpurl = "https://www.imdb.com/title/" + sqlres.imdb_id;
        let temp = <PostersBlock moviename = {sqlres.title} url = {jumpurl} ratings = {sqlres.rating} poster ={apires.Poster}/>
       this.setState({
          movies: [...this.state.movies,temp]
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      })
  }

  render() {
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Posters</div>
            <div className="genres-container">
              {this.state.movies}
            </div>
          </div>
        </div>
      </div>
    );
  }
}