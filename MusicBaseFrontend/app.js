// ============ GLOBAL VARIABELS ============ //
const endpoint = "http://localhost:3333";
let selectedArtist;

// ============ INIT APP ============ //

window.addEventListener("load", initApp);

function initApp() {
    updateAristsGrid(); // to initialize the grid view with users
    // event listeners
    document.querySelector("#form-create").addEventListener("submit", createArtist);
    document.querySelector("#form-update").addEventListener("submit", updateArtist);
}

// ============ READ ============ //

async function updateAristsGrid() {
    const artists = await readArtists();
    displayArtists(artists);
}

async function readArtists() {
        const response = await fetch(`${endpoint}/artists`);
        const data = await response.json();

        const artists = data.map(item => ({
            id: item.id,
            name: item.name,
            birthdate: item.birthdate,
            activeSince: item.activeSince,
            genres: item.genres, // Convert genres array to a comma-separated string
            labels: item.labels, // Convert labels array to a comma-separated string
            website: item.website,
            image: item.image,
            shortDescription: item.shortDescription,
            isFavorite: item.isFavorite
        }));

        return artists;
}


// Create HTML and display all artists from given list
function displayArtists(list) {
    // reset <section id="artists-grid" class="grid-container">...</section>
    document.querySelector("#artists-grid").innerHTML = "";
    //loop through all artists and create an article with content for each
    for (const artist of list) {
        document.querySelector("#artists-grid").insertAdjacentHTML(
            "beforeend",
            /*html*/ `
            <article>
                <img src="${artist.image}">
                <h2>${artist.name}</h2>
                <p>${artist.birthdate}</p>
                <p>${artist.activeSince}</p>
                <p>${artist.genres}</p>
                <p>${artist.labels}</p>
                <p>${artist.website}</p>
                <p>${artist.shortDescription}</p>
                 <div class="btns">
                    <button class="btn-update-artist">Update</button>
                    <button class="btn-delete-artist">Delete</button>
                </div>
            </article>
        `
        );
        document
            .querySelector("#artists-grid article:last-child .btn-delete-artist")
            .addEventListener("click", () => deleteArtist(artist.id));
        document
            .querySelector("#artists-grid article:last-child .btn-update-artist")
            .addEventListener("click", () => selectArtist(artist));
    }
}



// ============ CREATE ============ //
async function createArtist(event) {
    event.preventDefault();

    const id = readArtists().length+1;
    const name = event.target.name.value;
    const birthdate = event.target.birthdate.value;
    const activeSince = event.target.activeSince.value;
    const genres = event.target.genres.value;
    const labels = event.target.labels.value;
    const website = event.target.website.value;
    const shortDescription = event.target.shortDescription.value;
    const image = event.target.image.value;
    // create a new user
    const newArtist = {id, name, birthdate, activeSince, genres, labels, website, shortDescription, image };
    const artistAsJson = JSON.stringify(newArtist);
    const response = await fetch(`${endpoint}/artists`, {
        method: "POST",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        // if success, update the users grid
        updateAristsGrid();
        // and scroll to top
        scrollToTop();
    }
}

// ============ UPDATE ============ //
function selectArtist(artist) {
    // Set global variable
    selectedArtist = artist;
    const form = document.querySelector("#form-update");

        form.name.value = artist.name;
        form.birthdate.value = artist.birthdate;
        form.activeSince.value = artist.activeSince;
        form.genres.value = artist.genres; 
        form.labels.value = artist.labels; 
        form.website.value = artist.website;
        form.shortDescription.value = artist.shortDescription;
        form.image.value = artist.image;

        form.scrollIntoView({ behavior: "smooth" });
}


async function updateArtist(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const birthdate = event.target.birthdate.value;
    const activeSince = event.target.activeSince.value;
    const genres = event.target.genres.value;
    const labels = event.target.labels.value;
    const website = event.target.website.value;
    const shortDescription = event.target.shortDescription.value;
    const image = event.target.image.value;
    // update artist
    const artistToUpdate = { name, birthdate, activeSince, genres, labels, website, shortDescription, image };
    console.log(artistToUpdate);
    const artistAsJson = JSON.stringify(artistToUpdate);
    const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
        method: "PUT",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        // if success, update the users grid
        updateAristsGrid();
        // and scroll to top
        scrollToTop();
    }
}

// ================== DELETE ============ //
async function deleteArtist(id) {
    const response = await fetch(`${endpoint}/artists/${id}.json`, {
        method: "DELETE"
    });
    if (response.ok) {
        // if success, update the users grid
        updateAristsGrid();
    }
}

// ================== Events ============ //

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
