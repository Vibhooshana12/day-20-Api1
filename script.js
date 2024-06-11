//when search button is clicked the charcters of searched house is displayed.
document.querySelector("button").addEventListener("click", result);
var row = document.getElementById("house-list");

async function result() {
    row.innerHTML = "";//to delete the perivously searched house and search for a new house
    try {
        var data = await fetch(`https://hp-api.herokuapp.com/api/characters`);
        var res = await data.json();
        console.log(res);

        var houseInput = document.getElementById("Shows").value.toLowerCase(); //to convert the searched value from the input field to lowercase and give to the console.
        //filtering the array to create a new array of characters from res array by checking if the character has the image, and the entered value is converted to lower case
        var filteredCharacters = res.filter(character => 
            character.house && character.house.toLowerCase() === houseInput && character.image)
        //from the array filteredcharacters we are getting the details of the character that is selected.  
        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                var col = document.createElement("div");
                col.className = "col-md-12 col-sm-12 text-center character";
                col.innerHTML = `
                    <p>${character.name}</p>
                    <div class="character-details"></div`;
                col.addEventListener("click", () => showCharacterDetails(character, col.querySelector('.character-details')));//passing the character and to get details of particular character clicked.
                row.append(col);
            });
        } else {
            var col = document.createElement("div");
            col.className = "col-md-12 col-sm-12 text-white";
            col.innerHTML = "No characters found for this house.";
            row.append(col);
        }//if the input given value  is wrong or not filled it so no characters for this house
    } catch (error) {
        console.log(error);
    }
}
//function to show the character details in card and using block display to display in the same page.
function showCharacterDetails(character, detailsContainer) {
    detailsContainer.innerHTML = `
        <div class="card" style="width: 19rem;">
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text"><b>House:</b> ${character.house}</p>
                <p class="card-text"><b>Alternative Name:</b> ${character.alternate_names.join(', ')}</p>
                <p class="card-text"><b>Gender:</b> ${character.gender}</p>
                <p class="card-text"><b>Eye Color:</b> ${character.eyeColour}</p>
                <p class="card-text"><b>Hair Color:</b> ${character.hairColour}</p>
                <p class="card-text"><b>Hogwarts Student:</b> ${character.hogwartsStudent ? "Yes" : "No"}</p>
                <p class="card-text"><b>Hogwarts Staff:</b> ${character.hogwartsStaff ? "Yes" : "No"}</p>
                <p class="card-text"><b>Wand:</b> ${character.wand ? `Wood:${character.wand.wood}, Core: ${character.wand.core}, Length: ${character.wand.length}` : "N/A"}</p>
                <p class="card-text"><b>Actor:</b> ${character.actor}</p>
            </div>
        </div>`;
    detailsContainer.style.display = detailsContainer.style.display === 'none' ? 'block' : 'none';//to toggle the display of the details container
}





