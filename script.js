const quoteDisplay = document.querySelector('#quote');

const quote_API = 'https://api.realinspire.live/v1/quotes/random?maxLength=100';

getQuote();

async function getQuote() {
  const data = await fetch(quote_API);
  const quote = await data.json();
  quoteDisplay.textContent = `"${quote[0].content}" - ${quote[0].author}`;
}
