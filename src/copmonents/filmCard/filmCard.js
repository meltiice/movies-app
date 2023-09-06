import { Component } from "react";
import { Col, Row } from "antd";
import { format } from 'date-fns';

import FilmContent from "../filmContent";
import FilmPicture from "../filmPicture";
import "./filmcard.css";

export default class FilmCard extends Component {
  state = {
    id: this.props.film.id,
    title: this.props.film.original_title,
    overview: this.cutDescription(this.props.film.overview, this.props.film.original_title),
    releaseDate: format(new Date(...this.props.film.release_date.split('-').map(Number)), 'MMMM d, yyyy'),
    picture: this.props.film.poster_path,
  }

  onFilmLoaded(film) {
    this.setState({ film, loading: false })
  }

  cutDescription(text, title) {
    let newString;
    const textArr = text.split(' ');
    let wordsLength = 5 + (7 - Math.trunc(title.length / 6)) * 4
    if (wordsLength <= 0) { wordsLength = 5 }
    textArr.splice(wordsLength);
    if (textArr.length === text.split(' ').length) {
      newString = text;
    } else {
      newString = `${textArr.join(' ')} ...`
    }
    return newString;
  }

  render() {
    const { id, title, overview, releaseDate, picture } = this.state;
    return (
      <div className="film-card">
        <Row>
          <Col span={10} className="picture-container">
            <FilmPicture id={id} picture={picture}/>
          </Col>
          <Col span={14}>
            <FilmContent title = {title} overview={overview} releaseDate={releaseDate} />
          </Col>
        </Row>
      </div>
    );
  }
}
