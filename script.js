const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// Error
function showError(input, message) {
  let formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.querySelector('small').textContent = message;
}

// Success
function showSuccess(input) {
  let formControl = input.parentElement;
  formControl.classList.add('success');
}

// Reset
function resetStatus(inputArr) {
  inputArr.forEach((input) => {
    let formControl = input.parentElement;
    formControl.classList.remove('success', 'error');
  });
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is empty`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be greater than ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

function checkTerms(input) {
  if (input.checked === false) {
    showError(input, 'Please accept the Terms & Conditions');
  }
}

function checkGender(input) {
  let radios = input.querySelectorAll('input');
  console.log(radios);
  let radioStates = Array.from(radios).map((radio) => {
    return radio.checked;
  });
  if (!radioStates.includes(true)) {
    showError(input, 'Gender not selected');
  }
}

// Event Listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  resetStatus([username, email, password, password2, gender, terms]);

  checkRequired([username, email, password, password2]);

  checkLength(username, 3, 10);
  checkLength(password, 3, 10);

  checkEmail(email);

  checkPasswordsMatch(password, password2);

  checkGender(gender);

  checkTerms(terms);
});
