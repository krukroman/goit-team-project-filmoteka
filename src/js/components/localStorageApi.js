export default class LocalStorageApi {
  constructor() {
    //  this.test = null
  }

  initStorage() {
    try {
      this.init('Watched', []);
      this.init('Queue', []);
    } catch (err) {}
  }

  getMovies(key) {
    const keyStorage = this.load(key);

    if (Array.isArray(keyStorage)) {
      return keyStorage;
    }
    this.save(key, []);
    return [];
  }
  addMovie(key, value) {
    let dataFromLocalStorage = this.load(key);
    this.save(key, [value, ...dataFromLocalStorage]);
  }

  removeMovie(key, value) {
    let dataFromLocalStorage = this.load(key);
    for (let obj of dataFromLocalStorage) {
      if (obj.id === value.id) {
        const valueIndex = dataFromLocalStorage.indexOf(obj);
        dataFromLocalStorage.splice(valueIndex, 1);
        this.save(key, dataFromLocalStorage);
      }
    }
  }

  init(key) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, '[]');
    }
  }

  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? [] : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }

  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  }
  checkMovie(list, id) {
    if (localStorage.getItem(list)) {
      return localStorage.getItem(list).includes(id);
    } else return false;
  }
}
