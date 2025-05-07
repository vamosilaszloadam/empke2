const tbody = document.querySelector('#tbody')
const saveButton = document.querySelector('#saveButton')
const addButton = document.querySelector('#addButton')

const idInput = document.querySelector('#id')
const nameInput = document.querySelector('#name')
const cityInput = document.querySelector('#city')
const salaryInput = document.querySelector('#salary')

const empModalLabel = document.querySelector('#empModalLabel')

const url = 'http://localhost:8000/api/employees'

var addMode = true;


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

getEmployees()


function renderTbody(empList) {
    var tbodyContent = '';
    empList.forEach((emp) => {
        var row = `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="btn btn-warning" onclick="deleteEmployee(${emp.id})">Törlés</button>
            </td>
            <td>
                <button class="btn btn-secondary" onclick="editEmployee()" data-id="${emp.id}" data-name="${emp.name}" data-city="${emp.city}" data-salary="${emp.salary}" data-bs-toggle="modal" data-bs-target="#empModal">Szerkesztés</button>
            </td>
        </tr>
        `;
        tbodyContent += row;
        console.log(emp.name)
    })
    tbody.innerHTML = tbodyContent
}

/* Create művelet */

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

function deleteEmployee(id) {
    const delUrl = url + '/' + id;
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