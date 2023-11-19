document.addEventListener('DOMContentLoaded', ()=>{

    const id = localStorage.getItem('id');
    
    fetch(`http://localhost:3000/api/clients/${id}`)
    .then(response => response.json())
    .then(data => {
        fullFields(data);
        const form = document.querySelector('.client-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientData = Object.fromEntries(new FormData(e.target));

            fetch(`http://localhost:3000/api/clients/${id}`, {
                method: 'PUT',
                body: JSON.stringify(clientData),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(response =>{
                if(response.ok){
                    const dialog = document.createElement('div');
                    dialog.classList.add('info');
                    const message = document.createElement('p');
                    message.textContent = 'Se ha actualizado el cliente correctamente';
                    dialog.appendChild(message);
                    //pending
                    document.body.appendChild(dialog);

                    setTimeout(() => {
                        window.location.replace('client-list.html', 'update-client.html');
                    }, 1000);
                }
            });
            
           });
    });

    localStorage.clear();
});

function fullFields(obj){
    document.querySelector('#input-client-dni').value = obj.dni;
    document.querySelector('#input-client-name').value = obj.fullName;
    document.querySelector('#input-client-email').value = obj.email;
    document.querySelector('#input-client-phonenumber').value = obj.phoneNumber;
    document.querySelector('#input-client-birthdate').value = obj.birthDate;
    document.querySelector('#input-client-address').value = obj.address;
}