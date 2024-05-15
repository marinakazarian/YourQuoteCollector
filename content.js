document.addEventListener("mouseup", function () {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      chrome.runtime.sendMessage({ action: "addQuote", quote: selection });
    }
  });
  