import { getToken } from "./token.js";

const token = getToken();

export function displayModal(message, success=true) {
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
      window.location.reload();
    });

  }, 0);

  document.body.appendChild(modal);
}

export function modalForm(title, id) {
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


    if(id){
      fetch(`http://localhost:3000/api/services/${id}`, {
        headers: {'authorization': 'bearer ' + token}
      })
      .then(response => response.json())
      .then(service => {
        document.querySelector('#input-service-name').value = service.name;
        document.querySelector('#input-service-price').value = service.price;
        document.querySelector('#input-service-details').value = service.details;
        document.querySelector('#btn-create-service').textContent = 'Actualizar';
        
      })
      .catch(err => console.error(err));
      
    }


  document.querySelector('.btn-x')
    .addEventListener('click', () => {
      modal.remove();
    });
}