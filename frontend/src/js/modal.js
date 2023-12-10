export function displayModal(message){
    const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.innerHTML = `
                             <div class="modal-content">
                             <img src="../img/check.png">
                              <p>${message}</p>
                              <div>
                                  <button class="close-modal">Aceptar</button>
                            </div>
                            </div>
                            `;

          setTimeout(() => {
            const modalContent = document.querySelector('.modal-content');
            modalContent.classList.add('animation');

            document.querySelector('.close-modal').addEventListener('click', () => {
              modal.remove();
              window.location.reload();
            });

          }, 0);

          document.body.appendChild(modal);
}