const elemForm = document.querySelector('.form');
const elemPassword = document.querySelector('#pwd');
const elemPasswordConfirm = document.querySelector('#pwd-confirm');
const elemPasswordConstraints = document.querySelector('.pwd-constraints');
const elemButton = document.querySelector('.main__below-submit');
const elemRoot = document.documentElement;

const elemPwdItemLength = document.querySelector('.pwd-constraints__item.length');
const elemPwdItemNumber = document.querySelector('.pwd-constraints__item.number');
const elemPwdItemUpper = document.querySelector('.pwd-constraints__item.upper');
const elemPwdItemLower = document.querySelector('.pwd-constraints__item.lower');

const passwordRequirements = [
  elemPwdItemLength,
  elemPwdItemNumber,
  elemPwdItemUpper,
  elemPwdItemLower,
];

const handleInput = event => {
  const element = event.target;
  if (!element.required && !element.value) element.classList.add('empty');

  if ([elemPassword, elemPasswordConfirm].includes(element)) {
    if (element === elemPassword) {
      const pwd = element.value;
      if (pwd.length >= 8) elemPwdItemLength.classList.add('valid');
      else elemPwdItemLength.classList.remove('valid');

      if (pwd.match(/[^\p{L}]/gu)) elemPwdItemNumber.classList.add('valid');
      else elemPwdItemNumber.classList.remove('valid');

      if (pwd.match(/\p{Lu}/gu)) elemPwdItemUpper.classList.add('valid');
      else elemPwdItemUpper.classList.remove('valid');

      if (pwd.match(/\p{Ll}/gu)) elemPwdItemLower.classList.add('valid');
      else elemPwdItemLower.classList.remove('valid');


      let valid = true;
      for (const item of passwordRequirements) {
        if (!item.className.includes('valid')) {
          valid = false;
          element.setCustomValidity('Invalid password');
          break;
        };
      }
      if (valid) {
        element.classList.remove('empty');
        element.setCustomValidity('');
      }
    }
    if (!elemPassword.validity.valid) {
      elemPasswordConfirm.setCustomValidity(`Invalid password`);
    } else if (elemPassword.value !== elemPasswordConfirm.value) {
      elemPasswordConfirm.setCustomValidity(`Passwords don't match`);
    } else {
      elemPasswordConfirm.setCustomValidity('');
      elemPasswordConfirm.classList.remove('empty');
    }
  }
}

const handleFocusOut = event => {
  const element = event.target;
  if (element.required || element.value) element.classList.remove('empty');
  if ([elemPassword, elemPasswordConfirm].includes(element)
    && elemPassword.validity.valid
    && elemPasswordConfirm.validity.valid) {

    const delay = getComputedStyle(elemRoot).getPropertyValue('--pwd-constraints-delay');
    elemRoot.style.setProperty('--pwd-constraints-before-delay', delay);
    elemRoot.style.setProperty('--pwd-constraints-list-delay', '0');

    const timeout = parseInt(getComputedStyle(elemRoot).getPropertyValue('--pwd-constraints-transition'));
    setTimeout(() => {
      elemRoot.style.setProperty('--pwd-constraints-before-delay', '0');
      elemRoot.style.setProperty('--pwd-constraints-list-delay', delay);
    }, timeout);

    elemPasswordConstraints.classList.remove('enabled');

  }
}

const handleFocusIn = event => {
  const element = event.target;
  if ([elemPassword, elemPasswordConfirm].includes(element)) {
    elemPasswordConstraints.classList.add('enabled');
  }
}

const handleButtonClick = () => {
  emptyInputs = elemForm.querySelectorAll('.empty');
  [...emptyInputs].forEach(item => item.classList.remove('empty'));
}

elemForm.addEventListener('focusin', handleFocusIn);
elemForm.addEventListener('input', handleInput);
elemForm.addEventListener('focusout', handleFocusOut);
elemButton.addEventListener('click', handleButtonClick);