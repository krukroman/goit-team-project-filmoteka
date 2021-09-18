//require element reference to iterate, selector to set state
function setBtnState(elemetRef, selector) {
  for (const buttonEl of elemetRef.children) {
    if (buttonEl.classList.contains(selector) && buttonEl.disabled === true) {
      buttonEl.classList.remove(selector);
      buttonEl.disabled = false;
    } else {
      buttonEl.classList.add(selector);
      buttonEl.disabled = true;
    }
  }
}
// require elemeelement reference to iterate, defaultKey & defautlValue to compare, selector to set default state
function setBtnDefaultState(elementRef, defaultKey, defautlValue, selector) {
  for (const buttonEl of elementRef.children) {
    if (buttonEl.getAttribute(defaultKey) === defautlValue) {
      buttonEl.classList.add(selector);
      buttonEl.disabled = true;
    } else {
      buttonEl.classList.remove(selector);
      buttonEl.disabled = false;
    }
  }
}
export { setBtnState, setBtnDefaultState };
