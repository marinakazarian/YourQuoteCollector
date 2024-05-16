document.addEventListener('DOMContentLoaded', () => {
    displaySearchResults();
    document.getElementById('back-button').addEventListener('click', goBack);
  });
  
  function displaySearchResults() {
    const queryParams = new URLSearchParams(window.location.search);
    const searchText = queryParams.get('q');
  
    const quoteListContainer = document.getElementById('search-results');
    quoteListContainer.innerHTML = '';
  
    chrome.storage.sync.get(['quotes'], (result) => {
      const quoteList = result.quotes || [];
      quoteList.forEach((quote) => {
        if (quote.toLowerCase().includes(searchText.toLowerCase())) {
          const quoteItem = document.createElement('div');
          quoteItem.textContent = quote;
          quoteItem.classList.add('quote-item');
  
          quoteListContainer.appendChild(quoteItem);
        }
      });
    });
  }
  
  function goBack() {
    window.location.href = 'popup.html';
  }
  