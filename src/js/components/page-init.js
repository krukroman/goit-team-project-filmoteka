import getGenres from './get-genres';
import renderContent from './render-content';
// import initStorage from './modalStorage';
// require apiName and elemnt reference to render content
export default async function pageInit(api, elemtRef) {
  try {
    elemtRef.innerHTML = '';
    await getGenres(api);
    renderContent(api.fetchTrend({}), elemtRef);
    // initStorage();
  } catch (error) {}
}
