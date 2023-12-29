import {displayModal} from '../components/modal.js';
import { authenticate } from '../services/login.js';

document.addEventListener('DOMContentLoaded', () => {
  login();
});

function login() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = Object.fromEntries(new FormData(e.target));

    const response = await authenticate(user);

    if(response.statusCode === 400){
     return displayModal('Por favor revise su usuario y contraseña', false);
    } 

    const token = response;
    localStorage.setItem('token', token['token']);
    window.location.replace('/', '/src/pages/login.html');

  });
}
