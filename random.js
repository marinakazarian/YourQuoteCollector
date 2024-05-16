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
    
    if (randomQuote != "undefined") {
        quoteItem.textContent = randomQuote;
        quoteItem.classList.add('quote-item');
        randomQuoteContainer.appendChild(quoteItem);
    }
    else {
        quoteItem.textContent = "No quotes in the list to pick from.";
        quoteItem.classList.add('quote-item');
        randomQuoteContainer.appendChild(quoteItem)
    }

  }
  
  function goBack() {
    window.location.href = 'popup.html';
  }
 