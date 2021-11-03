const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new Quotes
function newQuote(){
    loading();
// Pick a Random Quote
 const Quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//  Check if Author field is blank and replace it with Unknown
if (!Quote.author){
    authorText.textContent = 'Unknown';
}else{
    authorText.textContent = Quote.author;
}
// Check Quote Length to determine styling
if (Quote.text.length > 120) {
    quoteText.classList.add("long-quote");
}else{
    quoteText.classList.remove("long-quote");
}
// Set Quote, Hide Loader
quoteText.textContent = Quote.text;
complete();
}

// Get Quotes from Api
async function GetQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            newQuote();
    } catch(error){ 
        alert("NO QUOTE FOUND");
        // Catch Error Here
    }
}


//To tweet a quote
function tweetQuote() {
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(twitterUrl, '_blank');
}

// Event Listeners
newquoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
GetQuotes();
