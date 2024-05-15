let quotes = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "checkContextMenu") {
    chrome.contextMenus.create({
      id: "addQuoteOption",
      title: "Add to Quote List",
      contexts: ["selection"]
    });
  }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "addQuoteOption") {
    let quote = info.selectionText;
    quotes.push(quote);
    chrome.storage.local.set({quotes: quotes}, function() {
      console.log("Quote added: " + quote);
    });
  }
});
