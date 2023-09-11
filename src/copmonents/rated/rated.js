import { Component } from "react";
import { Spin, Pagination } from "antd";
import PropTypes from 'prop-types';

import FilmCard from "../filmCard";
import MovieService from "../movieService";
import "../app/app.css";
import ErrorIndicator from "../errorIndicator";

class Rated extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false,
    page: 1,
    guestSession: this.props.session,
  };

  componentDidMount = () => {
    this.updateMovies();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.page !== prevState.page) {
      this.updateMovies();
    }
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateMovies() {
    this.setState({ movies: [], loading: true });
    this.movieService
      .getRates(this.state.guestSession, this.state.page)
      .then((res) => {
        this.setState({ movies: res.results, loading: false });
      })
      .catch(this.onError);
  }

  inputSearch = (e) => {
    if (e.target.value !== "") {
      this.setState({ searchText: e.target.value });
    }
  };

  onChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { movies, loading, error, searchText, page, guestSession } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading && !errorMessage ? <Spin className="spinner" /> : null;
    const noResults = movies.length > 0
      || loading
      || searchText === ""
      || errorMessage ? null : (
        <div>I didn`t find anything :c </div>
      );
    const startText = movies.length === 0 && !errorMessage && !loading && !noResults ? (
        <div>No movies</div>
      ) : null;
    const pagination = searchText && !loading && !(noResults && page === 1) && !errorMessage ? (
        <Pagination
          className="pagination"
          current={this.state.page}
          onChange={this.onChange}
          total={50}
        />
      ) : null;
    const elements = movies.map((item) => (
      <FilmCard
        key={item.id}
        film={item}
        rating={item.rating}
        session={guestSession}
      />
    ));
    return (
      <div>
        <div className="films-list">
          {startText}
          {errorMessage}
          {spinner}
          {noResults}
          {elements}
        </div>
        {pagination}
      </div>
    );
  }
}

Rated.defaultProps = {
  session: ''
};
Rated.propTypes = {
  session: PropTypes.string
};

export default Rated
