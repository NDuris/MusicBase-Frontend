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
            active_since: item.active_since,
            genres: item.genres, // Convert genres array to a comma-separated string
            labels: item.labels, // Convert labels array to a comma-separated string
            website: item.website,
            image: item.image,
            short_description: item.short_description,
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
                <p>${artist.active_since}</p>
                <p>${artist.genres}</p>
                <p>${artist.labels}</p>
                <p>${artist.website}</p>
                <p>${artist.short_description}</p>
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

    const name = event.target.name.value;
    const birthdate = event.target.birthdate.value;
    const active_since = event.target.active_since.value;
    const genres = event.target.genres.value;
    const labels = event.target.labels.value;
    const website = event.target.website.value;
    const short_description = event.target.short_description.value;
    const image = event.target.image.value;

    const newArtist = {name, birthdate, active_since, genres, labels, website, short_description, image };
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
        form.active_since.value = artist.active_since;
        form.genres.value = artist.genres; 
        form.labels.value = artist.labels; 
        form.website.value = artist.website;
        form.short_description.value = artist.short_description;
        form.image.value = artist.image;

        form.scrollIntoView({ behavior: "smooth" });
}


async function updateArtist(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const birthdate = event.target.birthdate.value;
    const active_since = event.target.active_since.value;
    const genres = event.target.genres.value;
    const labels = event.target.labels.value;
    const website = event.target.website.value;
    const short_description = event.target.short_description.value;
    const image = event.target.image.value;
    // update artist
    const artistToUpdate = { name, birthdate, active_since, genres, labels, website, short_description, image };
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
