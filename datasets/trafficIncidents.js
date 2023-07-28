const data = fetch('https://data.calgary.ca/resource/35ra-9556.json')
    .then(response => response.json())
    .then(data => populateIncidents(data))
    .catch(error => console.error('Error loading search form:', error));


function createIncidentElement(incident) {
    var row = document.createElement('tr');
      row.innerHTML = `
        <td>${incident.incident_info}</td>
        <td>${incident.description}</td>
        <td>${incident.start_dt}</td>
        <td>${incident.modified_dt}</td>
        <td>${incident.quadrant}</td>
        <td>${incident.longitude}</td>
        <td>${incident.latitude}</td>
        <td>${incident.count}</td>
        <td>${incident.id}</td>
        <td>[${incident.point.coordinates.join(', ')}]</td>
      `;
      return row;
}

// Function to add all incident elements to the container
function populateIncidents(data) {
    var container = document.getElementById('incident-container');
    data.forEach(function (incident) {
        var incidentElement = createIncidentElement(incident);
        container.appendChild(incidentElement);
    });
}
