let onTop = document.querySelector('.goup__btn');

window.addEventListener('scroll', scroll1);
function scroll1() {
  if (window.scrollY > 0) {
    onTop.removeAttribute('style', 'display: none');
  } else {
    onTop.setAttribute('style', 'display: none');
  }
}
