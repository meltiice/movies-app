export default class MovieService {
  _apiBase = "https://api.themoviedb.org/3/";

  AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyOGY5MGQ5ODdhMGZjOTAyYzVkZThiOTllNDY4OCIsInN1YiI6IjY0ZTYxZWNjMWZlYWMxMDBlMTY4Y2NhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3bV51BqTrNDF898J5uH-yAm1GcTaN3oj_bKdVnzqMIU";

  options = {
   method: "GET",
   headers: {
     accept: "application/json",
     Authorization: `Bearer ${this.AccessToken}`
   }
 };

  async getResource(url) {
    const result = await fetch(`${this._apiBase}${url}`, this.options);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    return await result.json();
  }

  async getAllMovies() {
    const result = await this.getResource('search/movie?query=return&include_adult=false&language=en-US&page=1');
    return result;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}`);
  }
}
