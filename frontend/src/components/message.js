export function displayMessage(message, success = true) {
    const dialog = document.createElement('div');
    success ? dialog.classList.add('message') : dialog.classList.add('alert');
    const text = document.createElement('p');
    text.textContent = message;
    dialog.appendChild(text);
    document.querySelector('.show-message').appendChild(dialog);
  
    setTimeout(() => {
      dialog.remove();
    }, 2000);
  }