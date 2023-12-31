import { getReport } from "./src/services/report";
import { getToken } from "./src/components/token.js";

const token = getToken();

document.addEventListener('DOMContentLoaded', () => {
  if(!token){
    window.location.replace('/src/pages/login.html', '/');
  }
  displayModal();
  closeSession();

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
            <input type="number" id="input-limit-report" name="limit" placeholder="Cantidad de reportes">
            <label for="input-date-report">Seleccione la fecha del reporte</label>
            <input type="date" id="input-date-report" name="date">
        <input type="submit" id="btn-create-report" value="Generar Reporte" class="btn-create-room btn-create">
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

        document.querySelector('.form').addEventListener('submit', async(e) => {
          e.preventDefault();
          
          const reportData = Object.fromEntries( new FormData(e.target) );
          
          const blob = await getReport(reportData);
          console.log(blob);
          const file = window.URL.createObjectURL(blob);
         // window.location.assign(file);
         window.open(file, '_blank');
        });

    });


}

function closeSession(){
  document.querySelector('#btn-close-session')
  .addEventListener('click', ()=>{
    localStorage.removeItem('token');
    window.location.reload();
  });
}