import { Component } from "react";
import MovieService from "../movieService";
import "./filmPicture.css";

export default class FilmPicture extends Component {
  movieService = new MovieService();

  render() {
    const { picture } = this.props;
    const link = `https://image.tmdb.org/t/p/original${picture}`
    return <img className="film-picture" src={link}/>;
  }
}
