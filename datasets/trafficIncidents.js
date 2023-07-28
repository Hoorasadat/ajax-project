fetch('https://data.calgary.ca/resource/35ra-9556.json')
    .then(response => response.json())
    .then(data => {
        // Save the data in a variable to use later for filtering
        const incidentsData = data;
        // Populate the incidents table with all data initially
        populateIncidents(incidentsData);

        // Add event listeners to input fields for filtering
        document.getElementById('search-incident-info').addEventListener('keyup', () => filterIncidents(incidentsData));
        document.getElementById('search-description').addEventListener('keyup', () => filterIncidents(incidentsData));
        document.getElementById('search-id').addEventListener('keyup', () => filterIncidents(incidentsData));
    })
    .catch(error => console.error('Error loading search form:', error));



function filterIncidents(data) {
    var searchIncidentInfo = document.getElementById('search-incident-info').value.toLowerCase();
    var searchDescription = document.getElementById('search-description').value.toLowerCase();
    var searchId = document.getElementById('search-id').value.toLowerCase();

    var filteredData = data.filter(function (incident) {
        return (
            incident.incident_info.toLowerCase().includes(searchIncidentInfo) &&
            incident.description.toLowerCase().includes(searchDescription) &&
            incident.id.toLowerCase().includes(searchId)
        );
    });

    // Clear the existing table and populate with the filtered data
    var container = document.getElementById('incident-container');
    container.innerHTML = '';
    populateIncidents(filteredData);
}


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


function populateIncidents(data) {
    var container = document.getElementById('incident-container');
    data.forEach(function (incident) {
        var incidentElement = createIncidentElement(incident);
        container.appendChild(incidentElement);
    });
}
