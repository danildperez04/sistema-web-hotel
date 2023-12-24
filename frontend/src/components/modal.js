import { getOneService } from "../services/service.js";
import { getOneRoom } from "../services/room.js";


function displayModal(message, success = true, location = '') {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const urlImage = success ? '../img/check.png' : '../img/advertencia.png';
  modal.innerHTML = `
                             <div class="modal-content">
                             <img src="${urlImage}">
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
      if (location !== '') {
        return window.location = location;
      }

      window.location.reload();
    });

  }, 0);

  document.body.appendChild(modal);
}

async function modalForm(title, id) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
  <div class="modal-content">
  <img class="btn-x" src="../img/cerrar.png">
      <h1>${title}</h1>
      <form class="form form-service">
        <input type="text" name="name" placeholder="Nombre" required id="input-service-name">
        <input type="number" name="price" placeholder="Precio" required id="input-service-price">
        <textarea
          name="details"
          cols="30"
          rows="10"
          placeholder="Detalles"
          required
          id="input-service-details"
        ></textarea>
        <button type="submit" class="btn-create" id="btn-create-service">Crear</button>
      </form>
    </div>
    `;

  setTimeout(() => {
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('animation');

  }, 0);


  document.body.appendChild(modal);

  if (id) {
    const service = await getOneService(id);
    document.querySelector('#input-service-name').value = service.name;
    document.querySelector('#input-service-price').value = service.price;
    document.querySelector('#input-service-details').value = service.details;
    document.querySelector('#btn-create-service').textContent = 'Actualizar';

  }

  document.querySelector('.btn-x')
    .addEventListener('click', () => {
      modal.remove();
    });
}


function confirmationMessage(message, button1 = 'Eliminar', button2 = 'Cancelar') {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
        <div class="modal-content">
          <p>${message}</p>
  
        <div>
          <button class="btnDelete" id="btn-execute-action">${button1}</button>
          <button class="close-modal">${button2}</button>
        </div>
        </div>
        `;

  setTimeout(() => {
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('animation');

    document.querySelector('.close-modal').addEventListener('click', () => {
      modal.remove();
    });

  }, 0);

  document.querySelector('body').appendChild(modal);

}


async function modalFormRoom(title, id){
  const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.classList.add('modal-create-room')
      modal.innerHTML = `
          <div class="modal-content">
          <img class ="btn-x" src="../img/cerrar.png">
            <h1>${title}</h1>

            <form class="form">
                <input type="number" placeholder="Código" name="code" id="input-room-code">
                <input type="number" placeholder="Precio" required name="price" id="input-room-price">
                <textarea placeholder="Descripcion" required name="description" id="input-room-description"></textarea>
            <input type="submit" value="Crear Habitación" class="btn-create" id="btn-create-room">
            </form>
          <div>

          </div>
          </div>
          ;`
      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.add('animation');

      }, 0);

      document.querySelector('body').appendChild(modal);

      document.querySelector('.btn-x')
        .addEventListener('click', () => {
          modal.remove();
        });

        if (id) {
          const room = await getOneRoom(id);
          document.querySelector('#input-room-code').value = room.code;
          document.querySelector('#input-room-price').value = room.price;
          document.querySelector('#input-room-description').value = room.description;
          document.querySelector('#btn-create-room').value = 'Actualizar';
      
        }
}


export { displayModal, modalForm, confirmationMessage, modalFormRoom };