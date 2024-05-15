document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
});

function loadQuotes() {
  chrome.storage.sync.get(['quotes'], (result) => {
    const quoteList = result.quotes || [];
    const quoteListContainer = document.getElementById('quote-list');
    quoteListContainer.innerHTML = '';
    quoteList.forEach((quote, index) => {
      const quoteItem = document.createElement('div');
      quoteItem.textContent = quote;
      quoteItem.classList.add('quote-item');

      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.onclick = () => deleteQuote(index);

      quoteItem.appendChild(deleteButton);
      quoteListContainer.appendChild(quoteItem);
    });
  });
}

function deleteQuote(index) {
  chrome.storage.sync.get(['quotes'], (result) => {
    const quoteList = result.quotes || [];
    quoteList.splice(index, 1);
    chrome.storage.sync.set({ 'quotes': quoteList }, () => {
      console.log('Quote deleted at index', index);
      loadQuotes(); // Reload quotes after deletion
    });
  });
}
