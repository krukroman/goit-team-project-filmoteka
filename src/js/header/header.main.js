import ApiService from '../api-service/api-service';
import pageInit from '../components/page-init';
import renderContent from '../components/render-content';
import pageOnSearch from '../components/on-search';
import LocalStorageApi from '../components/localStorageApi';
import LoadMoreBtn from '../components/load-more-btn';
import { setBtnState, setBtnDefaultState } from '../components/set-btn-state';
import {
  onLibraryClick,
  onLibraryBtnClick,
  incementLibPage,
  resetLibPage,
  renderLibContent,
  setCardsPerPage,
  defCardsPerPage,
} from '../components/render-library-list';

const localStorageApi = new LocalStorageApi();
const debounce = require('lodash/debounce');
const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.js-load-more',
  hidden: true,
});

//=================================================//
export const contentCardsRef = document.querySelector('.content__cards');
export const contentBtnListRef = document.querySelector('.content__btn__list');

const contentBtnActiveSelector = 'content__btn--active';
const contentBtnDefDataTag = 'data-tag';
const contentBtnDefDataTagValue = 'trend';
//=================================================//
start();
//================================================//
function start() {
  pageInit(apiService, contentCardsRef);

  setBtnDefaultState(
    contentBtnListRef,
    contentBtnDefDataTag,
    contentBtnDefDataTagValue,
    contentBtnActiveSelector,
  );

  apiService.resetPageNubmber();
  loadMoreBtn.hide();
  loadMoreBtn.refs.button.removeEventListener('click', loadMorePopular);
  loadMoreBtn.refs.button.removeEventListener('click', loadMoreSearch);
  loadMoreBtn.refs.button.removeEventListener('click', loadMoreLib);
}

contentBtnListRef.addEventListener('click', onContentBtnClick);

async function onContentBtnClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.dataset.tag === contentBtnDefDataTagValue) {
    contentCardsRef.innerHTML = '';
    renderContent(apiService.fetchTrend({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
    apiService.resetPageNubmber();
    loadMoreBtn.refs.button.removeEventListener('click', loadMorePopular);
    loadMoreBtn.hide();
  } else {
    contentCardsRef.innerHTML = '';
    renderContent(apiService.fetchPopular({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
    loadMoreBtn.refs.button.addEventListener('click', loadMorePopular);
    apiService.resetPageNubmber();
    loadMoreBtn.show();
  }
}

async function loadMorePopular(e) {
  e.preventDefault();
  apiService.incrementPageNumber();
  renderContent(apiService.fetchPopular({}), contentCardsRef);
}

//================================================//

export const refs = {
  searchField: document.querySelector('.js-input'),
  libPage: document.querySelector('.lib-container'),
  homePage: document.querySelector('.home-container'),
  watchedBtn: document.querySelector('.js-watched'),
  queueBtn: document.querySelector('.js-queue'),
  contentFilterBtn: document.querySelector('.content__btn__list'),
  headerNav: document.querySelectorAll('.header__nav-wrapper'),
  badSearchMsg: document.querySelector('.header__warning'),
  lastClickedFilterBtn: null,
};

refs.headerNav[0].addEventListener('click', onNavButton);
refs.headerNav[1].addEventListener('click', onNavButton);
refs.searchField.addEventListener('input', debounce(onInput, 1000));

function onNavButton(event) {
  event.preventDefault;
  let value = event.target.dataset.index;
  if (value === 'home') {
    onHomeBtn(event);
  } else if (value === 'liba') {
    onLibBtn(event);
  }
}

function onHomeBtn() {
  refs.watchedBtn.removeEventListener('click', onWatched);
  refs.queueBtn.removeEventListener('click', onQueue);
  refs.homePage.removeAttribute('style', 'display: none');
  refs.libPage.setAttribute('style', 'display: none');
  refs.contentFilterBtn.removeAttribute('style', 'display: none');
  start();
  refs.searchField.value = '';
}

function onLibBtn(event) {
  refs.lastClickedFilterBtn = event.target.dataset.name;
  refs.watchedBtn.addEventListener('click', onWatched);
  refs.queueBtn.addEventListener('click', onQueue);
  apiService.resetPageNubmber();
  if (window.innerWidth < 768) {
    setCardsPerPage(4);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    setCardsPerPage(8);
  } else if (window.innerWidth >= 1024) {
    defCardsPerPage();
  }
  loadMoreBtn.refs.button.removeEventListener('click', loadMorePopular);
  loadMoreBtn.refs.button.removeEventListener('click', loadMoreSearch);
  contentCardsRef.innerHTML = '';
  resetLibPage();
  onLibraryClick(event);
  refs.homePage.setAttribute('style', 'display: none');
  refs.libPage.removeAttribute('style', 'display: none');
  refs.contentFilterBtn.setAttribute('style', 'display: none');
  refs.watchedBtn.classList.add('modal-button--active');
  refs.queueBtn.classList.remove('modal-button--active');
  refs.searchField.value = '';
  loadMoreBtn.refs.button.addEventListener('click', loadMoreLib);
}

function onInput(event) {
  loadMoreBtn.refs.button.removeEventListener('click', loadMorePopular);
  if (!refs.badSearchMsg.hasAttribute('style')) {
    refs.badSearchMsg.setAttribute('style', 'display: none');
  }

  refs.contentFilterBtn.setAttribute('style', 'display: none');
  let searchQuery = event.target.value;
  if (searchQuery.trim() === '' || searchQuery === '') {
    refs.badSearchMsg.removeAttribute('style', 'display: none');
    refs.searchField.value = '';
    start();
    refs.contentFilterBtn.removeAttribute('style', 'display: none');
    return;
  }
  //=========================================================//
  apiService.resetPageNubmber();
  loadMoreBtn.show();
  loadMoreBtn.refs.button.addEventListener('click', loadMoreSearch);
  //=========================================================//
  apiService.query = searchQuery;
  contentCardsRef.innerHTML = '';
  pageOnSearch(apiService, contentCardsRef);
}

function onWatched(event) {
  refs.lastClickedFilterBtn = event.target.dataset.name;
  contentCardsRef.innerHTML = '';
  onLibraryBtnClick(event);
  refs.watchedBtn.classList.add('modal-button--active');
  refs.queueBtn.classList.remove('modal-button--active');
}

function onQueue(event) {
  refs.lastClickedFilterBtn = event.target.dataset.name;
  contentCardsRef.innerHTML = '';
  onLibraryBtnClick(event);
  refs.watchedBtn.classList.remove('modal-button--active');
  refs.queueBtn.classList.add('modal-button--active');
}

function loadMoreSearch(e) {
  e.preventDefault();
  apiService.incrementPageNumber();
  pageOnSearch(apiService, contentCardsRef);
}

function loadMoreLib(e) {
  e.preventDefault();
  let key = '';
  const libBtnsContainer = document.querySelector('.header__filter-button-wrapper');
  for (const child of libBtnsContainer.children) {
    if (child.classList.contains('modal-button--active')) {
      key = child.dataset.name;
    }
  }

  incementLibPage();
  renderLibContent(localStorageApi.getMovies(key), contentCardsRef);
}
