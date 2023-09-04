import { Component } from "react";
import { format } from 'date-fns';

import FilmCard from "../filmCard";
import MovieService from "../movieService";
import "./app.css";

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: []
  }

  constructor(props) {
    super(props);
    this.updateMovies();
  }

  cutDescription(text) {
    let newString;
    const textArr = text.split(' ');
    textArr.splice(30);
    if (textArr.length === text.split(' ').length) {
      newString = text;
    } else {
      newString = `${textArr.join(' ')} ...`
    }
    console.log(newString)
    return newString;
  }

  updateMovies() {
    this.movieService.getAllMovies()
      .then((res) => {
        this.setState({ movies: res.results });
      });
  }

  render() {
    const { movies } = this.state;
    if (movies.length > 0) { this.cutDescription(movies[0].overview) }
    const elements = movies.map((item) => (
      <FilmCard
      key = {item.id}
      id={item.id}
      title={item.original_title}
      overview={this.cutDescription(item.overview)}
      releaseDate={format(new Date(...item.release_date.split('-').map(Number)), 'MMMM d, yyyy')}
      picture={item.poster_path}
      />
    ));

    return (
      <div className="movie-app">
        {elements}
      </div>
    );
  }
}
