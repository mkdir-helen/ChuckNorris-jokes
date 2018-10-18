

const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');
const prevButton = document.querySelector('[ data-left]');
const nextButton = document.querySelector('[ data-right]');

let cachedJoke = 'Why did Chuck Norris cross the road? THe road knew better than to cross him.';
let jokePromise;
let jokeArray = [];
let index = -1;

// function that gets a programming quote
function getQuote() {
    fetch('https://api.icndb.com/jokes/random')
        .then(r => r.json())
        .then(cacheJoke)
        .then(j => [j.value.id, j.value.joke])
        .catch(showCachedJoke)
        .then(drawQuote)
}

function cacheJoke(jokeObj){
    if(jokeObj.value.joke){
        let individualJokes = [jokeObj.value.id, jokeObj.value.joke];
        jokeArray.push(individualJokes);
        index++;
        localStorage.setItem('joke', JSON.stringify(jokeObj.value.joke));
        
    }
    return jokeObj;
}

function showCachedJoke(err){
    console.log(err);
    return JSON.parse(localStorage.getItem('joke'));
}

function drawQuote(arr) {
    let newLegend = document.createElement('li');
    let id = document.createElement('p')
    id.innerHTML = `The Legend of Chuck Norris #${arr[0]}: `;
    let quote = document.createElement('p')
    quote.innerHTML = arr[1];
    newLegend.append(id, quote);
    outputElement.appendChild(newLegend);
}


//function previous
function getPrev(){
    if(index > 0){
        
        drawQuote(jokeArray[index-1]);
        index--;
    }
        else{
            drawQuote(['i', 'Chuck Norris is watching you.'])
            };

}

function getNext(){
    if(index < jokeArray.length-1){
        drawQuote(jokeArray[index+1]);
        index++;
    }else{
        getQuote();
    }
}


nextButton.addEventListener('click', getNext);
triggerElement.addEventListener('click', getQuote);
prevButton.addEventListener('click',getPrev);
