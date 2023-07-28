fetch('https://data.calgary.ca/resource/848s-4m4z.json')
    .then(response => response.json())
    .then(data => {
        const crimeData = data;
        populateCrimes(crimeData);

        document.getElementById('search-sector').addEventListener('keyup', () => filterCrimes(crimeData));
        document.getElementById('search-category').addEventListener('keyup', () => filterCrimes(crimeData));
        document.getElementById('search-count').addEventListener('keyup', () => filterCrimes(crimeData));
    })
    .catch(error => console.error('Error loading search form:', error));



function filterCrimes(data) {
    var searchSector = document.getElementById('search-sector').value.toLowerCase();
    var searchCategory = document.getElementById('search-category').value.toLowerCase();
    var searchCount = document.getElementById('search-count').value.toLowerCase();

    var filteredData = data.filter(function (crime) {
        return (
            crime.sector.toLowerCase().includes(searchSector) &&
            crime.group_category.toLowerCase().includes(searchCategory) &&
            crime.count.toLowerCase().includes(searchCount)
        );
    });

    var container = document.getElementById('crime-container');
    container.innerHTML = '';
    populateCrimes(filteredData);
}


function createCrimeRow(crime) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${crime.sector}</td>
        <td>${crime.community_name}</td>
        <td>${crime.group_category}</td>
        <td>${crime.category}</td>
        <td>${crime.count}</td>
        <td>${crime.resident_count}</td>
        <td>${crime.date}</td>
        <td>${crime.year}</td>
        <td>${crime.month}</td>
        <td>${crime.id}</td>
        <td>${crime.geocoded_column.latitude}</td>
        <td>${crime.geocoded_column.longitude}</td>
        <td>${crime[':@computed_region_4a3i_ccfj']}</td>
        <td>${crime[':@computed_region_p8tp_5dkv']}</td>
        <td>${crime[':@computed_region_4b54_tmc4']}</td>
        <td>${crime[':@computed_region_kxmf_bzkv']}</td>
    `;
    return row;
}

function populateCrimes(data) {
    var container = document.getElementById('crime-container');
    data.forEach(function (crime) {
      var crimeRow = createCrimeRow(crime);
      container.appendChild(crimeRow);
    });
  }
