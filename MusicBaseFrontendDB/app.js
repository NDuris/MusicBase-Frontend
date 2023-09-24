// ============ GLOBAL VARIABELS ============ //
const endpoint = "http://localhost:3333";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchType = document.getElementById("searchType");
    const searchButton = document.getElementById("searchButton");
    const resultsTable = document.getElementById("resultsTable");
    const resultsBody = document.getElementById("resultsBody");

    // Add event listener to the search button
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
        const selectedSearchType = searchType.value;

        // Define the endpoint based on the selected search type
        let endpoint = "";
        switch (selectedSearchType) {
            case "artist":
                endpoint = "/artists";
                break;
            case "track":
                endpoint = "/tracks";
                break;
            case "album":
                endpoint = "/albums";
                break;
            default:
                break;
        }

        // Fetch data from the selected endpoint
        fetch(`${endpoint}?search=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                // Clear previous search results
                resultsBody.innerHTML = "";

                // Update table headers based on search type
                let tableHeaders = "";
                switch (selectedSearchType) {
                    case "artist":
                        tableHeaders = "<th>Name</th><th>Label</th><th>Genres</th>";
                        break;
                    case "track":
                        tableHeaders = "<th>Track Name</th><th>Artist</th><th>Album(s)</th>";
                        break;
                    case "album":
                        tableHeaders = "<th>Album Name</th><th>Artist(s)</th><th>Tracks</th>";
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
                            rowHTML = `<td>${result.name}</td><td>${result.labels}</td><td>${result.genres}</td>`;
                            break;
                        case "track":
                            rowHTML = `<td>${result.track_name}</td><td>${result.artist}</td><td>${result.albums}</td>`;
                            break;
                        case "album":
                            rowHTML = `<td>${result.album_name}</td><td>${result.artists}</td><td>${result.tracks}</td>`;
                            break;
                        default:
                            break;
                    }

                    const row = document.createElement("tr");
                    row.innerHTML = rowHTML;
                    resultsBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });
});
