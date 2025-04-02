const tbody = document.querySelector('#tbody')

//Read
const url = 'http://localhost:8000/api/employees'

//Promise

fetch(url)
.then((response) => {
    return response.json()
})
.then((result) => {
    console.log(result)
    renderTbody(result.data)
});

function renderTbody(empList) {
    var tbodyContent = '';
    empList.forEach((emp) => {
        var row = `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
        </tr>
        `;
        tbodyContent += row;
        console.log(emp.name)
    })
    tbody.innerHTML = tbodyContent
}