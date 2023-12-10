document.addEventListener('DOMContentLoaded', () => {
  startApp();
});

function startApp() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateFields()) {
      const userData = Object.fromEntries(new FormData(e.target));

      fetch('http://localhost:3000/auth/signup/', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.error(e.message));
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