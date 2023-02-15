//Event Listeners
const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit)




//Event Handlers
function handleSubmit(event) {
    event.preventDefault();

    let inputName = document.querySelector("#park_name");
    let inputURL = document.querySelector("#park_imageURL");
    let textareaDescription= document.querySelector("#park_description");

    let parkObj = {
        name: inputName.value,
        imageURL: inputURL.value,
        description: textareaDescription.value,
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
    <img src="${park.imageURL}" class="photo">
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
    fetch(`http://localhost:3000/parks`, {
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
