import { Component } from "react";
import { Spin, Input, Pagination } from "antd";
import { debounce } from 'lodash';

import FilmCard from "../filmCard";
import MovieService from "../movieService";
import "./app.css";
import ErrorIndicator from "../errorIndicator";

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false,
    page: 1,
    searchText: ''
  }

  componentDidMount = () => {
    this.updateMovies()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.page !== prevState.page) {
      this.updateMovies()
    }
    if (this.state.searchText !== prevState.searchText) {
      this.setState({ page: 1 })
      this.updateMovies()
    }
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  }

  updateMovies() {
    this.setState({ movies: [], loading: true })
    this.movieService.searchMovies(this.state.searchText, this.state.page)
      .then((res) => {
        this.setState({ movies: res.results, loading: false });
      })
      .catch(this.onError);
  }

  inputSearch = (e) => {
    if (e.target.value !== '') {
      this.setState({ searchText: e.target.value })
    }
  }

  onChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { movies, loading, error, searchText, page } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spin className="spinner"/> : null;
    const noResults = movies.length > 0 || loading || searchText === '' ? null : <div>I didn`t find anything :c </div>;
    const elements = movies.map((item) => (
      <FilmCard
      key = {item.id}
      film = {item}
      />
    ));
    const startText = movies.length === 0 && !errorMessage && !loading && !noResults ? <div>Search to find some movies</div> : null;
    const pagination = searchText && !loading && !(noResults && page === 1) ? <Pagination className='pagination' current={this.state.page} onChange={this.onChange} total={50}/> : null;

    return (
      <div className="movie-app">
        <div className="main">
          <Input className="search-input" placeholder="Search for a movie..."
                onChange={ debounce(this.inputSearch, 500) }
          />
          <div className="films-list">
            {startText}
            {errorMessage}
            {spinner}
            {noResults}
            {elements}
          </div>
          {pagination}
        </div>
      </div>
    );
  }
}
