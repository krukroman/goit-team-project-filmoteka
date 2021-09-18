const API_KEY = 'bb47124fe990b3a04ccb5a994cf49456';
const BASE_URL = 'https://api.themoviedb.org/3/movie'; //Popular , by ID
const BASE_URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week?'; //trending
const BASE_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.movieId = '';
    this.pageNumber = 1;
  }

  // when page are load, will fetch trend movies on this week
  async fetchTrend() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });
    const url = `${BASE_URL_TRENDING}${searchParams}`;
    const response = await fetch(url);
    const collection = await response.json();
    return collection;
  }
  //------------------------------------------------------------//
  // optional, fetch popular movies
  async fetchPopular() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      page: this.pageNumber,
    });
    const url = `${BASE_URL}/popular?${searchParams}`;
    const response = await fetch(url);
    const collection = await response.json();
    return collection;
  }
  //------------------------------------------------------------//
  // fetch movie by ID
  async fetchById() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });
    const url = `${BASE_URL}/${this.movieId}?${searchParams}`;
    const response = await fetch(url);
    const movieInfo = await response.json();
    return movieInfo;
  }
  //------------------------------------------------------------//
  // fetch movies by keywords
  async fetchByKeyWord() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: this.searchQuery,
      page: this.pageNumber,
    });
    const url = `${BASE_URL_SEARCH}${searchParams}`;
    const response = await fetch(url);
    const collection = await response.json();
    return collection;
  }
  //------------------------------------------------------------//
  // fetch Genres
  async fetchGenres() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });
    const url = `https://api.themoviedb.org/3/genre/movie/list?${searchParams}`;
    const response = await fetch(url);
    const genres = await response.json();
    return genres;
  }
  //------------------------------------------------------------//
  //imcrement page number
  incrementPageNumber() {
    this.pageNumber += 1;
  }
  //------------------------------------------------------------//
  //decrement page number
  decrementPageNubmer() {
    this.pageNumber -= 1;
  }
  //------------------------------------------------------------//
  // reset page number
  resetPageNubmber() {
    this.pageNumber = 1;
  }
  //------------------------------------------------------------//
  //------------------------------------------------------------//
  // set & get page number value
  set page(newPageNumber) {
    this.pageNumber = newPageNumber;
  }
  get page() {
    return this.pageNumber;
  }
  //------------------------------------------------------------//
  // set search query value
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  //------------------------------------------------------------//
  // set movie id value
  set id(newId) {
    this.movieId = newId;
  }
  //------------------------------------------------------------//
}
