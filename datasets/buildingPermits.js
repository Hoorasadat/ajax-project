fetch('https://data.calgary.ca/resource/c2es-76ed.json')
    .then(response => response.json())
    .then(data => {
        const permitData = data;
        populatePermits(permitData);

        document.getElementById('search-permit-number').addEventListener('keyup', () => filterPermits(permitData));
        document.getElementById('search-status').addEventListener('keyup', () => filterPermits(permitData));
        document.getElementById('search-permit-type').addEventListener('keyup', () => filterPermits(permitData));
    })
    .catch(error => console.error('Error loading search form:', error));



function filterPermits(data) {
    var searchPermitNumber = document.getElementById('search-permit-number').value.toLowerCase();
    var searchStatus = document.getElementById('search-status').value.toLowerCase();
    var searchPermitType = document.getElementById('search-permit-type').value.toLowerCase();

    var filteredData = data.filter(function (permit) {
        return (
            permit.permitnum.toLowerCase().includes(searchPermitNumber) &&
            permit.statuscurrent.toLowerCase().includes(searchStatus) &&
            permit.permittype.toLowerCase().includes(searchPermitType)
        );
    });

    var container = document.getElementById('permit-container');
    container.innerHTML = '';
    populatePermits(filteredData);
}


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

function populatePermits(data) {
    var container = document.getElementById('permit-container');
    data.forEach(function (permit) {
      var permitRow = createPermitRow(permit);
      container.appendChild(permitRow);
    });
  }
