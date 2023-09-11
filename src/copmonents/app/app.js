import { Component } from "react";
import "./app.css";
import Search from "../search";
import Rated from "../rated";
import MovieService from "../movieService";
import { MovieServiceProvider } from "../movieServiceContext";

export default class App extends Component {
  movieService = new MovieService();

  state = {
    guestSession: localStorage.getItem("guestSession"),
    tab: "Search",
    generes: [],
  };

  componentDidMount = () => {
    this.getGuestSession();
    this.getGeneres();
  };

  getGuestSession = () => {
    if (!this.state.guestSession) {
      this.movieService
        .getGuestSession()
        .then((res) => {
          this.setState({ guestSession: res });
          localStorage.setItem("guestSession", res);
        })
        .catch(this.onError);
    }
  };

  getGeneres = () => {
    this.movieService.getGenres().then((res) => {
      this.setState({ generes: res });
    });
  };

  toggleTab = (element, tab) => {
    const elementActive = document.querySelector(".tab-active");
    if (element !== elementActive) {
      element.classList.toggle("tab-active");
      elementActive.classList.toggle("tab-active");
      this.setState({ tab });
    }
  };

  render() {
    const { tab, guestSession, generes } = this.state;
    const tabComponent = tab === "Search" ? (
        <Search session={guestSession} />
      ) : (
        <Rated session={guestSession} />
      );
    return (
      <div className="movie-app">
        <MovieServiceProvider value={generes}>
          <div className="main">
            <ul className="tab">
              <li
                className="tab-active"
                onClick={(e) => {
                  this.toggleTab(e.target, "Search");
                }}
              >
                Search
              </li>
              <li
                onClick={(e) => {
                  this.toggleTab(e.target, "Rated");
                }}
              >
                Rated
              </li>
            </ul>
            {tabComponent}
          </div>
        </MovieServiceProvider>
      </div>
    );
  }
}
