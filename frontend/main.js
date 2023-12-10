document.addEventListener('DOMContentLoaded', () => {
  displayModal();
});

function displayModal() {

  document.querySelector('#reports')
    .addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.classList.add('modal-create-room')
      modal.innerHTML = `
      <div class="modal-content">
      <img class ="btn-x" src="./src/img/cerrar.png">
        <h1>Crear Reportes</h1>

        <form class="form">
            <label>Ingrese la cantidad de reportes que desea generar</label>
            <input type="number" placeholder="Cantidad de reportes">
            <label for="input-date-report">Seleccione la fecha del reporte</label>
            <input type="date" id="input-date-report">
        <input type="submit" value="Generar Reporte" class="btn-create-room btn-create">
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
    });


}
