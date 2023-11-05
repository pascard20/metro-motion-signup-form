elemForm = document.querySelector('.form');

const handleInput = event => {
  const element = event.target;
  if (!element.required && !element.value) element.classList.add('empty');
}

const handleFocusOut = event => {
  const element = event.target;
  if (element.required || element.value) element.classList.remove('empty');
}

elemForm.addEventListener('input', handleInput);
elemForm.addEventListener('focusout', handleFocusOut);