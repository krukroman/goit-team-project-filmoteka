export default async function getGenres(service) {
  try {
    const genresObj = await service.fetchGenres({});
    localStorage.setItem("genres", JSON.stringify(genresObj.genres));
  } catch (error) {}
}
