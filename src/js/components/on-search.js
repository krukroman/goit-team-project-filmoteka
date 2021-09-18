import renderContent from './render-content';

export default async function pageOnSearch(api, elemtRef) {
  renderContent(api.fetchByKeyWord(), elemtRef);
}
