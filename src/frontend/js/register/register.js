const form = document.querySelector('form');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeatPass');
const errorMessage = document.querySelector('.error-message');

function validatePasswords() {
    const isValid = password.value === repeatPassword.value;

    repeatPassword.classList.toggle('error', !isValid);
    errorMessage.classList.toggle('off', isValid);

    return isValid;
}

password.addEventListener('input', validatePasswords);
repeatPassword.addEventListener('input', validatePasswords);

form.addEventListener('submit', (e) => {
    if (!validatePasswords()) {
        e.preventDefault();
        repeatPassword.focus();
    }
});