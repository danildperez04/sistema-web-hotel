import { createUser } from "../services/signup.js";
import {displayModal} from "../components/modal.js";
import {displayMessage} from "../components/message.js";
import { authenticate } from '../services/login.js';

document.addEventListener('DOMContentLoaded', () => {
  startApp();
});

function startApp() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', async(e) => {
    e.preventDefault();


    if (validateFields()) {
      const userData = Object.fromEntries(new FormData(e.target));
      const response = await createUser(userData);

      if(!response.ok){
      return displayModal('No se puedo registrar el usuario', false);
      } 
    
      const responseToken = await authenticate(userData);
      displayMessage('Usuario autenticado');
      document.body.style.cursor = 'progress';

      setTimeout(() => {
        const token = responseToken;
        localStorage.setItem('token', token['token']);
        window.location.replace('/', '/src/pages/signup.html');
      }, 1000);

    }

  });
}

function validateFields() {

  const pass = document.querySelector('#pass').value;
  const confirm = document.querySelector('#confirm').value;

  if (pass !== confirm) {
    showError('Las contraseñas no coinciden', 'confirm');
    return false;
  }

  return true;

}


function showError(text, field) {
  if (document.querySelector('.error') !== null) {
    document.querySelector('.error').remove();
  }

  const error = document.createElement('div');
  const info = document.createElement('p');
  info.textContent = text;
  error.appendChild(info);
  error.classList.add('error')
  const add = document.querySelector('.' + field);
  add.appendChild(error);
}