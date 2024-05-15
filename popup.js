chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "addQuote") {
    var quote = message.selection;
    var listItem = document.createElement("li");
    listItem.textContent = quote;
    document.getElementById("quoteList").appendChild(listItem);
  }
});
