const loader = document.getElementById('loader');
function loaderShow() {
  loader.classList.add('is-active');
}
function loaderHide() {
  setTimeout(() => {
    loader.classList.remove('is-active');
  }, 300);
}

export default { loaderShow, loaderHide };
