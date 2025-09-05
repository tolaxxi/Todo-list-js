const quoteDisplay = document.querySelector('#quote');

const quote_API = 'https://api.realinspire.live/v1/quotes/random?maxLength=100';

getQuote();

async function getQuote() {
  try {
    const data = await fetch(quote_API);
    const quote = await data.json();
    quoteDisplay.textContent = `"${quote[0].content}" - ${quote[0].author}`;
  } catch (err) {
    quoteDisplay.textContent = `There seem to be an issue please try again`;
  }
}
