chrome.contextMenus.create({
  title: "Add to Quote List",
  contexts: ["selection"],
  onclick: function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {action: "addQuote", selection: info.selectionText});
  }
});
