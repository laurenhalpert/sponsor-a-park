//Event Listeners
const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit)




//Event Handlers
function handleSubmit(event) {
    event.preventDefault();
    let parkObj = {
        name: event.target.name.value,
        imageURL: event.target.imageURL.value,
        description: event.target.description.value,
        donations: 0,
    };

    renderPark(parkObj);
    sponsorPark(parkObj);
}







//Render Park
function renderPark(park) {
    const card = document.createElement("li");
    card.className ="cards";
    card.innerHTML = `
    <img src="${park.imageURL}>
    <div class="content">
        <h4>${park.name}</h4>
        <p>
            $<span class="donation_count">${park.donations}</span> Donated
        </p>
        <p>${park.description}</p>
    </div>
    <div class="buttons">
        <button id = "donate"> Donate </button>
        <button id = "abandon"> Abandon </button>
    </div>
    `
    document.querySelector("#park_list").appendChild(card);
}








//Fetch Functions
function getParks() {
    fetch("http://localhost:3000/parks")
    .then(response => response.json())
    .then(parkData => parkData.forEach(park => renderPark(park)))
}

function sponsorPark(parkObj) {
    fetch(`http://localhost:3000/parks/${park.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parkObj)
    })
    .then(response => response.json())
    .then(park => console.log(park))
}



//other
function initialize() {
    getParks();
}
initialize();
