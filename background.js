let quotes = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "addQuote") {
    let quote = message.quote;
    quotes.push(quote);
    chrome.storage.local.set({quotes: quotes}, function() {
      console.log("Quote added: " + quote);
    });
  }
});