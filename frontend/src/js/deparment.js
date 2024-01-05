import { loadDepartment } from "../services/departments.js";


export async function loadDepartments() {
    return await loadDepartment();
}


export function loadMunicipality(cmbDepartments, data) {
    const cmbMunicipalities = document.querySelector('#option-municipality');
    cmbMunicipalities.innerHTML = '';
    const id = cmbDepartments.options[cmbDepartments.selectedIndex].value;
    const selected = data.find(department => department.id == parseInt(id));

    selected.municipalities.forEach(municipality => {
        const option = document.createElement('option');
        option.textContent = municipality['name'];
        option.value = municipality['id'];
        cmbMunicipalities.appendChild(option);
    });
}


export async function showDepartments() {

    const data = await loadDepartments();

    const cmbDepartments = document.querySelector('#option-department');
    let allMunicipalities = [];

    data.forEach(department => {
        const option = document.createElement('option');
        option.textContent = department['name'];
        option.value = department['id'];
        cmbDepartments.appendChild(option);
        allMunicipalities = allMunicipalities.concat(department.municipalities);
    });

    loadMunicipality(cmbDepartments, data);

    cmbDepartments.addEventListener('change', () => {
        loadMunicipality(cmbDepartments, data);
    });
}