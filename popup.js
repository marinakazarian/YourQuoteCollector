document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
});

function loadQuotes() {
  chrome.storage.sync.get(['quotes'], (result) => {
    const quoteList = result.quotes || [];
    const quoteListContainer = document.getElementById('quote-list');
    quoteListContainer.innerHTML = '';
    quoteList.forEach((quote) => {
      const quoteItem = document.createElement('div');
      quoteItem.textContent = quote;
      quoteItem.classList.add('quote-item');
      quoteListContainer.appendChild(quoteItem);
    });
  });
}
