document.addEventListener('DOMContentLoaded', function() {
    // Load existing quotes from storage
    loadQuotes();
  
    // Add context menu item
    chrome.contextMenus.create({
      id: 'addQuote',
      title: 'Add to Quote List',
      contexts: ['selection']
    });
  
    // Add event listener for context menu click
    chrome.contextMenus.onClicked.addListener(function(info, tab) {
      if (info.menuItemId === 'addQuote') {
        var selectedText = info.selectionText;
        saveQuote(selectedText);
      }
    });
  
    function loadQuotes() {
      chrome.storage.sync.get(['quotes'], function(result) {
        var quoteList = result.quotes || [];
        var quoteListContainer = document.getElementById('quote-list');
        quoteListContainer.innerHTML = '';
        quoteList.forEach(function(quote) {
          var quoteItem = document.createElement('div');
          quoteItem.textContent = quote;
          quoteListContainer.appendChild(quoteItem);
        });
      });
    }
  
    function saveQuote(quote) {
      chrome.storage.sync.get(['quotes'], function(result) {
        var quoteList = result.quotes || [];
        quoteList.push(quote);
        chrome.storage.sync.set({ 'quotes': quoteList }, function() {
          loadQuotes();
        });
      });
    }
  });
  