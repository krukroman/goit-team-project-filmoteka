import { onCloseButtonClick, onBackdropClick, onEscKeyPress, closeModal } from './on-film-card';
import teamCardTpl from '../../templates/team-page.hbs';

const teamLink = document.querySelector('.team');
const insert = document.querySelector('.insert');

teamLink.addEventListener('click', onTeamClick);

function onTeamClick(event) {
  insert.innerHTML = teamCardTpl({});
  // insert.innerHTML = teamCardTpl({});
  insert.classList.add('is-open');
  document.body.classList.add('modal-open');

  onCloseButtonClick();
  onBackdropClick();
  onEscKeyPress();
}
