const tbody = document.querySelector('#tbody')
const saveButton = document.querySelector('#saveButton')

const idInput = document.querySelector('#id')
const nameInput = document.querySelector('#name')
const cityInput = document.querySelector('#city')
const salaryInput = document.querySelector('#salary')


const url = 'http://localhost:8000/api/employees'



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
                <button class="btn btn-secondary" onclick="updateEmployee(${emp})">Szerkesztés</button>
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

    //JavaScript objektum
    const emp = {
        name: nameInput.value,
        city: cityInput.value,
        salary: salaryInput.value
    }

    console.log(emp.name, emp.city, emp.salary)
    console.log(emp)
    addEmployee(emp)

    clearFields()
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

function updateEmployee(emp) {
    console.log("emp: " + emp)
}