let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let quoteAuthor = document.getElementById("author");
let twitterButton = document.getElementById("twitter");
let newQuotebtn = document.getElementById("new-quote");
let loder = document.getElementById("loader")

let quoteList = [];

function loading(){
    loder.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;

}

function newQuote(){
    loading();
    const quote = quoteList[Math.floor(Math.random()*quoteList.length)]
    if(!quote.author){
        quoteAuthor.textContent = "Unknown";
    }
    else{
    quoteAuthor.textContent = quote.author;
    }
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote')
    }
    else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
}

async function getQuote() {
const apiUrl = "https://type.fit/api/quotes";
try {
    const response = await fetch(apiUrl);
    quoteList = await response.json();
    newQuote();
}catch(error) {
    alert(error);
}
}

// Tweet the qoute

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}


// Event listeners

newQuotebtn.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

getQuote();