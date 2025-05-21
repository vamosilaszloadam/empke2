const tbody = document.querySelector('#tbody')
const saveButton = document.querySelector('#saveButton')
const addButton = document.querySelector('#addButton')

const idInput = document.querySelector('#id')
const nameInput = document.querySelector('#name')
const cityInput = document.querySelector('#city')
const salaryInput = document.querySelector('#salary')
const deleteModal = document.querySelector('#deleteModal')

const empModalLabel = document.querySelector('#empModalLabel')

// const doc = {
//     tbody: document.querySelector('#tbody'),
//     saveButton: document.querySelector('#saveButton'),
//     addButton: document.querySelector('#addButton'),
//     idInput: document.querySelector('#id'),
//     nameInput: document.querySelector('#name'),
//     cityInput: document.querySelector('#city'),
//     salaryInput: document.querySelector('#salary'),
//     empModalLabel: document.querySelector('#empModalLabel')
// }

const url = 'http://localhost:8000/api/employees'
var idForDelete = -1;

var addMode = true;

// const state = {
//     url: 'http://localhost:8000/api/employees',
//     addMode: true
// }

saveButton.addEventListener('click', () => {
    console.log(idInput.value)
    console.log(nameInput.value)
    console.log(cityInput.value)
    console.log(salaryInput.value)

    if(addMode) {
        const emp = {
            name: nameInput.value,
            city: cityInput.value,
            salary: salaryInput.value
        }
        addEmployee(emp)
    }else {
        const emp = {
            id: idInput.value,
            name: nameInput.value,
            city: cityInput.value,
            salary: salaryInput.value
        }
        updateEmployee(emp)
    }

    clearFields()
})

addButton.addEventListener('click', () => {
    clearFields()
    addMode = true
    empModalLabel.innerHTML = 'Hozzáadás'
})

function getEmployees() {
    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        console.log(result)
        renderTbody(result.data)
    });
}

function renderTbody(empList) {
    var tbodyContent = '';
    empList.forEach((emp) => {
        var row = `
        <tr class="miniRow">
            <td class="mini miniId">${emp.id}</td>
            <td class="mini miniName">${emp.name}</td>
            <td class="mini miniCity">${emp.city}</td>
            <td class="mini miniSalary">${emp.salary}</td>
            <td class="mini">
                <button class="btn btn-warning me-3 my-1" onclick="askDeleteEmployee(${emp.id})">Törlés</button>
                <button class="btn btn-secondary" onclick="editEmployee()" data-id="${emp.id}" data-name="${emp.name}" data-city="${emp.city}" data-salary="${emp.salary}" data-bs-toggle="modal" data-bs-target="#empModal">Szerkesztés</button>
            </td>
            <!--<td class="mini">
                <button class="btn btn-secondary my-1" onclick="editEmployee()" data-id="${emp.id}" data-name="${emp.name}" data-city="${emp.city}" data-salary="${emp.salary}" data-bs-toggle="modal" data-bs-target="#empModal">Szerkesztés</button>
            </td>-->
        </tr>
        `;
        tbodyContent += row;
        console.log(emp.name)
    })
    tbody.innerHTML = tbodyContent
}

function clearFields() {
    idInput.value = ''
    nameInput.value = ''
    cityInput.value = ''
    salaryInput.value = ''
}

function addEmployee(emp) {
    // console.log(emp)
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(emp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getEmployees()
    })
    .catch(err => console.log(err))
}

function askDeleteEmployee(id) {

    const modal = new bootstrap.Modal(deleteModal);
    modal.show();
    idForDelete = id
}

function deleteEmployee() {
    console.log(idForDelete)
    const delUrl = url + '/' + idForDelete;
    fetch(delUrl, { method: "DELETE"} )
    .then(response => response.json() )
    .then(result => {
        console.log(result)
        getEmployees()
    });
    console.log("id: " + id)
}

function editEmployee() {
    addMode = false;

    empModalLabel.innerHTML = 'Szerkesztés'
    const emp = {
        id: this.event.target.getAttribute("data-id"),
        name: this.event.target.getAttribute("data-name"),
        city: this.event.target.getAttribute("data-city"),
        salary: this.event.target.getAttribute("data-salary")
    }

    idInput.value = emp.id;
    nameInput.value = emp.name;
    cityInput.value = emp.city;
    salaryInput.value = emp.salary;

    console.log(emp)
}

function updateEmployee(emp) {
    const extUrl = url + '/' + emp.id;

    fetch(extUrl, {
        method: 'PUT', 
        body: JSON.stringify(emp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getEmployees()
    })
    .catch(err => console.log(err))

    addMode = true;
    empModalLabel.innerHTML = 'Hozzáadás'
}

getEmployees()