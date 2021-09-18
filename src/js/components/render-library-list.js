import createContentMarkup from './create-markup';
import contentCardsTmp from '../../templates/content-my-library.hbs';
import updateGenresInfo from './update-genres-info';
import updateRating from './update-rating';
import updateYearinfo from './update-year-info';
import { contentCardsRef } from '../header/header.main';
import loaderSpinner from './loader-spinner';
// import { onCardClick, insert } from './on-film-card';
import LocalStorageApi from './localStorageApi';
import LoadMoreBtn from './load-more-btn';

const localStorageApi = new LocalStorageApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.js-load-more',
  hidden: true,
});

export let libPage = 1;
let cardsPerPage = 9;

localStorageApi.initStorage();

function onLibraryClick() {
  const list = localStorageApi.getMovies('Watched');
  if (list.length <= 0) {
    contentCardsRef.innerHTML = `<li><h2>Watched list is empty</h2></li>`;
    loadMoreBtn.hide();
  } else {
    loadMoreBtn.show();
    renderLibContent(localStorageApi.getMovies('Watched'), contentCardsRef);
  }
}

function onLibraryBtnClick(event) {
  resetLibPage();
  if (window.innerWidth < 768) {
    setCardsPerPage(4);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    setCardsPerPage(8);
  } else if (window.innerWidth >= 1024) {
    defCardsPerPage();
  }
  let key = event.target.dataset.name;
  const list = localStorageApi.getMovies(key);
  if (list.length > 0) {
    renderLibContent(localStorageApi.getMovies(key), contentCardsRef);
  } else {
    contentCardsRef.innerHTML = `<li><h2>${key} list is empty</h2></li>`;
    loadMoreBtn.hide();
  }
}

async function renderLibContent(array, elemtRef) {
  let collection = [];
  let start = (libPage - 1) * cardsPerPage;
  let end = start + cardsPerPage;
  let libTotalPages = Math.ceil(array.length / cardsPerPage);
  loaderSpinner.loaderShow(elemtRef);

  try {
    if (libTotalPages === 1) {
      collection = array;
      loadMoreBtn.hide();
    } else {
      collection = array.slice(start, end);
      loadMoreBtn.show();
    }
    createContentMarkup(elemtRef, collection, contentCardsTmp(collection));
    updateGenresInfo();
    updateYearinfo();
    updateRating();
    loadMoreBtn.enable();
    if (libPage === libTotalPages) {
      loadMoreBtn.disable();
    }

    loaderSpinner.loaderHide(elemtRef);
  } catch (error) {
    console.log(error);
  }
}

function incementLibPage() {
  libPage += 1;
}

function resetLibPage() {
  libPage = 1;
}

function setCardsPerPage(newValue) {
  cardsPerPage = newValue;
}

function defCardsPerPage() {
  cardsPerPage = 9;
}

export {
  onLibraryClick,
  onLibraryBtnClick,
  renderLibContent,
  incementLibPage,
  resetLibPage,
  setCardsPerPage,
  defCardsPerPage,
};
