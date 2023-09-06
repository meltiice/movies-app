import { Component } from "react";

// import MovieService from "../movieService";
import "./filmPicture.css";
import icon from './noimage.png'

export default class FilmPicture extends Component {
  render() {
    const { picture } = this.props;
    const link = picture ? `https://image.tmdb.org/t/p/original${picture}` : icon
    return <img className="film-picture" src={link}/>;
  }
}
