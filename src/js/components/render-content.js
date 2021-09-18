import contentCardsTmp from '../../templates/content-grid.hbs';
import createContentMarkup from './create-markup';
import updateGenresInfo from './update-genres-info';
import updateYearinfo from './update-year-info';
import updateRating from './update-rating';
import loaderSpinner from './loader-spinner';
import { onCardClick, insert } from './on-film-card';

// require method(apiname.fetchname({})) and element reference for render
export default async function renderContent(apiMethod, elemtRef) {
  loaderSpinner.loaderShow();
  try {
    const collection = await apiMethod;

    createContentMarkup(elemtRef, collection, contentCardsTmp(collection.results));

    updateGenresInfo();
    updateYearinfo();
    updateRating();
    loaderSpinner.loaderHide();
    const card = document.querySelector('.content__cards');
    card.addEventListener('click', onCardClick);
  } catch (error) {
    console.log(error);
  }
}
