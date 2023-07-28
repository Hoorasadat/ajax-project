const data = fetch('https://data.calgary.ca/resource/c2es-76ed.json')
    .then(response => response.json())
    .then(data => populatePermits(data))
    .catch(error => console.error('Error loading search form:', error));


function createPermitRow(permit) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${permit.permitnum}</td>
        <td>${permit.statuscurrent}</td>
        <td>${permit.applieddate}</td>
        <td>${permit.issueddate}</td>
        <td>${permit.permittype}</td>
        <td>${permit.permittypemapped}</td>
        <td>${permit.permitclass}</td>
        <td>${permit.permitclassgroup}</td>
        <td>${permit.permitclassmapped}</td>
        <td>${permit.workclass}</td>
        <td>${permit.workclassgroup}</td>
        <td>${permit.workclassmapped}</td>
        <td>${permit.description}</td>
        <td>${permit.applicantname}</td>
    `;
    return row;
}

// Function to add all incident elements to the container
function populatePermits(data) {
    var container = document.getElementById('permit-container');
    data.forEach(function (permit) {
      var permitRow = createPermitRow(permit);
      container.appendChild(permitRow);
    });
  }
