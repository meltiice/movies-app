export default class MovieService {
  _apiBase = "https://api.themoviedb.org/3/";

  AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyOGY5MGQ5ODdhMGZjOTAyYzVkZThiOTllNDY4OCIsInN1YiI6IjY0ZTYxZWNjMWZlYWMxMDBlMTY4Y2NhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3bV51BqTrNDF898J5uH-yAm1GcTaN3oj_bKdVnzqMIU";

  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${this.AccessToken}`,
      "Cache-Control": "no-cache",
    },
  };

  async getResource(url) {
    const result = await fetch(`${this._apiBase}${url}`, this.options);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    return await result.json();
  }

  async searchMovies(text, page) {
    const result = await this.getResource(
      `search/movie?query=${text}&include_adult=false&language=en-US&language=en&page=${page}`,
    );
    return result;
  }

  async getGuestSession() {
    const result = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      this.options,
    )
      .then((response) => response.json())
      .then((response) => response.guest_session_id)
      .catch((err) => console.error(err));
    return await result;
  }

  async rateMovie(guestSession, movieId, value) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: `{"value":${value}}`,
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSession}&api_key=dbd28f90d987a0fc902c5de8b99e4688`,
      options,
    )
      .then((response) => response.json())
      .then((response) => response.guest_session_id)
      .catch((err) => console.error(err));
  }

  async getRates(guestSession, page) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const result = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc&api_key=dbd28f90d987a0fc902c5de8b99e4688`,
      options,
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));
    return await result;
  }

  async getGenres() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.AccessToken}`,
      },
    };
    const result = fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options,
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));
    return result;
  }
}
