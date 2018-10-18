// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

// function that gets a chuck norris joke
function getJoke() {
    fetch('https://api.icndb.com/jokes/random')
        .then(convertToJson)
        // .then(extractID)
        .then(extractJokeText)
        .then(drawJoke)
    // .then( j => {
    // //   document.body.textContent = j.value.joke
    //     drawJoke(j.value.joke);
    // } )    
}

function convertToJson(r) {
    return r.json();
}

//Make an array of the characteristics and return it
function extractJokeText(jokeObj) {
    let array = [jokeObj.value.id, jokeObj.value.joke];
    return array;
}


// function that draws joke to DOM
function drawJoke(array) {
    //Make a new list
    const newJoke = document.createElement('li');
    //Create paragraphs to attach to the new 'li'
    array.forEach((function(joke){
        const newP = document.createElement('p');
        //Make sure the quotes are stringified
        newP.textContent = JSON.stringify(joke); 
        newJoke.appendChild(newP);
    }));
    // not returning, just appending
    outputElement.appendChild(newJoke);
}


// main function that attaches button listener
function main() {
    triggerElement.addEventListener('click', getJoke);
}
main();