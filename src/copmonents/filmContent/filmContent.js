import { Component } from "react";
import { Typography } from "antd";
import PropTypes from 'prop-types';
import Rate from "../rate";
import "./filmContent.css";
import { MovieServiceConsumer } from "../movieServiceContext";

const { Title, Paragraph, Text } = Typography;

class FilmContent extends Component {
  colorRate = (averageRate) => {
    let className = "";
    if (averageRate < 3) {
      className = "color-low";
    } else if (averageRate < 5) {
      className = "color-middle";
    } else if (averageRate < 7) {
      className = "color-high";
    } else if (averageRate <= 10) {
      className = "color-amazing";
    }
    return className;
  };

  render() {
    const {
      id,
      title,
      overview,
      releaseDate,
      session,
      rating,
      averageRate,
      genresIds,
    } = this.props;
    const classNameRating = `rating ${this.colorRate(averageRate)}`;
    return (
      <MovieServiceConsumer>
        {(generes) => {
          const filmGenres = genresIds
            ? genresIds
                .map((idx) => generes.genres.find((item) => item.id === idx))
                .map((obj) => (
                  <li key={obj.id} className="genere">
                    {obj.name}
                  </li>
                ))
            : null;
          return (
            <div className="film-content">
              <div className="title-container">
                <Title level={3} className="title">
                  {title}
                </Title>
                <div className={classNameRating}>
                  <p className="rating-number">{averageRate}</p>
                </div>
              </div>
              <ul className="genere-container">{filmGenres}</ul>
              <Text className="film-date">{releaseDate}</Text>
              <Paragraph className="paragraph">{overview}</Paragraph>
              <Rate
                className="rate"
                session={session}
                id={id}
                rating={rating}
              />
            </div>
          );
        }}
      </MovieServiceConsumer>
    );
  }
}
FilmContent.defaultProps = {
  id: 0,
  title: '',
  overview: '',
  releaseDate: '',
  session: '',
  rating: 0,
  averageRate: 0,
  genresIds: [],
}
FilmContent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  session: PropTypes.string,
  rating: PropTypes.number,
  averageRate: PropTypes.number,
  genresIds: PropTypes.arrayOf(PropTypes.number),
};

export default FilmContent
