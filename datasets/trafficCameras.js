const data = fetch('https://data.calgary.ca/resource/k7p9-kppz.json')
    .then(response => response.json())
    .then(data => populateCameras(data))
    .catch(error => console.error('Error loading search form:', error));


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

// Function to add all camera rows to the table
function populateCameras(data) {
    var container = document.getElementById('camera-container');
    data.forEach(function (camera) {
        var cameraRow = createCameraRow(camera);
        container.appendChild(cameraRow);
    });
}
