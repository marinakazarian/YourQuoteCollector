chrome.storage.local.get("quotes", function(data) {
  let quotes = data.quotes || [];
  let quoteList = document.getElementById("quoteList");
  quotes.forEach(function(quote) {
    let listItem = document.createElement("li");
    listItem.textContent = quote;
    quoteList.appendChild(listItem);
  });
});
