elemForm = document.querySelector('.form');
elemPassword = document.querySelector('#pwd');
elemPasswordConfirm = document.querySelector('#pwd-confirm');

const handleInput = event => {
  const element = event.target;
  if (!element.required && !element.value) element.classList.add('empty');
  if ([elemPassword, elemPasswordConfirm].includes(element)) {
    if (elemPassword.value !== elemPasswordConfirm.value) {
      elemPasswordConfirm.classList.add('invalid');
    } else elemPasswordConfirm.classList.remove('invalid');
  }
}

const handleFocusOut = event => {
  const element = event.target;
  if (element.required || element.value) element.classList.remove('empty');
}

elemForm.addEventListener('input', handleInput);
elemForm.addEventListener('focusout', handleFocusOut);