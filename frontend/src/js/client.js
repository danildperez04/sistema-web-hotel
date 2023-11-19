document.addEventListener('DOMContentLoaded', () => {
  startApp();
});

function startApp() {
  const form = document.querySelector('.client-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientData = Object.fromEntries(new FormData(e.target));

    fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok){
          const dialog = document.createElement('div');
          dialog.classList.add('info');
          const message = document.createElement('p');
          message.textContent = 'Se ha agregado el nuevo cliente correctamente';
          dialog.appendChild(message);
          //pending
          document.body.appendChild(dialog);
        }

      });
  });
}