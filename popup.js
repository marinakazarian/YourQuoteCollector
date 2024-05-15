document.addEventListener("DOMContentLoaded", function () {
  loadQuotes();
});

function loadQuotes() {
  chrome.storage.sync.get("quotes", function (data) {
    const quotes = data.quotes || [];
    const quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = "";
    quotes.forEach(function (quote) {
      const li = document.createElement("li");
      li.textContent = quote;
      quoteList.appendChild(li);
    });
  });
}
