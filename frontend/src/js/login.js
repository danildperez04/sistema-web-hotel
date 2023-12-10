document.addEventListener('DOMContentLoaded', () => {
  login();
});

function login() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = Object.fromEntries(new FormData(e.target));

    const response = await fetch('http://localhost:3000/auth/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const token = await response.json();

    localStorage.setItem('token', token['token']);

  });
}
