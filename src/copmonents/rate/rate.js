import { Component } from "react";
import PropTypes from 'prop-types';
import MovieService from "../movieService";
import "./rate.css";
import icon from "./star.png";
import iconActive from "./star-active.png";

class Rate extends Component {
  movieService = new MovieService();

  state = {
    stars: this.props.rating,
    movieId: this.props.id,
    guestSession: this.props.session,
  };

  setRate = (e) => {
    const count = e.target.dataset.key;
    this.setState({ stars: count });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.stars !== prevState.stars) {
      this.addRate();
    }
  };

  addRate = () => {
    this.movieService
      .rateMovie(this.state.guestSession, this.state.movieId, this.state.stars)
      .catch(this.onError);
  };

  createStars = () => {
    const elements = [];
    const { stars } = this.state;
    for (let i = 1; i < 11; i++) {
      const pic = i <= stars ? iconActive : icon;
      elements.push(
        <img
          className="star"
          key={i}
          data-key={i}
          src={pic}
          onClick={this.setRate}
        />,
      );
    }
    return elements;
  };

  render() {
    const elements = this.createStars();
    return <div className="rate">{elements}</div>;
  }
}

Rate.defaultProps = {
  id: 0,
  session: '',
  rating: 0
};
Rate.propTypes = {
  id: PropTypes.number,
  session: PropTypes.string,
  rating: PropTypes.number
};

export default Rate
