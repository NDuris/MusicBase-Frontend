// ============ GLOBAL VARIABLES ============ //
const baseEndpoint = "http://localhost:3334";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchType = document.getElementById("searchType");
    const searchButton = document.getElementById("searchButton");
    const resultsTable = document.getElementById("resultsTable");
    const resultsBody = document.getElementById("resultsBody");

    searchButton.addEventListener("click", async () => {
        const searchTerm = searchInput.value;
        const selectedSearchType = searchType.value;

        // Define the endpoint for searching
        const endpoint = `${baseEndpoint}/search?term=${encodeURIComponent(searchTerm)}&type=${selectedSearchType}`;

        try {
            // Send a GET request to the server using the constructed endpoint
            const response = await fetch(endpoint);

            if (response.ok) {
                const searchResults = await response.json();
                // Process and display searchResults in your table
                displaySearchResults(searchResults, selectedSearchType);
            } else {
                console.error("Failed to fetch data from the server.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});

function displaySearchResults(results, selectedSearchType) {
    const tableHeaders = getTableHeaders(selectedSearchType);

    // Clear previous search results
    resultsBody.innerHTML = "";
    resultsTable.querySelector("thead").innerHTML = tableHeaders;

    // Populate the table with search results
    results.forEach((result) => {
        let rowHTML = "";

        switch (selectedSearchType) {
            case "artist":
                rowHTML = `<td>${result.name}</td><td>${result.labels.replace(/[\[\]'"]+/g, '')}</td><td>${result.genres.replace(/[\[\]'"]+/g, '')}</td>`;
                break;
            case "track":
                rowHTML = `<td>${result.track_name}</td><td>${result.name}</td><td>${result.album_name}</td>`;
                break;
            case "album":
                rowHTML = `<td>${result.album_name}</td><td>${result.name}</td><td>${result.num_songs}</td>`;
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
