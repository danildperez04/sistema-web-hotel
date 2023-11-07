document.addEventListener('DOMContentLoaded', ()=>{
    startApp();
});

function startApp(){
    const submit = document.querySelector('.sub');
    submit.addEventListener('click', (e)=>{
        e.preventDefault();

        if(validateFields()){
            const userData = {
                firstName: document.querySelector('#name').value,
                lastName: document.querySelector('#lastName').value,
                username: document.querySelector('#email').value,
                password: document.querySelector('#pass').value
            };


            fetch('http://localhost:3000/api/users/', {
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

function validateFields(){
    const message = 'Este campo es obligatorio';

    const array = document.querySelectorAll("input");

    for (const {value, id} of array) {
        if(!value){
            showError(message, id);
            return false;
        }
    }

    const pass = document.querySelector('#pass').value;
    const confirm = document.querySelector('#confirm').value;
    
    if(pass !== confirm){
        showError('Las contraseñas no coinciden', 'confirm');
        return false;
    } 

return true;

}


function showError(text, field){
    if(document.querySelector('.error') !== null){
       document.querySelector('.error').remove();
    }

        const error = document.createElement('div');
        const info = document.createElement('p');
        info.textContent = text;
        error.appendChild(info);
        error.classList.add('error')
        const add = document.querySelector('.'+field);
        add.appendChild(error);
}