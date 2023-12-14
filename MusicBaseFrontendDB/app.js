// ============ GLOBAL VARIABELS ============ //
let endpoint = "http://localhost:3334";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchType = document.getElementById("searchType");
    const searchButton = document.getElementById("searchButton");
    const resultsTable = document.getElementById("resultsTable");
    const resultsBody = document.getElementById("resultsBody");

    searchButton.addEventListener("click", async () => {
        const searchTerm = searchInput.value;
        const selectedSearchType = searchType.value;

        // Define the endpoint based on the selected search type
        const specificEndpoint = `${endpoint}/search?term=${searchTerm}&type=${selectedSearchType}`;

        // Fetch data from the selected endpoint
        fetch(specificEndpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Clear previous search results
                resultsBody.innerHTML = "";
                // Update table headers based on search type
                let tableHeaders = "";
                switch (selectedSearchType) {
                    case "artist":
                        tableHeaders = "<th>Name</th>";
                        break;
                    case "track":
                        tableHeaders = "<th>Track Name</th><th>Artist</th><th>Album(s)</th>";
                        break;
                    case "album":
                        tableHeaders = "<th>Album Name</th><th>Artist(s)</th>";
                        break;
                    default:
                        break;
                }
                resultsTable.querySelector("thead").innerHTML = tableHeaders;

                // Populate the table with search results
                data.forEach((result) => {
                    let rowHTML = "";
                    switch (selectedSearchType) {
                        case "artist":
                            rowHTML = `<td>${result.ArtistName}</td>`;
                            break;
                        case "track":
                            rowHTML = `<td>${result.TrackName}</td><td>${result.ArtistName}</td><td>${result.AlbumName}</td>`;
                            break;
                        case "album":
                            rowHTML = `<td>${result.AlbumName}</td><td>${result.ArtistName}</td>`;
                            break;
                        default:
                            break;
                    }

        const row = document.createElement("tr");
        row.innerHTML = rowHTML;
        resultsBody.appendChild(row);
    });
}

function getTableHeaders(selectedSearchType) {
    switch (selectedSearchType) {
        case "artist":
            return "<th>Name</th><th>Label</th><th>Genres</th>";
        case "track":
            return "<th>Track Name</th><th>Artist</th><th>Album(s)</th>";
        case "album":
            return "<th>Album Name</th><th>Artist(s)</th><th>Tracks</th>";
        default:
            return "";
    }
}
