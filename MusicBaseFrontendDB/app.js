document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsBody = document.getElementById("resultsBody");

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim(); // Get the search term

        // Perform a search here using AJAX/fetch and populate the table with results
        // For this example, we'll use dummy data
        const dummyData = [
            { name: "Song 1", artist: "Artist 1", album: "Album 1", genre: "Pop" },
            { name: "Song 2", artist: "Artist 2", album: "Album 2", genre: "Rock" },
            { name: "Song 3", artist: "Artist 3", album: "Album 3", genre: "Hip-Hop" }
        ];

        // Clear previous results
        resultsBody.innerHTML = "";

        // Loop through the dummy data and create table rows
        dummyData.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.artist}</td>
                <td>${item.album}</td>
                <td>${item.genre}</td>
            `;
            resultsBody.appendChild(row);
        });
    });
});
