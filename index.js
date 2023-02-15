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
        <button id = "donate"> Donate $50 </button>
        <button id = "abandon"> Abandon </button>
    </div>
    `

    card.querySelector("#donate").addEventListener("click", () => {
        park.donations += 50;
        card.querySelector("span").textContent = park.donations;
        updateDonations(park);
    });

    card.querySelector("#abandon").addEventListener(("click"), () => {
        card.remove();
        deleteCard(park);
    })
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

function updateDonations(parkObj) {
    fetch(`http://localhost:3000/parks/${parkObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parkObj)
        })
    .then(response => response.json())
    .then(park => {
        park.donations += 50;
        console.log(park);
    })
}

function deleteCard(parkObj) {
    fetch (`http://localhost:3000/parks/${parkObj.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(park => console.log(park));
    
}


//other
function initialize() {
    getParks();
}
initialize();
