document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    document.getElementById('back-button').addEventListener('click', goBack);
  });
  
  function displayRandomQuote() {
    const queryParams = new URLSearchParams(window.location.search);
    const randomQuote = queryParams.get('quote');
  
    const randomQuoteContainer = document.getElementById('random-quote');
    randomQuoteContainer.innerHTML = '';
    const quoteItem = document.createElement('div');
    quoteItem.textContent = randomQuote;
    quoteItem.classList.add('quote-item');

    randomQuoteContainer.appendChild(quoteItem);

    // randomQuoteContainer.textContent = randomQuote;
  }
  
  function goBack() {
    window.location.href = 'popup.html';
  }
 