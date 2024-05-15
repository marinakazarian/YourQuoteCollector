document.addEventListener("contextmenu", function(event) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText !== "") {
      chrome.runtime.sendMessage({action: "checkContextMenu"});
    }
  });
  