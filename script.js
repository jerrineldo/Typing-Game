//creating page load listener
window.onload = pageReady;

//creating page load function
function pageReady(){

//creating variables to hold on HTML Document Objects

//api URL to retrieve random quotes
var QUOTE_API_URL = 'https://api.quotable.io/random'; 
var quoteDisplayElement = document.getElementById("quoteDisplay");
var quoteInputElement = document.getElementById("quoteInput");
var timerElement = document.getElementById("timer");
var strtBtn = document.getElementById("startButton");
var clockTimer;

//Listener Event which is triggered everytime there is a change in the input field.
quoteInputElement.addEventListener('input', () => {
    //Selects all the span elements for quoteDisplayElement
    var arrayQuote = quoteDisplayElement.querySelectorAll('span');
    //convert the input in the text area to single characters
    var arrayValue = quoteInputElement.value.split('');
    //var to check if the new quote can be rendered after the current quote
    //is succesfully enetered without errors
    var correct = true;
    //checking for a match of each character of the input by the user and
    //each character of the quote. If it doesnt match, make the quote character red.
    arrayQuote.forEach((characterSpan, index) => {
        var character = arrayValue[index];
        if(character == null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        //Adding color green to the quote element - Matches Correctly
        else if(character === characterSpan.innerText){
           characterSpan.classList.add('correct');
           characterSpan.classList.remove('incorrect'); 
        }
        //Adding color red to the quote element - Does not Match
        else{
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect'); 
            correct = false;
        }
    })
    //If all characters are successfully matched
    if (correct === true) 
        renderNewQuote(); 
});

//function to fetch random quotes from the API
function getRandomQuote(){
    //Fetch is a Javascript API used to receive data asynchronously
    //just like an AJAX call to the server ie without refreshing the page.
    //Fetch returns a promise containing a response Object. Request and responses
    //are a feature for a HTTP Fetch Request to the Server.
    return fetch(QUOTE_API_URL)
    .then(response => response.json())
    //data received are in the form of Key/Value objects and we just need the 
    //value of the key - 'content' in the JSON File.
    .then(data => data.content)
}

//function which renders new quotes received asynchronously through the Fetch API.
//async keyword is for asynchronous functions which render dynamic content 
//based on a call to the server.
//await keyword makes progress through the function stop until a promise or a response
//object is received from the server.
 async function renderNewQuote(){
    quoteInputElement.focus();
    var quote =  await getRandomQuote();
    //making the HTML for the quote section empty before rendering a new quote
    quoteDisplayElement.innerHTML = '';
    //splitting the quote into <spans> of lenght=1 so as to change the color of 
    //each letter
    quote.split('').forEach(character =>{
        var characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    //Refreshin the text area to NULL everytime a new quote is rendered
    quoteInputElement.value = null;
    //Timer stopped
    stopTimer();
    //Timer started again
    startTimer();
}

//function to render time after every 1000ms of time in the Timer element
function showTime(){
    timerElement.innerHTML = parseInt(timerElement.innerHTML) + 1;
}

//function to start the timer
function startTimer(){
    timerElement.innerHTML = "0";
    clockTimer = setInterval(showTime,1000);
}

//function to stop the Timer
function stopTimer(){
	clearInterval(clockTimer);
}

//Button click Listener to start the GAME
strtBtn.onclick = renderNewQuote;
}
