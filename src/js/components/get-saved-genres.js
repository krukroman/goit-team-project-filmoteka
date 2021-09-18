export default function getSavedGenres() {
  try {
    let info = JSON.parse(localStorage.getItem("genres"));
    return info;
  } catch (error) {
    console.log(error);
  }
}
