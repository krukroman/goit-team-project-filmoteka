import pageInit from './page-init';
import ApiService from '../api-service/api-service';
import LoadMoreBtn from './load-more-btn';
import { contentCardsRef, contentBtnListRef } from '../header/header.main';

let badSearchMsg = document.querySelector('.header__warning');
let body = document.querySelector('BODY');
const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.js-load-more',
  hidden: true,
});
let allWeFoundWarning = document.querySelector('.header__thats-all-msg');

export default function createContentMarkup(element, collection, template) {
  loadMoreBtn.enable();

  if (collection?.total_results === 0) {
    badSearchMsg.removeAttribute('style', 'display: none');
    body.addEventListener('click', removeWarning);
    pageInit(apiService, contentCardsRef);
    contentBtnListRef.removeAttribute('style', 'display: none');
    loadMoreBtn.hide();
  } else if (collection?.total_results < 20 || collection?.page === collection?.total_pages) {
    allWeFoundWarning.removeAttribute('style', 'display: none');
    body.addEventListener('click', removeWarning);
    loadMoreBtn.disable();
  }

  element.insertAdjacentHTML('beforeend', template);
}

function removeWarning() {
  allWeFoundWarning.setAttribute('style', 'display: none');
  badSearchMsg.setAttribute('style', 'display: none');
  body.removeEventListener('click', removeWarning);
}
