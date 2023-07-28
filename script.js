function handleDatasetChange() {

        const datasetDropdown = document.getElementById('datasetDropdown');

        datasetDropdown.addEventListener('change', function () {
          const selectedDataset = datasetDropdown.value;
          loadSearchForm(selectedDataset);
    });
}


function loadSearchForm(selectedDataset) {

    const url = `datasets/${selectedDataset}.html`;
    if (selectedDataset !== "") {
        window.open(url, "_blank");
    }
}
