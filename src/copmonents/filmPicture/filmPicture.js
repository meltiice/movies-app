import { Component } from "react";
import PropTypes from 'prop-types';

import "./filmPicture.css";
import icon from "./nopicture.png";

class FilmPicture extends Component {
  render() {
    const { picture } = this.props;
    const link = picture
      ? `https://image.tmdb.org/t/p/original${picture}`
      : icon;
    return <img className="film-picture" src={link} />;
  }
}
FilmPicture.defaultProps = {
  picture: ''
}
FilmPicture.propTypes = {
  picture: PropTypes.string
};

export default FilmPicture
