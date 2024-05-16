document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  document.getElementById('submit-quote-button').addEventListener('click', submitQuote);
  document.getElementById('quote-input-field').addEventListener('keypress', handleKeyPress);
  document.getElementById('search-input').addEventListener('keypress', handleSearchKeyPress);
  document.getElementById('search-submit-button').addEventListener('click', searchQuotes);
  document.getElementById('random-quote-button').addEventListener('click', showRandomQuote);
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

function submitQuote() {
  const quoteInputField = document.getElementById('quote-input-field');
  const quote = quoteInputField.value.trim();

  if (quote !== '') {
    saveQuote("\"".concat(quote, "\""));
    quoteInputField.value = ''; // Clear the input field
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    submitQuote();
  }
}

function saveQuote(quote) {
  chrome.storage.sync.get(['quotes'], (result) => {
    const quoteList = result.quotes || [];
    quoteList.push(quote);
    chrome.storage.sync.set({ 'quotes': quoteList }, () => {
      console.log('Quote added: ', quote);
      loadQuotes(); // Reload quotes after addition
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

function handleSearchKeyPress(event) {
  if (event.key === 'Enter') {
    searchQuotes();
  }
}

function searchQuotes() {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.trim();

  // Redirect to search results page with query string
  window.location.href = `search.html?q=${encodeURIComponent(searchText)}`;
}

function showRandomQuote() {
  chrome.storage.sync.get(['quotes'], (result) => {
    const quoteList = result.quotes || [];
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    const randomQuote = quoteList[randomIndex];

    // Redirect to random quote page with quote string
    window.location.href = `random.html?quote=${encodeURIComponent(randomQuote)}`;
  });
}
