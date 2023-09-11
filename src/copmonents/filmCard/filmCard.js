import { Component } from "react";
import { Col, Row } from "antd";
import { format } from "date-fns";
import PropTypes from 'prop-types';

import FilmContent from "../filmContent";
import FilmPicture from "../filmPicture";
import "./filmcard.css";

class FilmCard extends Component {
  state = {
    id: this.props.film.id,
    title: this.props.film.original_title,
    overview: this.cutDescription(
      this.props.film.overview,
      this.props.film.original_title,
    ),
    releaseDate: format(
      new Date(...this.props.film.release_date.split("-").map(Number)),
      "MMMM d, yyyy",
    ),
    picture: this.props.film.poster_path,
    rating: this.props.film.rating,
    averageRate: Math.round(this.props.film.vote_average * 10) / 10,
    genresIds: this.props.film.genre_ids,
    session: this.props.session,
  };

  onFilmLoaded(film) {
    this.setState({ film, loading: false });
  }

  cutDescription(text) {
    let newString;
    const textArr = text.split(" ");
    const wordsLength = 15;
    textArr.splice(wordsLength);
    if (textArr.length === text.split(" ").length) {
      newString = text;
    } else {
      newString = `${textArr.join(" ")} ...`;
    }
    return newString;
  }

  render() {
    const {
      id,
      title,
      overview,
      releaseDate,
      picture,
      session,
      rating,
      averageRate,
      genresIds,
    } = this.state;
    return (
      <div className="film-card">
        <Row>
          <Col span={10} className="picture-container">
            <FilmPicture id={id} picture={picture} />
          </Col>
          <Col span={14} className="content-container">
            <FilmContent
              title={title}
              overview={overview}
              releaseDate={releaseDate}
              genresIds={genresIds}
              id={id}
              session={session}
              rating={rating}
              averageRate={averageRate}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
FilmCard.defaultProps = {
  session: '',
  film: {
    id: 0,
    title: '',
    overview: '',
    releaseDate: '',
    picture: '',
    rating: 0,
    averageRate: 0,
    genresIds: []
  }
}
FilmCard.propTypes = {
  session: PropTypes.string,
  film: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    picture: PropTypes.string,
    rating: PropTypes.number,
    averageRate: PropTypes.number,
    genresIds: PropTypes.arrayOf(PropTypes.number),
  })
};

export default FilmCard
