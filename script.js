// let apiQuotes = [];

// function newQuote() {
//     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//     console.log(quote);
// }


// // get quotes from API
// async function getQuote() {
//         const apiUrl ='http://localhost:3000/quotes';
//     try {
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         newQuote();
//     } catch (error) {
//         console.log('whoops, no quote', error);
//     }
// }


// getQuote();

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
      quoteContainer.hidden = false;
      loader.hidden = true;
}



//for locally stored quotes
let localApiQuotes = [];

// Function to display a random quote
function newQuote() {
    loading();
    const quote = localApiQuotes[Math.floor(Math.random() * localApiQuotes.length)];
    //check for author field
    authorText.textContent = quote.a ? quote.a : 'Unknown';

    // Check quote length to determine styling
    if (quote.q.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.q;
    complete();
}

// Function to fetch and store the data locally
async function getQuote() {
    loading();
    const apiUrl = 'http://localhost:3000/quotes';

    // Check if data already exists in localStorage and is not older than 1 hour (3600000 ms)
    const storedData = localStorage.getItem('quotes');
    const storedTimestamp = localStorage.getItem('quotesTimestamp');
    const currentTime = new Date().getTime();

    if (storedData && storedTimestamp && currentTime - storedTimestamp < 3600000) {
        // If data exists and is less than 1 hour old, use it
        localApiQuotes = JSON.parse(storedData);
        newQuote();
    } else {
        // Fetch data from API and store it locally
        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            localStorage.setItem('quotes', JSON.stringify(apiQuotes)); // Save quotes to localStorage
            localStorage.setItem('quotesTimestamp', currentTime.toString()); // Save the timestamp
            newQuote();
        } catch (error) {
            console.log('Whoops, no quote', error);
        }
    }
}


// tweet quote
function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
