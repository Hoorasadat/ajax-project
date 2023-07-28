fetch('https://data.calgary.ca/resource/k7p9-kppz.json')
    .then(response => response.json())
    .then(data => {
        const cameraData = data;
        populateCameras(cameraData);

        document.getElementById('search-Camera-url').addEventListener('keyup', () => filterCameras(cameraData));
        document.getElementById('search-quadrant').addEventListener('keyup', () => filterCameras(cameraData));
        document.getElementById('search-camera-location').addEventListener('keyup', () => filterCameras(cameraData));
    })
    .catch(error => console.error('Error loading search form:', error));



function filterCameras(data) {
    var searchCameraURL = document.getElementById('search-Camera-url').value.toLowerCase();
    var searchQuadrant = document.getElementById('search-quadrant').value.toLowerCase();
    var searchCameraLocation = document.getElementById('search-camera-location').value.toLowerCase();

    var filteredData = data.filter(function (camera) {
        return (
            camera.camera_url.url.toLowerCase().includes(searchCameraURL) &&
            camera.quadrant.toLowerCase().includes(searchQuadrant) &&
            camera.camera_location.toLowerCase().includes(searchCameraLocation)
        );
    });

    // Clear the existing table and populate with the filtered data
    var container = document.getElementById('camera-container');
    container.innerHTML = '';
    populateCameras(filteredData);
}


function createCameraRow(camera) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>
        <a href="${camera.camera_url.url}" target="_blank">${camera.camera_url.description}</a>
        </td>
        <td>${camera.quadrant}</td>
        <td>${camera.camera_location}</td>
        <td>[${camera.point.coordinates.join(', ')}]</td>
        <td>${camera[':@computed_region_4a3i_ccfj']}</td>
        <td>${camera[':@computed_region_kxmf_bzkv']}</td>
        <td>${camera[':@computed_region_p8tp_5dkv']}</td>
        <td>${camera[':@computed_region_4b54_tmc4']}</td>
    `;
    return row;
    }

function populateCameras(data) {
    var container = document.getElementById('camera-container');
    data.forEach(function (camera) {
        var cameraRow = createCameraRow(camera);
        container.appendChild(cameraRow);
    });
}
